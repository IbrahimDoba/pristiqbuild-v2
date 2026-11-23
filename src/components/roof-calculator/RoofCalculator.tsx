"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import {
  BUILDING_TYPES,
  COVERINGS,
  LOCATIONS,
  PITCHES,
  ROOF_SHAPES,
  estimateRoof,
  type BuildingType,
  type Covering,
  type Location,
  type Pitch,
  type RoofInput,
  type RoofShape,
} from "@/lib/roof-estimate";
import { whatsappLink } from "@/lib/site-config";
import RoofShapeIcon from "./RoofShapeIcon";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/** "₦12.4M" or "₦480k": compact, so ranges line up in the breakdown. */
function short(amount: number) {
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(amount >= 10_000_000 ? 1 : 2)}M`;
  return `₦${Math.round(amount / 1_000)}k`;
}

const positive = (value: string) => {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

/** How long inputs must sit still before a calculation is recorded. */
const RECORD_AFTER_MS = 4000;

export default function RoofCalculator() {
  const [buildingType, setBuildingType] = useState<BuildingType>("house");
  const [useDimensions, setUseDimensions] = useState(false);
  const [footprintText, setFootprintText] = useState("");
  const [lengthText, setLengthText] = useState("");
  const [widthText, setWidthText] = useState("");
  const [storeys, setStoreys] = useState(1);
  const [shape, setShape] = useState<RoofShape>("hip");
  const [pitch, setPitch] = useState<Pitch>("standard");
  const [covering, setCovering] = useState<Covering>("stonecoated");
  const [gutters, setGutters] = useState(false);
  const [reroof, setReroof] = useState(false);
  const [location, setLocation] = useState<Location>("abuja");

  const length = positive(lengthText);
  const width = positive(widthText);
  const footprint = useDimensions ? length * width : positive(footprintText);

  const input: RoofInput | null = useMemo(
    () =>
      footprint >= 10
        ? {
            buildingType,
            footprint: Math.round(footprint),
            ...(useDimensions ? { length, width } : {}),
            storeys,
            shape,
            pitch,
            covering,
            gutters,
            reroof,
            location,
          }
        : null,
    [buildingType, footprint, useDimensions, length, width, storeys, shape, pitch, covering, gutters, reroof, location]
  );
  const estimate = useMemo(() => (input ? estimateRoof(input) : null), [input]);

  // Record the calculation once the inputs settle, so the team can see what
  // people are planning. Our own analytics: a failure is never shown.
  const recorded = useRef("");
  useEffect(() => {
    if (!input) return;
    const key = JSON.stringify(input);
    if (key === recorded.current) return;
    const timer = window.setTimeout(() => {
      recorded.current = key;
      void fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "CALCULATOR", ...input }),
        keepalive: true,
      }).catch(() => {});
    }, RECORD_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [input]);

  const message =
    input && estimate
      ? [
          "Hello PristiqBuild, I used your roof cost calculator and would like a proper quote.",
          `Building: ${BUILDING_TYPES[input.buildingType].label}, ${input.storeys} ${input.storeys === 1 ? "storey" : "storeys"}`,
          `Footprint: ${input.footprint} m²${input.length && input.width ? ` (${input.length} × ${input.width} m)` : ""}`,
          `Roof: ${ROOF_SHAPES[input.shape].label}, ${PITCHES[input.pitch].label.toLowerCase()} pitch, ${COVERINGS[input.covering].label.toLowerCase()}`,
          input.gutters ? "With fascia and gutters" : null,
          input.reroof ? "Replacing an existing roof" : null,
          `Location: ${LOCATIONS[input.location].label}`,
          `Estimate shown: ${naira.format(estimate.total[0])} to ${naira.format(estimate.total[1])}`,
          "Site address: ",
        ]
          .filter(Boolean)
          .join("\n")
      : "";

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
      <form onSubmit={(e) => e.preventDefault()} className="lg:col-span-7 space-y-10 pb-16 lg:pb-0" aria-label="Roof details">
        <Step n={1} title="The building">
          <OptionGroup
            legend="What is it?"
            name="buildingType"
            value={buildingType}
            onChange={setBuildingType}
            options={BUILDING_TYPES}
            columns={3}
          />

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <label htmlFor={useDimensions ? "rc-length" : "rc-footprint"} className="font-semibold text-steel-900">
                Footprint
              </label>
              <button
                type="button"
                onClick={() => setUseDimensions((v) => !v)}
                className="text-sm font-medium text-primary-700 hover:text-primary-800 underline underline-offset-4"
              >
                {useDimensions ? "Enter the area instead" : "Enter length and width instead"}
              </button>
            </div>
            {useDimensions ? (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <NumberField id="rc-length" label="Length" unit="m" value={lengthText} onChange={setLengthText} placeholder="18…" />
                <span className="text-steel-400 pt-0" aria-hidden="true">×</span>
                <NumberField id="rc-width" label="Width" unit="m" value={widthText} onChange={setWidthText} placeholder="12…" />
              </div>
            ) : (
              <NumberField id="rc-footprint" label="Footprint" unit="m²" value={footprintText} onChange={setFootprintText} placeholder="200…" hideLabel />
            )}
            <p className="text-sm text-steel-500 mt-2">
              The building&apos;s outline on plan, measured over the outside walls. For a
              duplex, that&apos;s the upper floor, not the two floors added together.
              {useDimensions && footprint > 0 && ` That makes ${Math.round(footprint)} m².`}
            </p>
          </div>

          <div>
            <label htmlFor="rc-storeys" className="block font-semibold text-steel-900 mb-2">
              Storeys
            </label>
            <select
              id="rc-storeys"
              value={storeys}
              onChange={(e) => setStoreys(Number(e.target.value))}
              className="w-full sm:w-48 px-4 py-3 border border-steel-300 rounded-lg bg-white text-steel-900 outline-none focus:border-primary-600 focus-visible:ring-2 focus-visible:ring-primary-600/25"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n === 5 ? "5 or more" : n}
                </option>
              ))}
            </select>
            <p className="text-sm text-steel-500 mt-2">Higher roofs take more lifting and scaffolding.</p>
          </div>
        </Step>

        <Step n={2} title="The roof">
          <fieldset>
            <legend className="font-semibold text-steel-900 mb-3">Shape</legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(Object.keys(ROOF_SHAPES) as RoofShape[]).map((key) => (
                <label
                  key={key}
                  className="relative flex flex-col gap-2 p-4 border border-steel-300 rounded-lg cursor-pointer bg-white hover:border-primary-600 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-600/40 transition-colors"
                >
                  <input type="radio" name="shape" value={key} checked={shape === key} onChange={() => setShape(key)} className="sr-only" />
                  <RoofShapeIcon shape={key} className="w-full h-10 text-primary-700" />
                  <span className="font-semibold text-steel-900 text-sm">{ROOF_SHAPES[key].label}</span>
                  <span className="text-xs text-steel-500 leading-snug">{ROOF_SHAPES[key].hint}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {shape === "concealed" ? (
            <p className="text-sm text-steel-500 -mt-4">A concealed roof is always low-pitched, so pitch is set for you.</p>
          ) : (
            <OptionGroup legend="Pitch" name="pitch" value={pitch} onChange={setPitch} options={PITCHES} columns={3} />
          )}
        </Step>

        <Step n={3} title="Covering and extras">
          <OptionGroup legend="Covering" name="covering" value={covering} onChange={setCovering} options={COVERINGS} />

          <fieldset className="space-y-3">
            <legend className="font-semibold text-steel-900 mb-3">Extras</legend>
            <Check checked={gutters} onChange={setGutters} label="Fascia and gutters" hint="Fascia board and gutters along every eave" />
            <Check checked={reroof} onChange={setReroof} label="Replacing an existing roof" hint="We strip the old roof and cart it away first" />
          </fieldset>
        </Step>

        <Step n={4} title="Where">
          <OptionGroup legend="Site location" name="location" value={location} onChange={setLocation} options={LOCATIONS} columns={3} />
        </Step>
      </form>

      {estimate && (
        // Phones reach the full estimate only after all four steps, so the
        // range rides along at the bottom while the form is filled in.
        <a
          href="#estimate"
          className="lg:hidden fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 bg-deep-steel text-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-white/15"
        >
          <span className="text-xs uppercase tracking-wider text-silver/80">Estimate</span>
          <span className="font-display font-bold tabular">
            {short(estimate.total[0])} to {short(estimate.total[1])}
          </span>
          <span className="text-sm underline underline-offset-4">Details</span>
        </a>
      )}

      <aside
        id="estimate"
        aria-labelledby="estimate-heading"
        className="lg:col-span-5 lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto scroll-mt-28"
      >
        <div className="bg-deep-steel text-white rounded-lg p-6 sm:p-8">
          <h2 id="estimate-heading" className="text-sm font-semibold uppercase tracking-wider text-silver/80 mb-3">
            Estimated cost
          </h2>

          {estimate ? (
            <div>
              <p aria-live="polite" className="font-display font-bold text-4xl sm:text-5xl leading-tight tabular">
                {short(estimate.total[0])} <span className="text-white/50 font-normal">to</span> {short(estimate.total[1])}
              </p>
              <p className="text-white/70 mt-2 tabular">
                {naira.format(estimate.perM2[0])} to {naira.format(estimate.perM2[1])} per m² of roof, excluding VAT
              </p>

              <dl className="grid grid-cols-2 gap-px bg-white/15 border border-white/15 mt-6">
                <div className="bg-deep-steel p-3">
                  <dt className="text-xs text-white/60">Roof area</dt>
                  <dd className="font-display font-bold text-xl tabular">{Math.round(estimate.surfaceArea)} m²</dd>
                </div>
                <div className="bg-deep-steel p-3">
                  <dt className="text-xs text-white/60">G550 steel</dt>
                  <dd className="font-display font-bold text-xl tabular">
                    {(estimate.steelKg[0] / 1000).toFixed(1)}-{(estimate.steelKg[1] / 1000).toFixed(1)} t
                  </dd>
                </div>
              </dl>

              <ul className="mt-6 divide-y divide-white/15 border-y border-white/15">
                {estimate.items.map((item) => (
                  <li key={item.key} className="py-3 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-white/60">{item.detail}</p>
                    </div>
                    <p className="text-sm text-white/85 tabular text-right whitespace-nowrap">
                      {short(item.range[0])}-{short(item.range[1])}
                    </p>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 w-full px-6 py-4 bg-white text-primary-800 rounded-lg font-semibold hover:bg-silver transition-colors"
              >
                <MessageCircle size={20} aria-hidden="true" />
                Send this to us for a firm quote
              </a>
              <p className="text-xs text-white/60 mt-3 leading-relaxed">
                A planning figure from typical Abuja prices in 2026, not a quotation. Your price is
                fixed after we measure the building and engineer the roof.
              </p>
            </div>
          ) : (
            <div>
              <p className="font-display font-bold text-2xl leading-snug mb-3">Enter the footprint to see a figure.</p>
              <p className="text-white/70">
                The estimate updates as you change anything: shape, pitch, covering or location.
              </p>
            </div>
          )}
        </div>

        <Link
          href="/services/lgs-roofing"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          What an LGS roof from us includes
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6 border-t border-steel-200 pt-6" aria-labelledby={`step-${n}`}>
      <h2 id={`step-${n}`} className="flex items-baseline gap-3 heading-sm text-steel-900">
        <span className="font-display font-bold text-primary-700 tabular text-base" aria-hidden="true">
          {String(n).padStart(2, "0")}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function OptionGroup<K extends string>({
  legend,
  name,
  value,
  onChange,
  options,
  columns = 2,
}: {
  legend: string;
  name: string;
  value: K;
  onChange: (value: K) => void;
  options: Record<K, { label: string; hint?: string }>;
  columns?: 2 | 3;
}) {
  return (
    <fieldset>
      <legend className="font-semibold text-steel-900 mb-3">{legend}</legend>
      <div className={`grid gap-3 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {(Object.keys(options) as K[]).map((key) => (
          <label
            key={key}
            className="flex flex-col gap-0.5 p-4 border border-steel-300 rounded-lg cursor-pointer bg-white hover:border-primary-600 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-600/40 transition-colors"
          >
            <input type="radio" name={name} value={key} checked={value === key} onChange={() => onChange(key)} className="sr-only" />
            <span className="font-semibold text-steel-900 text-sm">{options[key].label}</span>
            {options[key].hint && <span className="text-xs text-steel-500 leading-snug">{options[key].hint}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function NumberField({
  id,
  label,
  unit,
  value,
  onChange,
  placeholder,
  hideLabel = false,
}: {
  id: string;
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hideLabel?: boolean;
}) {
  return (
    <div>
      {!hideLabel && (
        <label htmlFor={id} className="block text-sm text-steel-600 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center border border-steel-300 rounded-lg bg-white focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-600/25">
        <input
          id={id}
          name={id}
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-w-0 px-4 py-3 bg-transparent text-steel-900 tabular outline-none"
        />
        <span className="pr-4 text-steel-500" aria-hidden="true">{unit}</span>
      </div>
    </div>
  );
}

function Check({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  hint: string;
}) {
  return (
    <label className="flex items-start gap-3 p-4 border border-steel-300 rounded-lg cursor-pointer bg-white hover:border-primary-600 has-[:checked]:border-primary-700 has-[:checked]:bg-primary-50 transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 accent-primary-700 shrink-0"
      />
      <span>
        <span className="block font-semibold text-steel-900 text-sm">{label}</span>
        <span className="block text-xs text-steel-500">{hint}</span>
      </span>
    </label>
  );
}
