import type { Metadata } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/montserrat";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Claro Bisztró",
    template: "%s – Claro Bisztró",
  },
  description:
    "Éld át a Claro Bisztró pezsgő hangulatát! Hagyományos és modern ízek a Ráday utcában – Budapest, Ráday utca 35.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
