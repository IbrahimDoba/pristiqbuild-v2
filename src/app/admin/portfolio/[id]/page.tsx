import { notFound } from "next/navigation";
import { getAllPortfolio } from "@/lib/portfolio";
import PortfolioEditor from "@/components/admin/portfolio/PortfolioEditor";

export const dynamic = "force-dynamic";

export default async function EditPortfolioItem({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const items = await getAllPortfolio();
  const item = items.find((i) => i.id === id);
  if (!item) notFound();

  return (
    <PortfolioEditor
      key={item.id}
      item={item}
      others={items.filter((i) => i.published && i.id !== item.id)}
    />
  );
}
