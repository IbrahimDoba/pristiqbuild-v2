/**
 * Loads every current project into the portfolio.
 *
 *   pnpm portfolio:seed
 *
 * Idempotent by slug: an entry that already exists is left alone, so edits
 * made in /admin/portfolio are never overwritten by running this again.
 *
 * Slugs that match a folder under app/(site)/projects/ keep their hand-built
 * page; the rest get the generic one. Featured entries are the brief's
 * homepage strip: Akure, Maitama, Breeze Point.
 */
import { connect } from "./pg-client.mjs";

const ITEMS = [
  {
    slug: "akure-lgs-roofing",
    name: "Akure Residence",
    location: "Akure, Ondo State",
    tag: "LGS_ROOFING",
    featured: true,
    desc: "A full LGS roof, engineered to the building's geometry, fabricated off-site and installed by our crew, then inspected against the design before handover.",
    sqm: "1,080 sqm",
    steel: "6.8t G550",
    waste: "75% less vs timber",
    image: "/LGS/1752987831787.jpeg",
  },
  {
    slug: "nitp-secretariat",
    name: "NITP Secretariat",
    location: "Wuse Zone 5, Abuja",
    tag: "STRUCTURAL",
    desc: "Hybrid roof structure: hot-rolled I-beam primaries carrying LGS secondary trusses.",
  },
  {
    slug: "popville-homes-pop-01",
    name: "Popville Homes (POP 01)",
    location: "Popville, Mabushi, Abuja",
    tag: "LGS_ROOFING",
    desc: "Roofing contract across a 24-unit estate.",
  },
  {
    slug: "breeze-point-estate",
    name: "Breeze Point Estate",
    location: "Kubwa, Abuja",
    tag: "CONVENTIONAL",
    featured: true,
    desc: "Five terrace duplexes, developed in joint venture with the landowner. Conventional construction, nearing completion.",
    image: "/breezepoint/breeze1.jpg",
  },
  {
    slug: "maitama-luxury-mansion",
    name: "Private Residence, Maitama",
    location: "Maitama, Abuja",
    tag: "LGS_ROOFING",
    featured: true,
    desc: "LGS roofing for a private residence. Full project details coming soon.",
    image: "/maitama/dji_fly_20250305_140920_676_1741180573389_photo.jpg",
  },
  {
    slug: "aso-grove-roofing",
    name: "Aso Grove",
    location: "Abuja",
    tag: "LGS_ROOFING",
    desc: "LGS roofing project. Full project details coming soon.",
    image: "/aso/aso1.JPG",
  },
  {
    slug: "lgs-site-office",
    name: "Site Office",
    location: "Abuja",
    tag: "MODULAR_STYLE",
    desc: "An 18 sqm site office built in LGS with fibre-cement cladding and roofing. A completed proof of concept for our modular roadmap.",
    sqm: "18 sqm",
  },
  {
    slug: "16-unit-staff-housing",
    name: "16-Unit Staff Housing",
    location: "Abuja",
    tag: "IN_DEVELOPMENT",
    desc: "Staff housing of roughly 384 sqm, currently at costing and design stage. Not yet built.",
    sqm: "~384 sqm",
  },
];

// Not in the brief's portfolio grid (it is a development), but it is current
// work with its own page, so it is listed. Last in order, not featured.
ITEMS.push({
  slug: "opulence-heights",
  name: "Opulence Heights",
  location: "Dawaki Hillside, Abuja",
  tag: "IN_DEVELOPMENT",
  desc: "18 villas, 5 ensuite bedrooms plus BQ each, in joint venture with EFAB Properties. Phase 1 at foundation stage.",
  image: "/dawaki estate/1.png",
});

const client = await connect();

try {
  let added = 0;
  for (const [index, item] of ITEMS.entries()) {
    const { rowCount } = await client.query(
      `INSERT INTO "PortfolioItem"
         (id, "createdAt", "updatedAt", slug, name, location, tag, featured, "desc",
          sqm, steel, waste, image, published, "sortOrder")
       VALUES (gen_random_uuid()::text, now(), now(), $1, $2, $3, $4::"PortfolioTag", $5, $6,
               $7, $8, $9, $10, true, $11)
       ON CONFLICT (slug) DO NOTHING`,
      [
        item.slug,
        item.name,
        item.location,
        item.tag,
        item.featured ?? false,
        item.desc,
        item.sqm ?? null,
        item.steel ?? null,
        item.waste ?? null,
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
