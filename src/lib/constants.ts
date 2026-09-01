/* Az env csak akkor számít, ha nem üres – üresen hagyott Vercel env
   változó (pl. integráció által létrehozott placeholder) ne írja felül
   a működő alapértékeket. */
function envOr(value: string | undefined, fallback: string): string {
  const v = value?.trim();
  return v ? v : fallback;
}

export const SUPABASE_URL = envOr(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  "https://vaugvocquojsbdpstnxd.supabase.co"
);

// Publikus anon kulcs – a védelmet a Supabase RLS adja.
export const SUPABASE_ANON_KEY = envOr(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdWd2b2NxdW9qc2JkcHN0bnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyNjAyMTcsImV4cCI6MjEwMzgzNjIxN30.8IMxInB1DTCmrF6XdniidzxxjsVcNx_wwyfPG9OEKJ4"
);

export const CONTACT = {
  email: "info@clarobisztro.hu",
  phoneDisplay: "+36 1 216 1577",
  phoneHref: "tel:+3612161577",
  address: "Budapest, Ráday utca 35, 1092",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Claro+Bisztr%C3%B3+R%C3%A1day+utca+35+Budapest",
  mapsEmbed:
    "https://www.google.com/maps?q=Claro%20Bisztr%C3%B3%2C%20R%C3%A1day%20utca%2035%2C%20Budapest%201092&output=embed",
};

export const SOCIAL = {
  facebook: "https://www.facebook.com/clarobisztro",
  instagram: "https://www.instagram.com/clarobisztro",
};
