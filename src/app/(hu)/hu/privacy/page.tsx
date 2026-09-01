import type { Metadata } from "next";
import PrivacyPage from "@/components/pages/PrivacyPage";

export const metadata: Metadata = {
  title: "Adatvédelmi irányelvek",
  robots: { index: false },
};

export default function Page() {
  return <PrivacyPage lang="hu" />;
}
