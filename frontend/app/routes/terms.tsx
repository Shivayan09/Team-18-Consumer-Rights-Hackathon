import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { ScrollText, AlertTriangle, ShieldAlert, ShieldCheck, CheckCircle2 } from "lucide-react";
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

function Cross({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="w-4 h-4 mt-0.5 shrink-0 text-center text-red-400 font-bold text-xs leading-4">✕</span>
      <span>{children}</span>
    </li>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />
      <Navbar />
      <main className="relative z-10 flex-1 pt-16">
        <div className="bg-linear-to-b from-slate-900 to-slate-950 border-b border-white/5 py-14 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-5">
              <ScrollText className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-blue-200 tracking-wide">Terms of Service</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              What ScanSafe is
            </h1>
            <p className="text-slate-400 text-sm">Last updated: {LAST_UPDATED}</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-12 space-y-10">

          <div className="bg-amber-500/8 border border-amber-500/20 rounded-2xl p-6">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">TL;DR</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              ScanSafe is a <strong className="text-white">student project</strong> provided as-is.
              Trust scores and registration data shown are for demonstration purposes only and are not
              sourced from BIS, FSSAI, or any government registry.
            </p>
          </div>

          <Section icon={<ScrollText style={{ width: 18, height: 18 }} className="text-blue-400" />} title="Acceptance of Terms">
            <p>
              By accessing or using ScanSafe, you agree to be bound by these Terms of Service. If you
              do not agree, please discontinue use of the service.
            </p>
          </Section>

          <Section icon={<AlertTriangle style={{ width: 18, height: 18 }} className="text-blue-400" />} title="Nature of the Service">
            <p>
              ScanSafe is a student project developed for educational and demonstrative purposes. It is
              provided as-is, without warranties of any kind, express or implied. The service is a
              prototype and should not be relied upon for any real-world compliance, legal, or purchasing decisions.
            </p>
          </Section>

          <Section icon={<ShieldAlert style={{ width: 18, height: 18 }} className="text-blue-400" />} title="Data Disclaimer">
            <p>
              All trust scores, registration numbers, and compliance data displayed by ScanSafe are
              pre-populated demonstration values. They are not retrieved from, verified against, or
              in any way affiliated with any government body or regulatory authority, including:
            </p>
            <ul className="space-y-2 mt-2">
              <Cross>Bureau of Indian Standards (BIS)</Cross>
              <Cross>Food Safety and Standards Authority of India (FSSAI)</Cross>
              <Cross>Ministry of Corporate Affairs (MCA)</Cross>
              <Cross>Any other government or regulatory body</Cross>
            </ul>
            <p className="mt-3">
              Always verify registrations directly with the relevant authority before making any decision.
            </p>
          </Section>

          <Section icon={<ShieldCheck style={{ width: 18, height: 18 }} className="text-blue-400" />} title="Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, ScanSafe and its developers shall not
              be liable for any direct, indirect, incidental, or consequential damages arising from the
              use of or reliance on this service or the information it presents.
            </p>
          </Section>

          <Section icon={<ScrollText style={{ width: 18, height: 18 }} className="text-blue-400" />} title="Changes to These Terms">
            <p>
              These terms may be updated at any time. The "last updated" date at the top of this page
              will reflect any changes. Continued use of ScanSafe constitutes acceptance of the revised terms.
            </p>
          </Section>

          <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <p className="text-white font-semibold mb-1">Questions about these terms?</p>
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
