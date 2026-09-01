import type { Metadata } from "next";
import PrivacyPage from "@/components/pages/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default function Page() {
  return <PrivacyPage lang="en" />;
}
