import "./globals.css";

export const metadata = {
  title: "Nostribe",
  description: "Join the tribe, join the vibe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
