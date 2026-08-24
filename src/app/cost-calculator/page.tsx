"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Home,
  Building2,
  Warehouse,
  CheckCircle,
  Info,
  DollarSign,
  FileText,
  Phone
} from "lucide-react";

export default function CostCalculatorPage() {
  const [projectType, setProjectType] = useState<string>("");
  const [buildingSize, setBuildingSize] = useState<string>("");
  const [floors, setFloors] = useState<string>("1");
  const [smartFeatures, setSmartFeatures] = useState<boolean>(false);
  const [solarPower, setSolarPower] = useState<boolean>(false);
  const [estimate, setEstimate] = useState<number | null>(null);

  const projectTypes = [
    { value: "residential", label: "Residential", icon: Home, rate: 65000 },
    { value: "commercial", label: "Commercial", icon: Building2, rate: 85000 },
    { value: "industrial", label: "Industrial", icon: Warehouse, rate: 55000 }
  ];

  const calculateEstimate = () => {
    if (!projectType || !buildingSize) return;

    const selectedType = projectTypes.find(t => t.value === projectType);
    if (!selectedType) return;

    const size = parseFloat(buildingSize);
    const floorCount = parseInt(floors);

    // Base cost calculation
    let baseCost = selectedType.rate * size * floorCount;

    // Add smart features (15% premium)
    if (smartFeatures) {
      baseCost *= 1.15;
    }

    // Add solar power (₦8,000 per sqm)
    if (solarPower) {
      baseCost += 8000 * size;
    }

    setEstimate(baseCost);

    // Record the calculation. Fire and forget on purpose: this is our own
    // analytics, so a failure must never interrupt the estimate the visitor
    // asked for. Anonymous runs are stored but do not email the sales team.
    void fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "CALCULATOR",
        projectType,
        buildingSize: size,
        floors: floorCount,
        smartFeatures,
        solarPower,
        estimate: baseCost,
      }),
      keepalive: true,
    }).catch(() => {
      /* Never surfaced to the visitor. */
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white mb-6">
              <Calculator className="w-4 h-4" />
              <span className="text-sm font-semibold">Instant Project Estimates</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Construction Cost Calculator
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed">
              Get an instant estimate for your modular construction project.
              Professional quotes provided within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Calculator Form */}
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-steel-900 mb-6 sm:mb-8">
                  Project Details
                </h2>

                {/* Project Type */}
                <div className="mb-8">
                  <label className="block text-steel-900 font-semibold mb-4">
                    Project Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {projectTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setProjectType(type.value)}
                        className={`p-4 sm:p-6 rounded-xl border-2 transition-colors ${
                          projectType === type.value
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <type.icon
                          className={`w-8 h-8 mx-auto mb-3 ${
                            projectType === type.value ? 'text-primary-600' : 'text-steel-400'
                          }`}
                        />
                        <div className={`text-sm font-semibold ${
                          projectType === type.value ? 'text-primary-600' : 'text-steel-700'
                        }`}>
                          {type.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Building Size */}
                <div className="mb-8">
                  <label className="block text-steel-900 font-semibold mb-3">
                    Building Size (Square Meters) *
                  </label>
                  <input
                    type="number"
                    value={buildingSize}
                    onChange={(e) => setBuildingSize(e.target.value)}
                    placeholder="e.g., 250"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-600 focus:outline-none text-steel-900"
                  />
                  <p className="text-sm text-steel-500 mt-2">
                    Enter the total floor area in square meters
                  </p>
                </div>

                {/* Number of Floors */}
                <div className="mb-8">
                  <label className="block text-steel-900 font-semibold mb-3">
                    Number of Floors
                  </label>
                  <select
                    value={floors}
                    onChange={(e) => setFloors(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-600 focus:outline-none text-steel-900"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Floor' : 'Floors'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional Features */}
                <div className="mb-8">
                  <label className="block text-steel-900 font-semibold mb-4">
                    Additional Features
                  </label>
                  <div className="space-y-3">
                    <label className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={smartFeatures}
                        onChange={(e) => setSmartFeatures(e.target.checked)}
                        className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-steel-900">Smart Building Features</div>
                        <div className="text-sm text-steel-600">IoT automation, climate control, security systems</div>
                      </div>
                      <div className="text-primary-600 font-semibold sm:text-right">+15%</div>
                    </label>

                    <label className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={solarPower}
                        onChange={(e) => setSolarPower(e.target.checked)}
                        className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-steel-900">Solar Power System</div>
                        <div className="text-sm text-steel-600">Reduce energy costs by up to 60%</div>
                      </div>
                      <div className="text-primary-600 font-semibold sm:text-right">₦8k/m²</div>
                    </label>
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={calculateEstimate}
                  disabled={!projectType || !buildingSize}
                  className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Estimate
                </button>
              </div>

              {/* Results Panel */}
              <div>
                {estimate !== null ? (
                  <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-2xl p-6 sm:p-8 text-white lg:sticky lg:top-32">
                    <h3 className="text-xl sm:text-2xl font-bold mb-6">Estimated Cost</h3>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6">
                      <div className="text-sm text-primary-100 mb-2">Project Estimate</div>
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 break-words">
                        {formatCurrency(estimate)}
                      </div>
                      <div className="text-sm text-primary-100">
                        ±10% based on final specifications
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-white/90">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>Design & engineering included</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/90">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>LGS framing & structure</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/90">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>Installation & assembly</span>
                      </div>
                      <div className="flex items-center gap-3 text-white/90">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span>Project management</span>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-white/90">
                          This is a preliminary estimate. Final pricing depends on site conditions,
                          finishes, and detailed specifications. Request a detailed quote for accuracy.
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="block w-full py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-50 transition-colors text-center"
                    >
                      Get Detailed Quote
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                      <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-steel-900 mb-3 sm:mb-4">
                      Ready to Calculate?
                    </h3>
                    <p className="text-sm sm:text-base text-steel-600 mb-4 sm:mb-6 max-w-sm px-4">
                      Fill in your project details to get an instant cost estimate
                      for your modular construction project.
                    </p>
                    <div className="space-y-3 text-left w-full max-w-sm">
                      <div className="flex items-center gap-3 text-steel-700">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        <span>Instant estimates</span>
                      </div>
                      <div className="flex items-center gap-3 text-steel-700">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        <span>Transparent pricing</span>
                      </div>
                      <div className="flex items-center gap-3 text-steel-700">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        <span>No hidden fees</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-12 text-center">
              What&apos;s Included in Our Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-xl border border-primary-100">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-steel-900 mb-4">Included in Base Price</h3>
                <ul className="space-y-3">
                  {[
                    "Architectural & structural design",
                    "Engineering calculations",
                    "LGS framework & materials",
                    "Factory manufacturing",
                    "Transportation to site",
                    "On-site assembly & installation",
                    "Project management",
                    "Quality assurance"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-steel-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-steel-600 rounded-xl flex items-center justify-center mb-6">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-steel-900 mb-4">Additional Costs</h3>
                <ul className="space-y-3">
                  {[
                    "Site preparation & foundations",
                    "External finishes (cladding, paint)",
                    "Interior finishes (flooring, tiles)",
                    "Electrical & plumbing fixtures",
                    "HVAC systems",
                    "Landscaping",
                    "Permits & approvals",
                    "Utility connections"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-steel-400 flex-shrink-0 mt-0.5" />
                      <span className="text-steel-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary-50 border-l-4 border-primary-600 rounded-r-xl">
              <p className="text-steel-700 leading-relaxed">
                <strong className="text-steel-900">Note:</strong> Every project is unique.
                For the most accurate pricing tailored to your specific needs, site conditions,
                and finish preferences, please contact us for a detailed consultation and quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready for a Detailed Quote?
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 leading-relaxed">
              Our team will provide a comprehensive, itemized quote tailored to your
              exact requirements, usually within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-50 transition-[color,background-color,border-color,transform] hover:scale-105 shadow-xl inline-flex items-center justify-center gap-3 text-lg"
              >
                <FileText className="w-6 h-6" />
                Request Detailed Quote
              </Link>
              <Link
                href="tel:+2348130272706"
                className="px-10 py-5 bg-primary-800 text-white font-bold rounded-xl hover:bg-primary-900 transition-[color,background-color,border-color,transform] hover:scale-105 border-2 border-primary-400 inline-flex items-center justify-center gap-3 text-lg"
              >
                <Phone className="w-6 h-6" />
                Call Us Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
