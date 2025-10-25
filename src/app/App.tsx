import { useMemo } from "react";
import { useSimulationLoop } from "../engine/sim";
import { useGameStore } from "../state/store";
import { SimulationPanel } from "../ui/SimulationPanel";

const FEATURES = [
  {
    title: "Scenario planning",
    description: "Prototype district-scale upgrades in minutes and compare your layouts instantly.",
    detail: "Adapt to seasonality, peak events, or capital constraints with interactive toggles and overlays."
  },
  {
    title: "Financial modelling",
    description: "Track cash flow, incentives, and lifecycle costs as you build.",
    detail: "CityCurrent updates income and expenditure in real time so stakeholders share a single source of truth."
  },
  {
    title: "Community impact",
    description: "Balance pollution, reliability, and resident happiness as you deploy assets.",
    detail: "Transparent metrics keep civic leaders focused on measurable outcomes for every neighbourhood."
  }
];

const HIGHLIGHTS = [
  {
    label: "Supply mix control",
    copy: "Toggle solar, wind, storage, and baseload assets to find your ideal balance in seconds."
  },
  {
    label: "Stakeholder workshops",
    copy: "Pair the live sandbox with CityCurrent's guided playbooks to align technical and non-technical teams."
  },
  {
    label: "Versioned insights",
    copy: "Save scenarios, export KPIs, and revisit previous drafts with traceable decision history."
  }
];

