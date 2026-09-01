import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description: "Vedd fel velünk a kapcsolatot – Budapest, Ráday utca 35, 1092. +36 1 216 1577",
};

export default function Page() {
  return <ContactPage lang="hu" />;
}
