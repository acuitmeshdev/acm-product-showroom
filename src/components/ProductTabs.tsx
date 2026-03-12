import { useState } from 'react';

interface Spec {
  label: string;
  value: string;
}

interface PricingPlan {
  plan: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
}

interface Props {
  specs?: Spec[];
  pricing?: PricingPlan[];
  brandColor?: string;
}

const TABS = ['Specifications', 'Pricing'] as const;
type Tab = typeof TABS[number];

export default function ProductTabs({ specs = [], pricing = [], brandColor = '#6366f1' }: Props) {
  const availableTabs = TABS.filter(t => {
    if (t === 'Specifications') return specs.length > 0;
    if (t === 'Pricing') return pricing.length > 0;
    return false;
  });

  const [active, setActive] = useState<Tab>(availableTabs[0] ?? 'Specifications');

  if (availableTabs.length === 0) return null;

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1 w-fit mb-8">
        {availableTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              active === tab
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            style={active === tab ? { backgroundColor: brandColor } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Specs table */}
      {active === 'Specifications' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full">
            <tbody>
              {specs.map((spec, i) => (
                <tr
                  key={i}
                  className={`border-b border-slate-200 last:border-0 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  <td className="py-3.5 px-6 text-slate-600 text-sm font-medium w-1/3">{spec.label}</td>
                  <td className="py-3.5 px-6 text-slate-900 text-sm">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pricing cards */}
      {active === 'Pricing' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricing.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                plan.highlighted
                  ? 'border-indigo-500 bg-indigo-600/10 shadow-xl shadow-indigo-200/50'
                  : 'border-slate-200 bg-white shadow-sm'
              }`}
              style={plan.highlighted ? { borderColor: brandColor } : {}}
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold text-white px-3 py-1 rounded-full"
                  style={{ backgroundColor: brandColor }}
                >
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <p className="text-slate-600 text-sm font-medium mb-2">{plan.plan}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-slate-600 text-sm mb-1">{plan.period}</span>
                  )}
                </div>
              </div>
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: brandColor }}
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-6 block text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? 'text-white hover:opacity-90'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={plan.highlighted ? { backgroundColor: brandColor } : {}}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
