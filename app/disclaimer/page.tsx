import type { Metadata } from "next";
import { getPageOrThrow } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/LegalLayout";
import { JsonLd } from "@/components/JsonLd";
import { legalSchemas } from "@/lib/pageSchemas";

export const metadata: Metadata = buildPageMetadata(getPageOrThrow("/disclaimer/"));

export default function DisclaimerPage() {
  const page = getPageOrThrow("/disclaimer/");
  return (
    <>
      <JsonLd data={legalSchemas(page)} />
      <LegalLayout page={page} />
    </>
  );
}
