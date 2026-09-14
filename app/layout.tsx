import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LiveSell — Turn Products Into Live Sales",
  description:
    "Live commerce infrastructure for ambitious brands. Trained hosts, live selling operations and measurable commerce performance."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
