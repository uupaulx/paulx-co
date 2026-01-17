import { HomeClient } from "./home-client";
import {
  generatePersonSchema,
  generateWebSiteSchema,
} from "@/lib/seo";

// JSON-LD Structured Data Component
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
      <HomeClient />
    </>
  );
}
