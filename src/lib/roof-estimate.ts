/**
 * The LGS roof cost estimate behind /cost-calculator.
 *
 * Pure functions and one rate table, no React and no I/O, so the page, the
 * lead API and any test can run the same arithmetic. Every price lives in
 * RATES below; change a number there and the calculator, the breakdown and
 * the WhatsApp summary all follow.
 *
 * The model, in the order a quantity surveyor would take it off:
 *
 *   footprint (what the visitor knows: the building's outline on plan)
 *     + eaves overhang all round          -> roof plan area
 *     x slope factor for the pitch        -> roof surface area
 *   steel   = plan area x kg/m2 for shape and use x N/kg fabricated
 *   install = surface area x N/m2, more for upper storeys
 *   cover   = surface area x (1 + waste) x N/m2 for the chosen covering
 *   edges   = eaves perimeter x fascia/gutter N/m (when chosen)
 *   plus engineering, logistics outside Abuja, and stripping an old roof.
 *
 * Every rate is a [low, high] pair, so the result is an honest range rather
 * than one confident number.
 */

export type Range = readonly [low: number, high: number];

export const BUILDING_TYPES = {
  house: { label: "House or duplex", hint: "Spans up to about 8 m" },
  commercial: { label: "Commercial or institutional", hint: "Offices, schools, churches, halls" },
  warehouse: { label: "Warehouse or industrial", hint: "Wide clear spans" },
} as const;
export type BuildingType = keyof typeof BUILDING_TYPES;

export const ROOF_SHAPES = {
  gable: { label: "Gable", hint: "Two slopes meeting at one ridge" },
  hip: { label: "Hip", hint: "Slopes on all four sides" },
  complex: { label: "Complex hip", hint: "Several hips and valleys, typical of duplexes" },
  concealed: { label: "Concealed (parapet)", hint: "Low-pitch roof hidden behind a parapet wall" },
} as const;
export type RoofShape = keyof typeof ROOF_SHAPES;

export const PITCHES = {
  low: { label: "Low", hint: "About 10 to 15°", degrees: 12 },
  standard: { label: "Standard", hint: "About 25°", degrees: 25 },
  steep: { label: "Steep", hint: "About 35° or more", degrees: 35 },
} as const;
export type Pitch = keyof typeof PITCHES;

export const COVERINGS = {
  none: { label: "Frame only", hint: "We build the steel structure; your roofer sheets it" },
  longspan: { label: "Aluminium long-span", hint: "0.55 mm, the common choice for wide or low roofs" },
  steptile: { label: "Aluminium step-tile", hint: "Tile-look aluminium sheet" },
  stonecoated: { label: "Stone-coated steel tiles", hint: "Milano, Bond or Shingle profiles" },
} as const;
export type Covering = keyof typeof COVERINGS;

export const LOCATIONS = {
  abuja: { label: "Abuja (FCT)" },
  nearby: { label: "Neighbouring states", hint: "Niger, Nasarawa, Kogi, Kaduna, Plateau" },
  further: { label: "Elsewhere in Nigeria" },
} as const;
export type Location = keyof typeof LOCATIONS;

