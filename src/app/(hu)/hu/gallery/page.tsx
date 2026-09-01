import type { Metadata } from "next";
import GalleryPage from "@/components/pages/GalleryPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Galéria",
  description: "Látogass el hozzánk, ahol a gasztronómia és a laza környezet találkozik!",
};

export default function Page() {
  return <GalleryPage lang="hu" />;
}
