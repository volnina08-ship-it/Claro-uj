import { notFound } from "next/navigation";

/* Minden nem létező /hu/... útvonal a magyar 404 oldalra fut. */
export default function CatchAll() {
  notFound();
}
