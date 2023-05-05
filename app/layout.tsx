import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import './globals.css';
import Head from 'next/head';

export const metadata = {
  title: 'Iris',
  description: 'Connecting People',
  keywords:
    'Iris, Nostr, Nostr protocol, decentralized, censorship-resistant, social media, web client, social network',
  manifest: '/manifest.json',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Iris',
    description: 'Connecting People',
    images: [
      {
        url: 'https://raw.githubusercontent.com/mmalmi/iris-nextjs/main/public/img/irisconnects.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full w-full"
      data-theme="iris"
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
