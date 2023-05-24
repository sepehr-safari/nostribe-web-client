import { nip05 } from 'nostr-tools';
import { useEffect, useState } from "react";

function ColoredText({ text, valid }: { text: string, valid: boolean | null }) {
  const textClass = valid === false ? 'line-through text-neutral-500' : (valid === null ? 'text-neutral-500' : 'text-iris-green');
  const tooltipClass = valid === false ? 'tooltip tooltip-bottom' : '';
  const tooltipText = valid === false ? 'Invalid nip05' : '';

  return (
    <span className={`${textClass} text-left text-xs font-bold leading-5 ${tooltipClass}`} data-tip={tooltipText}>
      {text}
    </span>
  );
}

export default function Nip05View({ text }: { text: string }) {
  const [nip05Valid, setNip05Valid] = useState<boolean | null>(null);

  useEffect(() => {
    nip05.queryProfile(text).then((profile) => {
      setNip05Valid(!!profile);
    });
  });

  if (text.startsWith('_@')) {
    text = text.slice(2);
  }

  if (text.length < 50) {
    return <ColoredText text={text} valid={nip05Valid} />;
  }

  const trimmedText = text.slice(0, 25) + '...' + text.slice(-25);

  return (
    <div className="dropdown">
      <label tabIndex={0}>
        <ColoredText text={trimmedText} valid={nip05Valid} />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content menu rounded-xl bg-accent p-2 text-xs text-accent-content"
      >
        {text}
      </div>
    </div>
  );
}
