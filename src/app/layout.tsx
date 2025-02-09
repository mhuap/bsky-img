import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import "../scss/index.scss";
// import '../scss/result.scss';
// import '../scss/sidebar.scss';
// import '../scss/post.scss';

export const metadata: Metadata = {
  title: "bsky-img",
  description: "tweet-img but for bluesky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-foreground">
      <body>
        {children}
      </body>
    </html>
  );
}
