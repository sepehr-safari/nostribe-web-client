import React, { useEffect, useMemo, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

import {Event, getEventHash, signEvent} from 'nostr-tools';
import { LNURL, LNURLError, LNURLErrorCode, LNURLInvoice, LNURLSuccessAction } from '@/utils/LNURL';
import { formatSats } from '@/utils/Lightning';
import useStore from "@/store";
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
  show?: boolean;
  invoice?: string; // shortcut to invoice qr tab
  title?: string;
  notice?: string;
  note?: string;
  recipient?: string;
}

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

export default function SendSats(props: ZapProps) {
  const onClose = props.onClose || (() => undefined);
  const { note, recipient } = props;
  const userData = useStore((state) => state.auth.user.data);
  const relays = useStore((store) => store.relays);
  const defaultZapAmount = 1_000;
  const amounts = [defaultZapAmount, 5_000, 10_000, 20_000, 50_000, 100_000, 1_000_000];
  const emojis: Record<number, string> = {
    1_000: '👍',
    5_000: '💜',
    10_000: '😍',
    20_000: '🤩',
    50_000: '🔥',
    100_000: '🚀',
    1_000_000: '🤯',
  };

  const [handler, setHandler] = useState<LNURL>();
  const [invoice, setInvoice] = useState(props.invoice);
  const [amount, setAmount] = useState<number>(defaultZapAmount);
  const [customAmount, setCustomAmount] = useState<number>();
  const [comment, setComment] = useState<string>();
  const [success, setSuccess] = useState<LNURLSuccessAction>();
  const [error, setError] = useState<string>();
  const [zapType, setZapType] = useState(ZapType.PublicZap);
  const [paying, setPaying] = useState<boolean>(false);
  const [canZap, setCanZap] = useState<boolean>(false);

  const canComment = handler
    ? (canZap && zapType !== ZapType.NonZap) || handler.maxCommentLength > 0
    : false;

  useEffect(() => {
    // TODO default zap amount from settings
    const defaultZapAmount = 1_000;
    setAmount(defaultZapAmount);
    setCustomAmount(defaultZapAmount);
  });

  useEffect(() => {
    if (props.show) {
      setError(undefined);
      setAmount(defaultZapAmount);
      setComment(undefined);
      setZapType(ZapType.PublicZap);
      setInvoice(undefined);
      setSuccess(undefined);
    }
  }, [props.show]);

  useEffect(() => {
    if (success && !success.url) {
      // Fire onClose when success is set with no URL action
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [success]);

  useEffect(() => {
    if (props.lnurl && props.show) {
      try {
        const h = new LNURL(props.lnurl);
        setHandler(h);
        h.load()
          .then(() => {
            setCanZap(h.canZap);
          })
          .catch((e) => handleLNURLError(e, 'ln url error'));
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    }
  }, [props.lnurl, props.show]);

  const serviceAmounts = useMemo(() => {
    if (handler) {
      const min = handler.min / 1000;
      const max = handler.max / 1000;
      return amounts.filter((a) => a >= min && a <= max);
    }
    return [];
  }, [handler]);
  const amountRows = useMemo(() => chunks(serviceAmounts, 3), [serviceAmounts]);

  const selectAmount = (a: number) => {
    setError(undefined);
    setAmount(a);
  };

  async function loadInvoice() {
    if (!amount || !handler) return;

    let zap: Event | undefined;
    if (recipient && zapType !== ZapType.NonZap) {
      // const ev = await publisher.zap(amount * 1000, recipient, note, comment);
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

      console.log('loadInvoice', ev);
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
        await payWithWallet(rsp);
      }
    } catch (e) {
      handleLNURLError(e, 'invoice fail');
    }
  }

  function handleLNURLError(e: unknown, fallback: string) {
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

  function custom() {
    if (!handler) return null;
    const min = handler.min / 1000;
    const max = handler.max / 1000;

    return (
      <div className="custom-amount flex gap-2">
        <input
          type="number"
          min={min}
          max={max}
          className="bg-neutral-700 p-2 input"
          placeholder={'Custom'}
          value={customAmount}
          onChange={(e) => setCustomAmount(parseInt((e.target as HTMLInputElement).value))}
        />
        <button
          className="secondary"
          type="button"
          disabled={!customAmount}
          onClick={() => selectAmount(customAmount ?? 0)}
        >
          Confirm
        </button>
      </div>
    );
  }

  async function payWithWallet(invoice: LNURLInvoice) {
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

  function renderAmounts(amount: number, amounts: number[]) {
    return (
      <div className="amounts flex gap-2">
        {amounts.map((a) => (
          <button
            className={`${amount === a ? 'btn-primary' : ''} btn btn-sm`}
            key={a}
            onClick={() => selectAmount(a)}
          >
            {emojis[a] && <>{emojis[a]}&nbsp;</>}
            {formatSats(a)}
          </button>
        ))}
      </div>
    );
  }

  function invoiceForm() {
    if (!handler || invoice) return null;
    return (
      <>
        <h3>Zap amount in sats</h3>
        {amountRows.map((amounts) => renderAmounts(amount, amounts))}
        {custom()}
        <div className="flex">
          {canComment && (
            <input
              type="text"
              placeholder={'Comment'}
              className="input bg-neutral-700"
              maxLength={canZap && zapType !== ZapType.NonZap ? 250 : handler.maxCommentLength}
              onChange={(e) => setComment((e.target as HTMLInputElement).value)}
            />
          )}
        </div>
        {/*zapTypeSelector()*/}
        {(amount ?? 0) > 0 && (
          <div className="mt-2">
            <button className="btn w-full" onClick={() => loadInvoice()}>
              Send {formatSats(amount)} sats
            </button>
          </div>
        )}
      </>
    );
  }

  /*
  function zapTypeSelector() {
    if (!handler || !canZap) return;

    return (
      <>
        <h3>Zap Type</h3>
        <div className="tabs mt10">
          <ZapTypeBtn className={'active'}>Public</ZapTypeBtn>
          <ZapTypeBtn>Anon</ZapTypeBtn>
          <ZapTypeBtn>Non-Zap</ZapTypeBtn>
        </div>
      </>
    );
  }
   */

  function payInvoice() {
    if (success || !invoice) return null;
    return (
      <>
        <div className="invoice">
          {props.notice && <b className="error">{props.notice}</b>}
          {paying ? <h4>Paying</h4> : ''}
          <div className="actions">
            {invoice && (
              <>
                <QrCode data={invoice} link={`lightning:${invoice}`} />
                <div className="mt-4">
                  <button onClick={() => navigator.clipboard.writeText(invoice)}>Copy invoice</button>
                  <a className="button" href={`lightning:${invoice}`}>
                    Open wallet
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  function successAction() {
    if (!success) return null;
    return (
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
    );
  }

  const title = handler?.canZap ? 'Send zap to ' : 'Send sats to ';
  if (!(props.show ?? false)) return null;

  return (
    <Modal showContainer={true} centerVertically={true} onClose={onClose}>
      <div className="flex gap-2 flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-2 right-2" onClick={onClose}>
          <XMarkIcon width={20} height={20} />
        </div>
        <div className="lnurl-header">
          <h2 className="text-xl">
            {props.title || title}
            <Name pub={recipient as string} />
          </h2>
        </div>
        {invoiceForm()}
        {error && <p className="error">{error}</p>}
        {payInvoice()}
        {successAction()}
      </div>
    </Modal>
  );
}
