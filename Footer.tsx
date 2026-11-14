import Link from 'next/link';
import { Github } from './';

export default function Footer() {
  return (
    <footer className="mt-12 w-full border-t border-background-2 py-8 text-sm text-text-2">
      <div className="grid gap-8 sm:grid-cols-2 sm:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-1">Contact</p>
          <p className="mt-2 text-lg font-semibold text-text">Avinash Pal</p>
          <address className="mt-3 flex flex-col gap-2 not-italic sm:flex-row sm:gap-5">
            <a className="underline underline-offset-4 hover:no-underline" href="mailto:palavinash702@gmail.com">
              palavinash702@gmail.com
            </a>
            <a className="underline underline-offset-4 hover:no-underline" href="tel:+918429743892">
              +91 8429743892
            </a>
          </address>
        </div>
        <div className="space-y-4 sm:text-right">
          <Link
            href="https://github.com/rezahedi/nutriscan"
            className="inline-flex items-center gap-2"
            aria-label="Nutri Tracker source project on GitHub"
          >
            <Github className="h-5 w-5 fill-text-3" />
            <span className="underline underline-offset-4 hover:no-underline">Source project on GitHub</span>
          </Link>
          <p className="text-xs leading-5 text-text-3">
            Powered by Next.js, MongoDB, Open Food Facts, and the Barcode Detection API.
          </p>
        </div>
      </div>
    </footer>
  );
}