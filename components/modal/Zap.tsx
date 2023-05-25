'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { Event, getEventHash, signEvent } from 'nostr-tools';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  LNURL,
  LNURLError,
  LNURLErrorCode,
  LNURLInvoice,
  LNURLSuccessAction,
} from '@/utils/LNURL';
import { formatSats } from '@/utils/Lightning';

import useStore from '@/store';

import Name from '../Name';
import QrCode from '../QrCode';
import Modal from './Modal';

// Code kindly contributed by @Kieran and @verbiricha from Snort

declare global {
  interface Window {
    webln?: any;
  }
}

enum ZapType {
  PublicZap = 1,
  AnonZap = 2,
  PrivateZap = 3,
  NonZap = 4,
}

export interface ZapProps {
  onClose?: () => void;
  lnurl?: string;
  invoice?: string; // shortcut to invoice qr tab
  initialTitle?: string;
  notice?: string;
  note?: string;
  recipient?: string;
}

const DEFAULT_ZAP_AMOUNT = 1_000;
const ZAP_AMOUNTS = [
  DEFAULT_ZAP_AMOUNT,
  5_000,
  10_000,
  20_000,
  50_000,
  100_000,
  1_000_000,
];
const EMOJIS: Record<number, string> = {
  1_000: '👍',
  5_000: '💜',
  10_000: '😍',
  20_000: '🤩',
  50_000: '🔥',
  100_000: '🚀',
  1_000_000: '🤯',
};

function chunks<T>(arr: T[], length: number) {
  const result = [];
  let idx = 0;
  let n = arr.length / length;
  while (n > 0) {
    result.push(arr.slice(idx, idx + length));
    idx += length;
    n -= 1;
  }
  return result;
}

type LoadInvoiceParams = {
  amount: number;
  comment?: string;
  handler: LNURL;
  note?: string;
  recipient?: string;
  userData: any;
  zapType: ZapType;
  relays: string[];
  setInvoice: (invoice: string | undefined) => void;
  setError: (error: string) => void;
  setSuccess: (success: LNURLSuccessAction | undefined) => void;
  setPaying: (paying: boolean) => void;
};

async function loadInvoice({
  amount,
  comment,
  handler,
  note,
  recipient,
  zapType,
  userData,
  relays,
  setInvoice,
  setError,
  setSuccess,
  setPaying,
}: LoadInvoiceParams) {
  if (!amount || !handler) return;

  let zap: Event | undefined;

  if (recipient && zapType !== ZapType.NonZap) {
    let ev: any = {
      created_at: Math.floor(Date.now() / 1000),
      kind: 9734,
      pubkey: userData?.publicKey,
      content: comment || '',
      tags: [
        ['e', note],
        ['p', recipient],
        ['relays', ...relays],
      ],
    };

    ev = userData?.privateKey
      ? {
          ...ev,
          id: getEventHash(ev),
          sig: signEvent(ev, userData.privateKey),
        }
      : (await (window as any).nostr.signEvent(ev)) || {};

    if (!ev.sig) {
      throw new Error('No signature provided');
    }

    // console.log('loadInvoice', ev);
    if (ev) {
      // replace sig for anon-zap
      if (zapType === ZapType.AnonZap) {
        /*
          const randomKey = publisher.newKey();
          console.debug('Generated new key for zap: ', randomKey);
          ev.PubKey = randomKey.publicKey;
          ev.Id = '';
          ev.Tags.push(new Tag(['anon'], ev.Tags.length));
          await ev.Sign(randomKey.privateKey);
          
           */
      }
      zap = ev;
    }
  }

  try {
    const rsp = await handler.getInvoice(amount, comment, zap);
    if (rsp.pr) {
      setInvoice(rsp.pr);
      await payWithWallet({
        invoice: rsp,
        setError,
        setPaying,
        setSuccess,
      });
    }
  } catch (e) {
    handleLNURLError({
      e,
      fallback: 'invoice fail',
      setError,
      setSuccess,
      setPaying,
    });
  }
}

type HandleLNURLErrorParams = {
  e: unknown;
  fallback: string;
  setError: (error: string) => void;
  setSuccess: (success: LNURLSuccessAction) => void;
  setPaying: (paying: boolean) => void;
};

function handleLNURLError({ e, fallback, setError }: HandleLNURLErrorParams) {
  console.error('lnurl error', e);
  if (e instanceof LNURLError) {
    switch (e.code) {
      case LNURLErrorCode.ServiceUnavailable: {
        setError('messages.LNURLFail');
        return;
      }
      case LNURLErrorCode.InvalidLNURL: {
        setError('messages.InvalidLNURL');
        return;
      }
    }
  }
  setError(fallback);
}

type PayWithWalletParams = {
  invoice: LNURLInvoice;
  setError: (error: string) => void;
  setSuccess: (success: LNURLSuccessAction) => void;
  setPaying: (paying: boolean) => void;
};

async function payWithWallet({
  invoice,
  setError,
  setSuccess,
  setPaying,
}: PayWithWalletParams) {
  try {
    if (window.webln) {
      setPaying(true);
      await window.webln.enable(); // should we do this elsewhere?
      const res = await window.webln?.sendPayment(invoice?.pr ?? '');
      console.log(res);
      setSuccess(invoice?.successAction ?? {});
    }
  } catch (e: unknown) {
    console.warn(e);
    if (e instanceof Error) {
      setError(e.toString());
    }
  } finally {
    setPaying(false);
  }
}

