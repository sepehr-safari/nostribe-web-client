function ColoredText({ text }: { text: string }) {
  return (
    <div className="text-xs leading-5 font-bold bg-gradient-to-r from-warning to-info text-transparent bg-clip-text">
      {text}
    </div>
  );
}

export default function Nip05View({ text }: { text: string }) {
  if (text.length < 26) {
    return <ColoredText text={text} />;
  }

  const trimmedText = text.slice(0, 10) + '...' + text.slice(-15);

  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0}>
        <ColoredText text={trimmedText} />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content menu p-2 text-xs bg-accent text-accent-content rounded-xl"
      >
        {text}
      </div>
    </div>
  );
}
