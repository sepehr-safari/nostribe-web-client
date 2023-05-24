import { Event, nip19 } from 'nostr-tools';
import {
  ArrowPathIcon,
  BoltIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import {
  ArrowPathIcon as ArrowPathIconFull,
  BoltIcon as BoltIconFull,
  HeartIcon as HeartIconFull,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { isRepost } from '@/utils/event';
import usePublish from '@/hooks/usePublish';
import useStore from '@/store';
import { useMemo, useState, memo } from 'react';
import Modal from '@/components/modal/Modal';
import ZapModal from '@/components/modal/Zap';
import Avatar from '@/components/Avatar';
import Name from '@/components/Name';
import { getZappingUser, decodeInvoice, formatAmount } from '@/utils/Lightning';
import { useProfileMetadata } from '@/hooks';

type Props = {
  event: Event;
  reactionEvents: Event[];
  nip19NoteId: string;
  standalone?: boolean;
};

const Reaction = memo(
  ({ event }: { event: Event }) => {
    const reactor = event.kind === 9735 ? getZappingUser(event) : event.pubkey;
    const invoice =
      event.kind === 9735
        ? event.tags?.find((tag) => tag[0] === 'bolt11')?.[1]
        : undefined;
    const amount = invoice ? decodeInvoice(invoice)?.amount : undefined;
    console.log('amount', amount, 'invoice', invoice, 'event', event);
    return (
      <Link
        prefetch={false}
        href={`/${nip19.npubEncode(reactor)}`}
        key={event.id}
        className="flex items-center gap-4"
      >
        <Avatar pub={reactor} width="w-12" />
        <div className="flex flex-col">
          <Name pub={reactor} />
          {amount && (
            <small className="text-neutral-500">
              {formatAmount(amount / 1000)}
            </small>
          )}
        </div>
      </Link>
    );
  },
  (prevProps, nextProps) => prevProps.event.id === nextProps.event.id
);

Reaction.displayName = 'Reaction';

const Reactions = ({
  reactionEvents,
  nip19NoteId,
  event,
  standalone,
}: Props) => {
  const publish = usePublish();
  const userData = useStore((state) => state.auth.user.data);
  const myPub = userData?.publicKey || '';
  const [modalReactions, setModalReactions] = useState([] as Event[]);
  const [modalTitle, setModalTitle] = useState('');
  const [showZapModal, setShowZapModal] = useState(false);

  const liked = useMemo(() => {
    if (!myPub) return false;
    return reactionEvents.some(
      (event) => event.kind === 7 && event.pubkey === myPub
    );
  }, [reactionEvents, myPub]);
  const like = () => {
    !liked &&
      publish({
        kind: 7,
        content: '+',
        tags: [
          ['e', event.id],
          ['p', event.pubkey],
        ],
      });
  };

  const reposted = useMemo(() => {
    if (!myPub) return false;
    return reactionEvents.some(
      (event) => event.pubkey === myPub && isRepost(event)
    );
  }, [reactionEvents, myPub]);
  const repost = () => {
    !reposted &&
      publish({
        kind: 6,
        content: '',
        tags: [
          ['e', event.id, '', 'mention'],
          ['p', event.pubkey],
        ],
      });
  };

  const zapped = useMemo(() => {
    if (!myPub) return false;
    return reactionEvents.some(
      (event) => event.kind === 9735 && getZappingUser(event) === myPub
    );
  }, [reactionEvents, myPub]);

  const likes = reactionEvents.filter((event) => event.kind === 7);
  const reposts = reactionEvents.filter((event) => isRepost(event));
  const zaps = reactionEvents.filter((event) => event.kind === 9735);
  const replies = reactionEvents.filter(
    (event) => event.kind === 1 && !isRepost(event)
  );
  const hasReactions =
    likes.length > 0 || reposts.length > 0 || zaps.length > 0;
  const metadata = useProfileMetadata(event.pubkey).metadata;
  const lightning = metadata.lud16 || metadata.lud06;

  const totalZapAmount: number = useMemo(
    () =>
      zaps.reduce((acc, event) => {
        const invoice = event.tags?.find((tag) => tag[0] === 'bolt11')?.[1];
        const amount = invoice ? decodeInvoice(invoice)?.amount : undefined;
        return amount ? acc + amount : acc;
      }, 0),
    [zaps]
  );

  // in standalone, show twitter-like listings that open the modal
  return (
    <>
      <ZapModal
        show={showZapModal}
        lnurl={lightning}
        note={event.id}
        recipient={event.pubkey}
        onClose={() => setShowZapModal(false)}
      />
      {standalone && hasReactions && (
        <>
          <hr className="-mx-4 opacity-10" />
          {modalReactions.length > 0 && (
            <Modal showContainer={true} onClose={() => setModalReactions([])}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{modalTitle}</h2>
              </div>
              <div className="flex flex-col gap-4 overflow-y-scroll max-h-[50vh] w-96">
                {modalReactions.map((event) => (
                  <Reaction key={event.id} event={event} />
                ))}
              </div>
            </Modal>
          )}
          <div className="flex items-center gap-4">
            {likes.length > 0 && (
              <div className="flex-shrink-0">
                <a
                  onClick={() => {
                    setModalReactions(likes);
                    setModalTitle('Liked by');
                  }}
                  className="cursor-pointer hover:underline"
                >
                  {likes.length} <span className="text-neutral-500">Likes</span>
                </a>
              </div>
            )}
            {reposts.length > 0 && (
              <div className="flex-shrink-0">
                <a
                  onClick={() => {
                    setModalReactions(reposts);
                    setModalTitle('Reposted by');
                  }}
                  className="cursor-pointer hover:underline"
                >
                  {reposts.length}{' '}
                  <span className="text-neutral-500">Reposts</span>
                </a>
              </div>
            )}
            {zaps.length > 0 && (
              <div className="flex-shrink-0">
                <a
                  onClick={() => {
                    setModalReactions(zaps);
                    setModalTitle('Zapped by');
                  }}
                  className="cursor-pointer hover:underline"
                >
                  {zaps.length} <span className="text-neutral-500">Zaps</span>
                  {totalZapAmount > 0 && (
                    <small className="text-neutral-500">
                      {' '}
                      ({formatAmount(totalZapAmount / 1000)})
                    </small>
                  )}
                </a>
              </div>
            )}
          </div>
        </>
      )}
      <hr className="-mx-4 opacity-10" />

      <div className="-m-4 flex flex-wrap">
        {lightning && lightning.length && (
          <button
            onClick={() => {
              console.log('click', lightning);
              setShowZapModal(true);
            }}
            className={`btn-ghost hover:bg-transparent hover:text-iris-orange btn w-1/4 content-center gap-2 rounded-none p-2 ${
              zapped ? 'text-iris-orange' : 'text-neutral-500'
            }`}
          >
            <BoltIcon width={18} />
            {!standalone && zaps.length > 0 && (
              <>{formatAmount(totalZapAmount / 1000)}</>
            )}
          </button>
        )}

        <Link
          prefetch={false}
          href={`/${nip19NoteId}`}
          className="btn-ghost hover:bg-transparent text-neutral-500 hover:text-iris-blue btn w-1/4 content-center gap-2 rounded-none p-2"
        >
          <ChatBubbleOvalLeftIcon width={18} />
          {!standalone && replies.length > 0 && replies.length}
        </Link>

        <button
          onClick={like}
          className={`btn-ghost hover:bg-transparent hover:text-iris-purple btn w-1/4 content-center gap-2 rounded-none p-2 ${
            liked ? 'text-iris-purple' : 'text-neutral-500'
          }`}
        >
          {liked ? <HeartIconFull width={18} /> : <HeartIcon width={18} />}
          {!standalone && likes.length > 0 && likes.length}
        </button>

        <button
          onClick={repost}
          className={`btn-ghost hover:bg-transparent hover:text-iris-green btn w-1/4 content-center gap-2 rounded-none p-2 ${
            reposted ? 'text-iris-green' : 'text-neutral-500'
          }`}
        >
          {reposted ? (
            <ArrowPathIconFull width={18} />
          ) : (
            <ArrowPathIcon width={18} />
          )}
          {!standalone && reposts.length > 0 && reposts.length}
        </button>
      </div>
    </>
  );
};

export default Reactions;
