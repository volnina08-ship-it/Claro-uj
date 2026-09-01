import type { Metadata } from "next";
import MenuPage from "@/components/pages/MenuPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Menü",
  description: "Napi menü, magyaros ajánlat és teljes étlap a Claro Bisztróban, Budapesten.",
};

export default function Page() {
  return <MenuPage lang="hu" />;
}
