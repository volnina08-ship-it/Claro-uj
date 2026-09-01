import type { Metadata } from "next";
import MenuPage from "@/components/pages/MenuPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Menu",
  description: "Daily menu, Hungarian specialties and our full menu at Claro Bisztró, Budapest.",
};

export default function Page() {
  return <MenuPage lang="en" />;
}
