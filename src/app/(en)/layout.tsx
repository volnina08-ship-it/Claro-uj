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
  title: {
    default: "Claro Bisztró",
    template: "%s – Claro Bisztró",
  },
  description:
    "Indulge in our delectable dishes and cozy ambiance. Claro Bisztró – Ráday utca 35, Budapest.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
