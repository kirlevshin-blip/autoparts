import { MOCK_PARTS } from "@/lib/data";
import PartView from "./PartView";

export function generateStaticParams() {
  return MOCK_PARTS.map((p) => ({ id: p.id }));
}

export default function PartPage({ params }: { params: { id: string } }) {
  return <PartView id={params.id} />;
}
