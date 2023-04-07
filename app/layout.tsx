import './globals.css';

export const metadata = {
  title: 'Nostribe',
  description: 'Join the tribe, join the vibe.',
  keywords:
    'Nostribe, Nostr, Nostr protocol, decentralized, censorship-resistant, social media, web client, social network',
  manifest: '/manifest.json',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Nostribe',
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
      className="h-full w-full bg-gradient-to-l from-base-200 to-base-200"
      data-theme="nostribish"
    >
      <body className="overflow-y-auto overflow-x-hidden">{children}</body>
    </html>
  );
}
