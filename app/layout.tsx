import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import './globals.css';

export const metadata = {
  title: 'Iris',
  description: 'Join the tribe, join the vibe.',
  keywords:
    'Iris, Nostr, Nostr protocol, decentralized, censorship-resistant, social media, web client, social network',
  manifest: '/manifest.json',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Iris',
    description: 'Join the tribe, join the vibe.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
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
      <body className="overflow-y-hidden overflow-x-hidden">{children}</body>
    </html>
  );
}