/** All money in naira. All ranges are [low, high]. */
export const RATES = {
  /** Eaves overhang added all round the footprint, metres. */
  overhang: 0.6,

  /**
   * Steel in the finished frame, kg per m2 of roof plan area. Our Akure
   * Residence roof used 6.8 t over 1,080 m2 (6.3 kg/m2); published LGS truss
   * roofs run 6-7 kg/m2 (South Africa), heavier for hips and spans past 12 m.
   * Commercial and industrial spans add a step each.
   */
  steelKgPerM2: {
    house: { gable: [5.5, 7.0], hip: [6.0, 8.0], complex: [6.5, 9.0], concealed: [5.0, 6.5] },
    commercial: { gable: [6.5, 8.5], hip: [7.0, 9.0], complex: [7.5, 10.0], concealed: [6.0, 8.0] },
    warehouse: { gable: [7.5, 10.0], hip: [8.0, 10.5], complex: [8.5, 11.0], concealed: [7.0, 9.5] },
  } satisfies Record<BuildingType, Record<RoofShape, Range>>,

  /**
   * G550 AZ150 sections, roll-formed, with screws, brackets and bracing, per
   * kg. Imported coil is N820-1,460/kg at N1,360-1,390/$ (Nov 2026) before
   * freight and duty; generic cold-formed purlins index at N850/kg (Enugu,
   * Oct 2026) in a lower grade. Replace with our own buying price.
   */
  steelPerKg: [1_200, 1_700] as Range,

  /**
   * Erecting the frame, per m2 of roof surface. No LGS-specific rate is
   * published; Nigerian roof fixing runs N1,000-3,500/m2 (2026 cost guides)
   * and Abuja roofers and welders N12,000 a day.
   */
  installPerM2: [2_000, 4_000] as Range,
  /** Extra on installation for each storey above the first: access and lifting. */
  installPerStorey: 0.08,

  /**
   * Engineering, truss design and drawings: share of the frame, with a floor.
   * No published fee found; set as an assumption for the team to confirm.
   */
  engineeringShare: 0.05,
  engineeringMin: 100_000,

  /**
   * Covering supplied and fixed, per m2 of roof surface, before waste and
   * accessories (added below). Supply prices are 2026 Lagos factory lists
   * (Godspromise Apr 2026, Finelib Oct 2026) plus Abuja Jiji asks; labour
   * N1,500-3,500/m2 (Topken Mar 2026, Skillland Nov 2026).
   * - Long-span 0.55 mm: N5,800-8,100 supply, plus labour and haulage north.
   * - Step-tile 0.55 mm: N6,500-8,300 supply.
   * - Stone-coated: N4,300-6,500 a tile at 2.2 tiles/m2 (0.45 m2 cover each,
   *   per Gerard's spec; several Nigerian blogs wrongly use 0.36 m2).
   */
  coveringPerM2: {
    none: [0, 0],
    longspan: [7_500, 11_000],
    steptile: [8_500, 12_000],
    stonecoated: [10_500, 15_500],
  } satisfies Record<Covering, Range>,
  /** Cutting waste and laps on the covering, by roof shape. */
  coveringWaste: { gable: 0.05, hip: 0.1, complex: 0.15, concealed: 0.05 } satisfies Record<RoofShape, number>,
  /** Ridges, hips, flashings and fixings, as a share of the covering. */
  coveringAccessories: 0.1,

  /**
   * Fascia board and gutters, per metre of eaves, fixed: fascia N1,000-2,500/m
   * (timber to fibre-cement), gutter N1,000-2,700/m (PVC to aluminium), with
   * brackets, outlets, downpipes and labour on top.
   */
  gutterPerM: [4_000, 8_000] as Range,

  /**
   * Removing and carting away an existing roof, per m2 of surface. No
   * published rate found; set from roofing labour rates (N1,000-2,500/m2)
   * plus disposal. Confirm against our own jobs.
   */
  stripPerM2: [1_200, 2_500] as Range,

  /** Transport and crew upkeep outside Abuja, share of the job before it. */
  logistics: { abuja: [0, 0], nearby: [0.04, 0.07], further: [0.08, 0.15] } satisfies Record<Location, Range>,
} as const;

export type RoofInput = {
  buildingType: BuildingType;
  /** The building's outline on plan, m2. Not the total floor area of all storeys. */
  footprint: number;
  /** When known, length and width give a truer eaves perimeter than the area alone. */
  length?: number;
  width?: number;
  storeys: number;
  shape: RoofShape;
  pitch: Pitch;
  covering: Covering;
  gutters: boolean;
  reroof: boolean;
  location: Location;
};

export type LineItem = { key: string; label: string; detail: string; range: Range };

export type RoofEstimate = {
  planArea: number;
  surfaceArea: number;
  eavesLength: number;
  steelKg: Range;
  items: LineItem[];
  total: Range;
  /** Per m2 of roof surface, for comparing with other quotes. */
  perM2: Range;
};

const scale = (r: Range, by: number): Range => [r[0] * by, r[1] * by];
const add = (a: Range, b: Range): Range => [a[0] + b[0], a[1] + b[1]];

