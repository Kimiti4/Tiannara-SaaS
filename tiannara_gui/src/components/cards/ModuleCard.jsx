import Badge from "../ui/Badge";

export default function ModuleCard({ module }) {
  const statusColor = module.enabled ? "success" : "default";
  
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{module.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{module.description || "No description available"}</p>
        </div>
        <Badge variant={statusColor}>
          {module.enabled ? "Active" : "Inactive"}
        </Badge>
      </div>
      
      <div className="mt-4 space-y-2 text-sm text-slate-300">
        {module.version && (
          <p><span className="font-semibold text-white">Version:</span> {module.version}</p>
        )}
        {module.risk_tier && (
          <p><span className="font-semibold text-white">Risk tier:</span> {module.risk_tier}</p>
        )}
        {module.permissions && module.permissions.length > 0 && (
          <p><span className="font-semibold text-white">Permissions:</span> {module.permissions.join(", ")}</p>
        )}
      </div>
    </div>
  );
}