export default function SendSats({
  invoice: initialInvoice,
  lnurl,
  note,
  notice,
  onClose,
  recipient,
  initialTitle,
}: ZapProps) {
  const userData = useStore((state) => state.auth.user.data);
  const relays = useStore((store) => store.relays);

  const [handler, setHandler] = useState<LNURL>();
  const [invoice, setInvoice] = useState(initialInvoice);
  const [amount, setAmount] = useState<number>(DEFAULT_ZAP_AMOUNT);
  const [comment, setComment] = useState<string>();
  const [success, setSuccess] = useState<LNURLSuccessAction>();
  const [error, setError] = useState<string>();
  const [customAmount, setCustomAmount] = useState<number>(DEFAULT_ZAP_AMOUNT);
  const [zapType, setZapType] = useState(ZapType.PublicZap);
  const [paying, setPaying] = useState<boolean>(false);
  const [canZap, setCanZap] = useState<boolean>(false);

  const canComment = handler
    ? (canZap && zapType !== ZapType.NonZap) || handler.maxCommentLength > 0
    : false;

  const serviceAmounts = useMemo(() => {
    if (handler) {
      const min = handler.min / 1000;
      const max = handler.max / 1000;
      return ZAP_AMOUNTS.filter((a) => a >= min && a <= max);
    }
    return [];
  }, [handler]);

  const amountRows = useMemo(() => chunks(serviceAmounts, 3), [serviceAmounts]);

  const selectAmount = useCallback((a: number) => {
    setError(undefined);
    setAmount(a);
  }, []);

  useEffect(() => {
    if (success && !success.url) {
      // Fire onClose when success is set with no URL action
      setTimeout(() => {
        onClose?.();
      }, 1000);
    }
  }, [success]);

  useEffect(() => {
    if (!!lnurl) {
      try {
        const h = new LNURL(lnurl);
        setHandler(h);
        h.load()
          .then(() => {
            setCanZap(h.canZap);
          })
          .catch((e) =>
            handleLNURLError({
              e,
              fallback: 'messages.LNURLFail',
              setError,
              setPaying,
              setSuccess,
            })
          );
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }
  }, [lnurl]);

  const title =
    initialTitle || handler?.canZap ? 'Send zap to ' : 'Send sats to ';

  return (
    <Modal showContainer={true} centerVertically={true} onClose={onClose}>
      <div className="flex gap-2 flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-2 right-2" onClick={onClose}>
          <XMarkIcon width={20} height={20} />
        </div>
        <div className="lnurl-header">
          <h2 className="text-xl">
            {title}
            <Name pub={recipient as string} />
          </h2>
        </div>

        {!!handler && !invoice && (
          <>
            <h3>Zap amount in sats</h3>

            {(amountRows || []).map((ZAP_AMOUNTS, index) => (
              <>
                <div key={index} className="amounts flex gap-2">
                  {(ZAP_AMOUNTS || []).map((a) => (
                    <button
                      className={`${
                        amount === a ? 'btn-primary' : ''
                      } btn btn-sm`}
                      key={a}
                      onClick={() => selectAmount(a)}
                    >
                      {EMOJIS[a] && <>{EMOJIS[a]}&nbsp;</>}
                      {formatSats(a)}
                    </button>
                  ))}
                </div>
              </>
            ))}

            {!!handler && (
              <>
                <div className="custom-amount flex gap-2">
                  <input
                    type="number"
                    min={handler.min / 1000}
                    max={handler.max / 1000}
                    className="bg-neutral-800 p-2 input"
                    placeholder={'Custom'}
                    value={customAmount}
                    onChange={(e) =>
                      setCustomAmount(
                        parseInt((e.target as HTMLInputElement).value)
                      )
                    }
                  />
                  <button
                    className="btn"
                    type="button"
                    disabled={!customAmount}
                    onClick={() => selectAmount(customAmount ?? 0)}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}

            <div className="flex">
              {canComment && (
                <input
                  type="text"
                  placeholder={'Comment'}
                  className="input bg-neutral-800"
                  maxLength={
                    canZap && zapType !== ZapType.NonZap
                      ? 250
                      : handler.maxCommentLength
                  }
                  onChange={(e) =>
                    setComment((e.target as HTMLInputElement).value)
                  }
                />
              )}
            </div>

            {/*zapTypeSelector()*/}
            {(amount ?? 0) > 0 && (
              <div className="mt-2">
                <button
                  className="btn w-full"
                  onClick={() =>
                    loadInvoice({
                      amount,
                      handler,
                      relays,
                      setInvoice,
                      userData,
                      zapType,
                      comment,
                      note,
                      recipient,
                      setError,
                      setSuccess,
                      setPaying,
                    })
                  }
                >
                  Send {formatSats(amount)} sats
                </button>
              </div>
            )}
          </>
        )}

        {error && <p className="error">{error}</p>}

        {!success && !!invoice && (
          <>
            <div className="invoice">
              {notice && <b className="error">{notice}</b>}

              {paying && <h4>Paying</h4>}

              <div className="actions">
                {!!invoice && (
                  <>
                    <QrCode data={invoice} link={`lightning:${invoice}`} />

                    <div className="mt-4">
                      <button
                        onClick={() => navigator.clipboard.writeText(invoice)}
                      >
                        Copy invoice
                      </button>
                      <a className="button" href={`lightning:${invoice}`}>
                        Open wallet
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {!!success && (
          <>
            <div className="success-action">
              <p className="paid">{success?.description ?? 'Paid'}</p>
              {success.url && (
                <p>
                  <a href={success.url} rel="noreferrer" target="_blank">
                    {success.url}
                  </a>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
