export default function About() {
  const t = (s: string) => {
    // TODO translate fn
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  return (
    <article className="prose p-2">
      <h2>{t('about')}</h2>
      <p>Iris is like the social networking apps we're used to, but better:</p>
      <ul>
        <li>
          <b>Accessible.</b> No phone number or signup is required. Just type in
          your name or alias and go!
        </li>
        <li>
          <b>Secure.</b> It's open source. You can verify that your data stays
          safe.
        </li>
        <li>
          <b>Always available.</b> It works offline-first and is not dependent
          on any single centrally managed server. Users can even connect
          directly to each other.
        </li>
      </ul>

      <h3>Versions</h3>
      <ul className="list-disc">
        <li>
          <a target="_blank" href="https://iris.to">
            iris.to
          </a>{' '}
          (web)
        </li>
        <li>
          <a
            target="_blank"
            href="https://github.com/irislib/iris-messenger/releases/latest"
          >
            Desktop
          </a>{' '}
          (macOS, Windows, Linux)
        </li>
        <li>
          <a
            target="_blank"
            href="https://apps.apple.com/app/iris-the-nostr-client/id1665849007"
          >
            iOS
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=to.iris.twa"
          >
            Android
          </a>{' '}
          (
          <a
            target="_blank"
            href="https://github.com/irislib/iris-messenger/releases/tag/jan2023"
          >
            apk
          </a>
          )
        </li>
      </ul>

      <h3>Iris docs</h3>
      <p>
        Visit Iris{' '}
        <a href="https://docs.iris.to" target="_blank">
          docs
        </a>{' '}
        for features, explanations and troubleshooting.
      </p>

      <h3>Privacy</h3>
      <p>
        The application is an unaudited proof-of-concept implementation, so
        don't use it for security critical purposes.
      </p>

      <h3>Follow</h3>
      {/*
        <div className="profile-link-container">
          <a href={`/${IRIS_INFO_ACCOUNT}`} className="profile-link">
            <Identicon str={IRIS_INFO_ACCOUNT} width={40} />
            <Name pub={IRIS_INFO_ACCOUNT} placeholder="Iris" />
          </a>
          <Follow id={IRIS_INFO_ACCOUNT} />
        </div>
      */}

      <p>
        <a href="https://t.me/irismessenger" target="_blank">
          Telegram
        </a>{' '}
        channel.
      </p>

      <a href="https://opencollective.com/iris-social/donate" target="_blank">
        <img src="/img/opencollective.png" width={200} />
      </a>

      <p>
        Released under MIT license. Code:{' '}
        <a href="https://github.com/mmalmi/iris-nextjs" target="_blank">
          Github
        </a>
        .
      </p>
      <br />
    </article>
  );
}
