import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { Lock, Chrome, Globe, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

const LAST_UPDATED = "March 2026";

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function Section({ icon, title, children }: SectionProps) {
  return (
    <div className="border-b border-slate-800 pb-10 last:border-0 last:pb-0">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      <div className="text-slate-400 text-sm leading-relaxed space-y-3 pl-12">
        {children}
      </div>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function Cross({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="w-4 h-4 mt-0.5 shrink-0 text-center text-red-400 font-bold text-xs leading-4">✕</span>
      <span>{children}</span>
    </li>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />
      <Navbar />
      <main className="relative z-10 flex-1 pt-16">
        <div className="bg-linear-to-b from-slate-900 to-slate-950 border-b border-white/5 py-14 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-5">
              <Lock className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-blue-200 tracking-wide">Privacy Policy</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              Your privacy, plainly explained
            </h1>
            <p className="text-slate-400 text-sm">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-12 space-y-10">

          <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-2xl p-6">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">TL;DR</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              ScanSafe does <strong className="text-white">not</strong> collect, store, or sell your personal data.
              All processing happens locally in your browser. Nothing is sent to any external server.
            </p>
          </div>

          <Section icon={<Chrome style={{ width: 18, height: 18 }} className="text-blue-400" />} title="Chrome Extension">
            <p>
              The ScanSafe extension requests permission to read the URL of your active tab when you interact
              with the extension popup. This URL is used solely to look up information locally within the
              extension — no data leaves your device.
            </p>
            <ul className="space-y-2 mt-2">
              <Cross>We do not read page content, form inputs, passwords, or cookies.</Cross>
              <Cross>We do not track your browsing history or which sites you visit over time.</Cross>
              <Cross>We do not transmit your URL or any other data to a remote server.</Cross>
            </ul>
          </Section>

          <Section icon={<Globe style={{ width: 18, height: 18 }} className="text-blue-400" />} title="Website">
            <p>
              The ScanSafe website performs all trust score lookups locally in your browser. No personal
              information is collected, stored, or shared. Any data you enter into forms on this website
              exists only in your browser's memory and is discarded when you leave the page.
            </p>
            <ul className="space-y-2 mt-2">
              <Cross>No analytics or third-party tracking scripts.</Cross>
              <Cross>No cookies used for tracking or advertising.</Cross>
              <Check>Camera access (barcode scanner) is used only while the scanner is open and is never recorded or transmitted.</Check>
            </ul>
          </Section>

          <Section icon={<Lock style={{ width: 18, height: 18 }} className="text-blue-400" />} title="Data Retention">
            <p>
              ScanSafe does not operate a backend server and does not store any user data. There is
              nothing to retain, share, or delete. We have no access to your personal information.
            </p>
          </Section>

          <Section icon={<ShieldCheck style={{ width: 18, height: 18 }} className="text-blue-400" />} title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The "last updated" date at the top
              of this page will reflect any changes. Continued use of ScanSafe constitutes acceptance
              of the revised policy.
            </p>
          </Section>

          <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <p className="text-white font-semibold mb-1">Questions about privacy?</p>
            <p className="text-slate-400 text-sm mb-4">We're students, not a corporation — reach out and we'll explain anything.</p>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl transition-colors">
              ← Back to ScanSafe
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
