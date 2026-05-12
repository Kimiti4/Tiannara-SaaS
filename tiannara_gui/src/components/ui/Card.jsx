export default function Card({ children, className = "", padding = "md" }) {
  const paddings = {
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900 shadow-sm ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
}
