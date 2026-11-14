import Link from 'next/link';
import Image from 'next/image';
import { Footer, Header } from './components';

const steps = [
  {
    number: '01',
    title: 'Scan a barcode',
    description: 'Point your phone camera at a food product to look it up.',
  },
  {
    number: '02',
    title: 'Explore the details',
    description: 'Review nutrition facts, nutrient ratings, and additives.',
  },
  {
    number: '03',
    title: 'Choose with confidence',
    description: 'Use clear product information to support your next choice.',
  },
];

export default function Home() {
  return (
    <div className="landing-page flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-6">
        <Header />
        <main className="flex-1">
          <section className="hero-section grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
            <div className="hero-copy">
              <p className="hero-kicker">
                <span className="hero-kicker-dot" />
                Scan. Understand. Choose better.
              </p>
              <h1 className="hero-title">NUTRI TRACKER</h1>
              <p className="hero-subtitle">
                Barcode-Based Nutrition Information Retrieval System
              </p>
              <p className="mt-5 max-w-xl text-base leading-7 text-text-2 sm:text-lg">
                Scan a food barcode and get a clearer picture of its nutrition.
                Nutri Tracker turns product information into insights that are
                easier to understand.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/app" className="hero-button">
                  Open Nutri Tracker <span aria-hidden="true">→</span>
                </Link>
                <Link href="#how-it-works" className="hero-text-link">
                  See how it works
                </Link>
              </div>
              <p className="mt-5 text-sm text-text-3">
                Barcode scanning works best on a supported mobile browser.
              </p>
            </div>

            <div className="hero-art" aria-label="Nutrition tracking overview">
              <div className="hero-art-glow" />
              <div className="hero-feature-card">
                <div className="flex items-center justify-between gap-3">
                  <span className="hero-card-label">A smarter look at food</span>
                  <span className="hero-card-mark" aria-hidden="true">✓</span>
                </div>
                <div className="hero-food-illustration">
                  <Image
                    src="/vegetables.png"
                    alt="Illustration of a fresh vegetable"
                    width={210}
                    height={210}
                    priority
                  />
                </div>
                <div className="hero-card-caption">
                  <span className="hero-caption-line" />
                  <div>
                    <p className="font-semibold text-text">Product insights</p>
                    <p className="mt-1 text-sm text-text-3">
                      Scan a label. Understand what&apos;s inside.
                    </p>
                  </div>
                </div>
                <div className="hero-card-tags" aria-label="Information available">
                  <span>Nutrition facts</span>
                  <span>Nutrient ratings</span>
                  <span>Additives</span>
                </div>
              </div>
              <div className="hero-floating-note">
                <span className="hero-note-icon" aria-hidden="true">⌁</span>
                <span>Food facts, made clearer</span>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="how-section py-12 sm:py-16">
            <div className="max-w-2xl">
              <p className="section-eyebrow">HOW IT WORKS</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
                A little more insight, with every scan.
              </h2>
              <p className="mt-4 leading-7 text-text-2">
                Get the details behind packaged food in three simple steps.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <article className="step-card" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <h3 className="mt-7 text-lg font-semibold text-text">{step.title}</h3>
                  <p className="mt-2 leading-6 text-text-2">{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="bottom-cta my-12 flex flex-col items-start justify-between gap-6 rounded-3xl p-6 sm:my-16 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="section-eyebrow">MAKE YOUR NEXT SHOPPING TRIP COUNT</p>
              <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
                Know more about what you eat.
              </h2>
            </div>
            <Link href="/app" className="hero-button shrink-0">
              Get started <span aria-hidden="true">→</span>
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
