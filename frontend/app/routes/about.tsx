import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { Users, Trophy } from "lucide-react";

const TEAM = [
  { name: "Poran Dip", photo: "/team/poran.jpg" },
  { name: "Parashar", photo: "/team/parashar.jpg" },
  { name: "Shivayan", photo: "/team/shivayan.jpg" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />
      <Navbar />
      <main className="relative z-10 flex-1 pt-16">

        {/* Header */}
        <div className="bg-linear-to-b from-slate-900 to-slate-950 border-b border-white/5 py-14 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-5">
              <Trophy className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-blue-200 tracking-wide">BIS Hackathon 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              Built in a hackathon,<br className="hidden sm:block" /> for real consumers
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              ScanSafe was created during the BIS Hackathon 2026 — a challenge to make India's
              regulatory ecosystem more accessible to everyday consumers.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-12 space-y-10">

          {/* Mission */}
          <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">The Mission</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              Most Indian consumers have no easy way to verify whether an online store is BIS or
              FSSAI registered. ScanSafe makes that check instant — one click, right from your browser.
            </p>
          </div>

          {/* Team */}
          <div className="border-b border-slate-800 pb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <Users style={{ width: 18, height: 18 }} className="text-blue-400" />
              </div>
              <h2 className="text-lg font-bold text-white">Team 18</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {TEAM.map(({ name, photo }) => (
                <div
                  key={name}
                  className="flex flex-col items-center text-center bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 gap-4"
                >
                  <img src={photo} alt={name} className="w-16 h-16 rounded-full object-cover border border-white/10" />
                  <p className="text-white font-semibold text-sm">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Built at */}
          <div className="text-center text-slate-600 text-xs">
            Built at BIS Hackathon 2026, Assam Engineering College
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
