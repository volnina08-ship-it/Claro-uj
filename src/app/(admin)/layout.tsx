import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/montserrat";
import "../globals.css";

/* Az iOS Safari ebből színezi a címsáv hátterét */
export const viewport: Viewport = {
  themeColor: "#1e1c19",
};

export const metadata: Metadata = {
  title: "Claro Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
