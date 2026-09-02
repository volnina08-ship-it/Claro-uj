import type { Metadata } from "next";
import NotFoundPage from "@/components/pages/NotFoundPage";

export const metadata: Metadata = {
  title: "404 – Ez a fogás elfogyott",
  robots: { index: false },
};

export default function NotFound() {
  return <NotFoundPage lang="hu" />;
}