export default function App(): JSX.Element {
  useSimulationLoop();

  const stats = useGameStore((state) => ({
    supply: state.supply,
    demand: state.demand,
    stored: state.stored,
    storageCap: state.storageCap,
    happiness: state.happiness,
    pollution: state.pollution,
    incomePerMin: state.incomePerMin,
    money: state.money
  }));

  const insightCards = useMemo(
    () => [
      {
        title: "Grid balance",
        value: `${stats.supply.toFixed(1)} MW vs ${stats.demand.toFixed(1)} MW`,
        description: "Model microgrid stability under changing load profiles and weather conditions."
      },
      {
        title: "Storage headroom",
        value: `${stats.stored.toFixed(1)} / ${stats.storageCap.toFixed(1)} MWh`,
        description: "Plan dispatchable reserves and investment timing with live capacity insights."
      },
      {
        title: "Resident sentiment",
        value: `${Math.round(stats.happiness * 100)}% happiness`,
        description: "Balance sustainability targets with quality-of-life metrics for every district."
      },
      {
        title: "Financial outlook",
        value: `$${(stats.money / 1000).toFixed(1)}k reserves`,
        description: `Generating $${stats.incomePerMin.toFixed(1)}/min to reinvest in infrastructure and resilience.`
      }
    ],
    [stats.demand, stats.happiness, stats.incomePerMin, stats.money, stats.storageCap, stats.stored, stats.supply]
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 flex justify-center overflow-hidden">
        <div className="h-[600px] w-[1200px] -translate-y-1/3 rounded-full bg-gradient-to-b from-cyan-500/20 via-sky-500/10 to-transparent blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-24 px-6 pb-16 pt-10 sm:px-10 lg:px-16">
        <SiteHeader />
        <main className="flex flex-1 flex-col gap-32">
          <HeroSection stats={stats} />
          <FeatureSection />
          <InsightSection cards={insightCards} />
          <HighlightSection />
          <CTASection />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

function SiteHeader(): JSX.Element {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 text-lg font-semibold tracking-tight">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
          ⚡
        </span>
        <span>CityCurrent</span>
      </div>
      <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-300">
        <a href="#features" className="rounded-full px-4 py-2 transition hover:bg-white/5">
          Features
        </a>
        <a href="#insights" className="rounded-full px-4 py-2 transition hover:bg-white/5">
          Insights
        </a>
        <a href="#stories" className="rounded-full px-4 py-2 transition hover:bg-white/5">
          Stories
        </a>
        <a href="#contact" className="rounded-full bg-sky-500 px-5 py-2 font-semibold text-slate-950 transition hover:bg-sky-400">
          Request a demo
        </a>
      </nav>
    </header>
  );
}

interface HeroSectionProps {
  stats: {
    supply: number;
    demand: number;
    stored: number;
    storageCap: number;
    happiness: number;
    pollution: number;
    incomePerMin: number;
    money: number;
  };
}

function HeroSection({ stats }: HeroSectionProps): JSX.Element {
  return (
    <section id="overview" className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
      <div className="space-y-8">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-300">
            City-scale energy sandbox
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Design resilient power systems for every neighbourhood.
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            CityCurrent blends geospatial context, financial modelling, and citizen impact insights so you can rapidly prototype
            microgrids and city-scale upgrades before breaking ground.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Launch the live sandbox
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/5"
          >
            Download the product brief
          </a>
        </div>
        <dl className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatBlock label="Supply available" value={`${stats.supply.toFixed(1)} MW`} trend="Live" />
          <StatBlock label="Demand today" value={`${stats.demand.toFixed(1)} MW`} trend="Dynamic load" />
          <StatBlock label="Storage ready" value={`${stats.stored.toFixed(1)} / ${stats.storageCap.toFixed(1)} MWh`} trend="Buffer capacity" />
          <StatBlock
            label="Community wellbeing"
            value={`${Math.round(stats.happiness * 100)}% positive`}
            trend={`Air quality ${(100 - Math.round(stats.pollution * 100)).toFixed(0)}% cleaner`}
          />
        </dl>
      </div>
      <div id="demo" className="relative">
        <SimulationPanel />
        <div className="mt-4 text-sm text-slate-400">
          The sandbox updates continuously—invite your stakeholders to experiment together.
        </div>
      </div>
    </section>
  );
}

function FeatureSection(): JSX.Element {
  return (
    <section id="features" className="space-y-10">
      <div className="max-w-2xl space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need to orchestrate a clean-energy rollout.</h2>
        <p className="text-lg text-slate-300">
          CityCurrent keeps planners, utilities, and communities aligned with a shared simulation that turns complex data into
          collaborative action.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="space-y-3 rounded-2xl border border-white/5 bg-white/5 p-6 shadow-lg backdrop-blur">
            <h3 className="text-xl font-semibold text-slate-100">{feature.title}</h3>
            <p className="text-sm font-medium uppercase tracking-wider text-sky-300">{feature.description}</p>
            <p className="text-sm leading-relaxed text-slate-300">{feature.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

interface InsightCard {
  title: string;
  value: string;
  description: string;
}

interface InsightSectionProps {
  cards: InsightCard[];
}

function InsightSection({ cards }: InsightSectionProps): JSX.Element {
  return (
    <section id="insights" className="space-y-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Insights that move with your model.</h2>
          <p className="text-lg text-slate-300">
            Every tile you place updates the underlying economics and community metrics—no manual spreadsheets or stale exports.
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center justify-center self-start rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/5"
        >
          Talk with an energy strategist
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article key={card.title} className="space-y-2 rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-lg ring-1 ring-white/5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-sky-300">{card.title}</h3>
            <p className="text-2xl font-semibold text-slate-100">{card.value}</p>
            <p className="text-sm leading-relaxed text-slate-300">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HighlightSection(): JSX.Element {
  return (
    <section id="stories" className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Built for the teams powering tomorrow's cities.</h2>
        <p className="max-w-3xl text-lg text-slate-300">
          From early-stage concept exploration to procurement and community workshops, CityCurrent keeps every partner informed
          and engaged with a living digital twin of your grid.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {HIGHLIGHTS.map((highlight) => (
          <article key={highlight.label} className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur">
            <div className="text-4xl">✨</div>
            <h3 className="text-lg font-semibold text-slate-100">{highlight.label}</h3>
            <p className="text-sm leading-relaxed text-slate-300">{highlight.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CTASection(): JSX.Element {
  return (
    <section id="contact" className="overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500/20 via-cyan-400/20 to-emerald-400/20 p-10 text-center shadow-2xl ring-1 ring-white/10">
      <div className="mx-auto max-w-3xl space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to prototype your next grid expansion?</h2>
        <p className="text-lg text-slate-100">
          Share your goals and we'll assemble a custom workshop with data ingestion, scenario design, and rollout support tailored to your city.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="mailto:hello@citycurrent.com"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Book a discovery call
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/10"
          >
            Explore the live sandbox
          </a>
        </div>
      </div>
    </section>
  );
}

function SiteFooter(): JSX.Element {
  return (
    <footer className="border-t border-white/10 pt-10 text-sm text-slate-400">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} CityCurrent. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <a className="transition hover:text-slate-200" href="#">
            Privacy
          </a>
          <a className="transition hover:text-slate-200" href="#">
            Terms
          </a>
          <a className="transition hover:text-slate-200" href="mailto:hello@citycurrent.com">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

interface StatBlockProps {
  label: string;
  value: string;
  trend: string;
}

function StatBlock({ label, value, trend }: StatBlockProps): JSX.Element {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur">
      <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</dt>
      <dd className="mt-2 text-2xl font-semibold text-slate-100">{value}</dd>
      <p className="text-xs font-medium text-slate-400">{trend}</p>
    </div>
  );
}
