import { getAllPortfolio } from "@/lib/portfolio";
import PortfolioEditor from "@/components/admin/portfolio/PortfolioEditor";

export const dynamic = "force-dynamic";

export default async function NewPortfolioItem() {
  const items = await getAllPortfolio();
  // After everything else, in the same steps of ten the seed uses.
  const last = Math.max(0, ...items.map((i) => i.sortOrder));

  return (
    <PortfolioEditor
      others={items.filter((i) => i.published)}
      nextSortOrder={Math.ceil((last + 1) / 10) * 10}
    />
  );
}
