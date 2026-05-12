import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/" },
  { label: "Discovery Lab", path: "/discovery" },
  { label: "Evolution Lab", path: "/evolution" },
  { label: "Autonomous Lab", path: "/autonomous" },
  { label: "Pros Control", path: "/pros" },
  { label: "Runs & Reports", path: "/runs" },
  { label: "Memory Explorer", path: "/memory" },
  { label: "Modules", path: "/modules" },
  { label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 p-5 flex flex-col">
      {/* Logo */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cyan-400">Tiannara</h1>
        <p className="mt-2 text-sm text-slate-400">Core Control Interface</p>
      </div>

      {/* Mission Statement */}
      <div className="mb-6 rounded-xl border border-cyan-900/50 bg-cyan-950/20 p-4">
        <div className="text-sm font-semibold text-cyan-300 mb-2">Mission</div>
        <div className="text-xs text-slate-300 leading-relaxed">
          Advance humanity, preserve life, stay simulation-first, avoid manipulative design.
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-cyan-950/30 text-cyan-300 border border-cyan-800/50"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
