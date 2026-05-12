export default function EmptyState({ 
  title = "No data available", 
  description = "",
  icon = null,
  action = null
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && <div className="mb-4 text-slate-600">{icon}</div>}
      <h3 className="text-lg font-medium text-slate-300">{title}</h3>
      {description && <p className="mt-2 text-sm text-slate-500 max-w-md">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
