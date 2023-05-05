import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import './globals.css';

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
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
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
