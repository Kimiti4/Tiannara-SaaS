export default function Textarea({ 
  value, 
  onChange, 
  placeholder = "", 
  rows = 4,
  className = "",
  disabled = false
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    />
  );
}
