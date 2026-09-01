import type { Metadata } from "next";
import GalleryPage from "@/components/pages/GalleryPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gallery",
  description: "Experience the ambiance and memories of Claro Bisztró, Budapest.",
};

export default function Page() {
  return <GalleryPage lang="en" />;
}
