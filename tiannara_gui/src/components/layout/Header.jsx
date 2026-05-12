import { useEffect, useState } from "react";
import { apiGet } from "../../api/client";

export default function Header({ title }) {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [statusColor, setStatusColor] = useState("text-amber-500 border-amber-500");

  useEffect(() => {
    let active = true;

    async function loadStatus() {
      try {
        const data = await apiGet("/status");
        if (!active) return;
        setApiStatus(data.status || "ok");
        setStatusColor(data.status === "ok" 
          ? "text-emerald-400 border-emerald-500" 
          : "text-rose-400 border-rose-500"
        );
      } catch {
        if (!active) return;
        setApiStatus("Offline");
        setStatusColor("text-rose-400 border-rose-500");
      }
    }

    loadStatus();
    const interval = setInterval(loadStatus, 30000); // Refresh every 30s

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="border-b border-slate-800 bg-slate-950 px-6 py-4 flex items-center justify-between">
      <div>
        <div className="text-xs text-slate-500 mb-1">Tiannara Core</div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>

      <div className={`px-4 py-2 rounded-full border ${statusColor} text-sm font-semibold`}>
        API: {apiStatus}
      </div>
    </header>
  );
}
