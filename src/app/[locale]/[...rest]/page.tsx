import { notFound } from "next/navigation";

// Any unknown URL under a locale lands here so the localized not-found page renders inside the layout.
export default function CatchAllPage() {
  notFound();
}
