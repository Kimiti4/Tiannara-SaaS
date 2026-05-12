export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-slate-800 text-slate-300 border-slate-700",
    success: "bg-emerald-950/30 text-emerald-300 border-emerald-800/60",
    warning: "bg-amber-950/30 text-amber-300 border-amber-800/60",
    danger: "bg-rose-950/30 text-rose-300 border-rose-800/60",
    info: "bg-cyan-950/30 text-cyan-300 border-cyan-800/60",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
