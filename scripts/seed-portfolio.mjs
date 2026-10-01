/**
 * Loads the Master Brief's project list into the portfolio.
 *
 *   pnpm portfolio:seed
 *
 * Idempotent by name: an entry that already exists is left alone, so edits
 * made in /admin/portfolio are never overwritten by running this again.
 */
import { connect } from "./pg-client.mjs";

const ITEMS = [
  {
    name: "Akure Residence",
    location: "Akure, Ondo State",
    tag: "LGS_ROOFING",
    featured: true,
    desc: "A full LGS roof, engineered to the building's geometry, fabricated off-site and installed by our crew, then inspected against the design before handover.",
    sqm: "1,080 sqm",
    steel: "6.8t G550",
    waste: "75% less vs timber",
    href: "/projects/akure-lgs-roofing",
    image: "/LGS/1752987831787.jpeg",
  },
  {
    name: "NITP Secretariat",
    location: "Wuse Zone 5, Abuja",
    tag: "STRUCTURAL",
    desc: "Hybrid roof structure: hot-rolled I-beam primaries carrying LGS secondary trusses.",
  },
  {
    name: "Popville Homes (POP 01)",
    location: "Popville, Mabushi, Abuja",
    tag: "LGS_ROOFING",
    desc: "Roofing contract across a 24-unit estate.",
  },
  {
    name: "Breeze Point Estate",
    location: "Kubwa, Abuja",
    tag: "CONVENTIONAL",
    desc: "Five terrace duplexes, developed in joint venture with the landowner. Conventional construction, nearing completion.",
    href: "/projects/breeze-point-estate",
    image: "/breezepoint/breeze1.jpg",
  },
  {
    name: "Private Residence, Maitama",
    location: "Maitama, Abuja",
    tag: "LGS_ROOFING",
    desc: "LGS roofing for a private residence. Full project details coming soon.",
    href: "/projects/maitama-luxury-mansion",
    image: "/maitama/dji_fly_20250305_140920_676_1741180573389_photo.jpg",
  },
  {
    name: "Aso Grove",
    location: "Abuja",
    tag: "LGS_ROOFING",
    desc: "LGS roofing project. Full project details coming soon.",
    href: "/projects/aso-grove-roofing",
    image: "/aso/aso1.JPG",
  },
  {
    name: "Site Office",
    location: "Abuja",
    tag: "MODULAR_STYLE",
    desc: "An 18 sqm site office built in LGS with fibre-cement cladding and roofing. A completed proof of concept for our modular roadmap.",
    sqm: "18 sqm",
  },
  {
    name: "16-Unit Staff Housing",
    location: "Abuja",
    tag: "IN_DEVELOPMENT",
    desc: "Staff housing of roughly 384 sqm, currently at costing and design stage. Not yet built.",
    sqm: "~384 sqm",
  },
];

const client = await connect();

try {
  let added = 0;
  for (const [index, item] of ITEMS.entries()) {
    const { rowCount } = await client.query(
      `INSERT INTO "PortfolioItem"
         (id, "createdAt", "updatedAt", name, location, tag, featured, "desc",
          sqm, steel, waste, href, image, published, "sortOrder")
       SELECT gen_random_uuid()::text, now(), now(), $1, $2, $3::"PortfolioTag", $4, $5,
              $6, $7, $8, $9, $10, true, $11
       WHERE NOT EXISTS (SELECT 1 FROM "PortfolioItem" WHERE name = $1)`,
      [
        item.name,
        item.location,
        item.tag,
        item.featured ?? false,
        item.desc,
        item.sqm ?? null,
        item.steel ?? null,
        item.waste ?? null,
        item.href ?? null,
        item.image ?? null,
        (index + 1) * 10,
      ]
    );
    added += rowCount;
    console.log(`  ${rowCount ? "added  " : "exists "} ${item.name}`);
  }
  console.log(`\n  ${added} added, ${ITEMS.length - added} already present.\n`);
} finally {
  await client.end();
}
