import { Link } from "react-router";

const SITEMAP = [
  {
    heading: "Product",
    links: [
      { label: "Home", to: "/" },
      { label: "Features", to: "/#features" },
      { label: "How It Works", to: "/#how-it-works" },
      { label: "Check", to: "/check" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Terms", to: "/terms" },
      { label: "Privacy", to: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/logo.png" alt="ScanSafe" className="w-7 h-7 rounded-lg" />
              <span className="text-white font-bold">ScanSafe</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Helping Indian consumers verify website trust scores and regulatory compliance.
            </p>
          </div>

          {SITEMAP.map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                {heading}
              </p>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} ScanSafe. Built for Indian consumers.
          </p>
          <p className="text-slate-700 text-xs">Built with ❤️ by Team 18</p>
        </div>
      </div>
    </footer>
  );
}
