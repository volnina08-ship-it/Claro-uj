# Claro Bisztró – weboldal

A [clarobisztro.hu](https://clarobisztro.hu) újraépítése Framer helyett saját fejlesztéssel:
**Next.js 15 + Tailwind CSS 4 + Supabase** (adatbázis, auth, képtárolás).

## Oldalak

| Útvonal | Leírás |
| --- | --- |
| `/` | Kezdőlap (angol) – a régi oldalhoz igazodva az angol él a gyökérben |
| `/hu` | Kezdőlap (magyar), továbbá `/hu/menu`, `/hu/gallery`, `/hu/contact` |
| `/menu`, `/gallery`, `/contact` | Angol aloldalak |
| `/privacy`, `/hu/privacy` | Adatvédelmi tájékoztató |
| `/admin` | Admin felület (bejelentkezéshez kötött) |

## Admin felület (`/admin`)

Supabase e-mail + jelszó belépés. Csak az `admins` táblában szereplő e-mail címek
szerkeszthetnek (RLS védi az összes írást, a képfeltöltést is).

Funkciók:

- **Heti menü** – a Menü oldal „Napi menü" szekciójában megjelenő kép cseréje.
- **Galéria** – képfeltöltés, sorrendezés, törlés, alt szöveg. Az első 6 kép a kezdőlap
  Galéria szekciójában is megjelenik.

Minden más kép (hero kollázs, Menü CTA, menü oldal háttér és képek, Magyaros Ajánlat,
6 oldalas étlap) permanens: a repó `public/images/` mappájában él, cseréjük kódból történik.

A mentett változások kb. 1 percen belül élesednek a publikus oldalon (ISR revalidate).

## Fejlesztés

```bash
cp .env.example .env.local   # Supabase URL + anon kulcs
npm install
npm run dev                  # http://localhost:3000
```

## Supabase

Projekt: `vaugvocquojsbdpstnxd` (Claro, eu-central-1)

- `site_content` – kulcs-érték JSON tartalom (`weekly_menu`, `specialties`)
- `gallery_images` – galéria képek (`hero` / `home` / `gallery` szekció, sorrend)
- `menu_images` – étlap képek
- `admins` – admin e-mail címek (új admin: sor beszúrása ide + Supabase auth user)
- Storage: `media` bucket (publikus olvasás, admin írás)

## Deploy

Szabványos Next.js app – Vercelre tolva azonnal működik. Két env változó kell
(lásd `.env.example`); production domain beállítása után a Supabase dashboardon a
**Authentication → URL Configuration** alatt érdemes a Site URL-t a domainre állítani,
hogy a jelszó-visszaállító e-mail linkje jó helyre mutasson.

## Vizuális ellenőrzés

```bash
node scripts/screenshot.mjs   # futó dev/prod szerver mellett teljes oldalas képek a screenshots/ mappába
```
