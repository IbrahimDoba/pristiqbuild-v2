import {
  BUILDING_TYPES,
  COVERINGS,
  LOCATIONS,
  PITCHES,
  ROOF_SHAPES,
} from "@/lib/roof-estimate";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const label = (table: Record<string, { label: string }>, key: unknown) =>
  table[String(key)]?.label ?? String(key);

/**
 * A calculator lead's inputs and result as label/value rows, for the admin
 * lead page and the notification email.
 *
 * Version 2 is the LGS roof calculator. Leads saved before it carry the old
 * whole-building calculator's fields and still read correctly.
 */
export function calculatorRows(calc: Record<string, unknown>): [string, string][] {
  if (calc.version !== 2) {
    return [
      ["Calculator", "Old building calculator"],
      ["Building size", `${calc.buildingSize} sqm`],
      ["Floors", String(calc.floors)],
      ["Smart features", calc.smartFeatures ? "Yes" : "No"],
      ["Solar power", calc.solarPower ? "Yes" : "No"],
      ["Estimate shown", naira.format(Number(calc.estimate))],
    ];
  }

  const rows: [string, string][] = [
    ["Building", label(BUILDING_TYPES, calc.buildingType)],
    [
      "Footprint",
      `${calc.footprint} m²${calc.length && calc.width ? ` (${calc.length} × ${calc.width} m)` : ""}`,
    ],
    ["Storeys", String(calc.storeys)],
    ["Roof shape", label(ROOF_SHAPES, calc.shape)],
    ["Pitch", label(PITCHES, calc.pitch)],
    ["Covering", label(COVERINGS, calc.covering)],
    ["Gutters", calc.gutters ? "Yes" : "No"],
    ["Replacing a roof", calc.reroof ? "Yes" : "No"],
    ["Location", label(LOCATIONS, calc.location)],
    ["Roof area", `${calc.roofArea} m²`],
    [
      "Estimate shown",
      `${naira.format(Number(calc.estimateLow))} to ${naira.format(Number(calc.estimateHigh))}`,
    ],
  ];
  return rows;
}
