import { notFound } from "next/navigation";

/* Minden egyéb nem létező útvonal az angol 404 oldalra fut. */
export default function CatchAll() {
  notFound();
}
