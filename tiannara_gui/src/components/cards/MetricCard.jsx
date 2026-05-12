export default function MetricCard({ title, value, subtitle, trend = null }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      {trend && (
        <div className={`mt-3 text-xs font-medium ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last period
        </div>
      )}
    </div>
  );
}