/** Rounded to the nearest N10,000 at the low end and up at the high end. */
function roundRange([low, high]: Range): Range {
  return [Math.floor(low / 10_000) * 10_000, Math.ceil(high / 10_000) * 10_000];
}

export function estimateRoof(input: RoofInput): RoofEstimate {
  const { footprint, shape } = input;
  const o = shape === "concealed" ? 0 : RATES.overhang;

  // The outline's perimeter: exact from length and width, otherwise from the
  // area with an allowance for the steps and wings of a real house plan.
  const perimeter =
    input.length && input.width
      ? 2 * (input.length + input.width)
      : 4 * Math.sqrt(footprint) * 1.1;

  const planArea = footprint + perimeter * o + 4 * o * o;
  const eavesLength = perimeter + 8 * o;
  // A concealed roof is low-pitched whatever the visitor picks.
  const degrees = shape === "concealed" ? 8 : PITCHES[input.pitch].degrees;
  const surfaceArea = planArea / Math.cos((degrees * Math.PI) / 180);

  const steelKg = scale(RATES.steelKgPerM2[input.buildingType][shape], planArea);
  const steel = [steelKg[0] * RATES.steelPerKg[0], steelKg[1] * RATES.steelPerKg[1]] as Range;

  const storeyFactor = 1 + RATES.installPerStorey * Math.max(0, input.storeys - 1);
  const install = scale(RATES.installPerM2, surfaceArea * storeyFactor);

  const frame = add(steel, install);
  const engineering: Range = [
    Math.max(RATES.engineeringMin, frame[0] * RATES.engineeringShare),
    Math.max(RATES.engineeringMin, frame[1] * RATES.engineeringShare),
  ];

  const items: LineItem[] = [
    {
      key: "steel",
      label: "G550 steel frame",
      detail: `About ${fmtKg(steelKg[0])} to ${fmtKg(steelKg[1])} of roll-formed trusses and purlins`,
      range: steel,
    },
    {
      key: "install",
      label: "Installation",
      detail: `${Math.round(surfaceArea)} m² of roof, erected by our crew${input.storeys > 1 ? ` at ${input.storeys} storeys` : ""}`,
      range: install,
    },
    {
      key: "engineering",
      label: "Engineering and design",
      detail: "Load calculation, truss layout and drawings",
      range: engineering,
    },
  ];

  if (input.covering !== "none") {
    const coverArea = surfaceArea * (1 + RATES.coveringWaste[shape]);
    const covering = scale(RATES.coveringPerM2[input.covering], coverArea * (1 + RATES.coveringAccessories));
    items.push({
      key: "covering",
      label: COVERINGS[input.covering].label,
      detail: "Supplied and fixed, with ridges, hips, flashings and laps",
      range: covering,
    });
  }

  if (input.gutters) {
    items.push({
      key: "gutters",
      label: "Fascia and gutters",
      detail: `About ${Math.round(eavesLength)} m of eaves`,
      range: scale(RATES.gutterPerM, eavesLength),
    });
  }

  if (input.reroof) {
    items.push({
      key: "strip",
      label: "Removing the old roof",
      detail: "Stripping, lowering and carting away",
      range: scale(RATES.stripPerM2, surfaceArea),
    });
  }

  const subtotal = items.reduce<Range>((sum, item) => add(sum, item.range), [0, 0]);
  const logisticsShare = RATES.logistics[input.location];
  if (logisticsShare[1] > 0) {
    items.push({
      key: "logistics",
      label: "Transport and crew upkeep",
      detail: `Moving steel and the crew to ${LOCATIONS[input.location].label.toLowerCase()}`,
      range: [subtotal[0] * logisticsShare[0], subtotal[1] * logisticsShare[1]],
    });
  }

  const total = roundRange(items.reduce<Range>((sum, item) => add(sum, item.range), [0, 0]));
  return {
    planArea,
    surfaceArea,
    eavesLength,
    steelKg,
    items: items.map((item) => ({ ...item, range: roundRange(item.range) })),
    total,
    perM2: [total[0] / surfaceArea, total[1] / surfaceArea],
  };
}

function fmtKg(kg: number) {
  return kg >= 1000 ? `${(kg / 1000).toFixed(1)} t` : `${Math.round(kg / 10) * 10} kg`;
}
