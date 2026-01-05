import { useEffect, useState } from "react";
import { getHealth, HealthStatus } from "../api";
import "../styles/serverlessFunction.css";

export function HealthIndicator() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Funkcija za osvežitev health statusa
  const fetchHealth = async () => {
    setLoading(true);
    const data = await getHealth();
    setHealth(data);
    setLoading(false);
  };

  useEffect(() => {
    // Prvi klic ob mountu
    fetchHealth();

    // Polling vsako 30s
    const interval = setInterval(fetchHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <span className="health-status loading">🟡 Loading...</span>;
  }

  const statusColor = health?.status === "ok" ? "ok" : "down";
  const statusText = health?.status === "ok" ? "🟢 Online" : "🔴 Offline";

  return (
    <div>
      System status:{" "}
      <span className={`health-status ${statusColor}`} title={`Last checked: ${health?.timestamp}`}>
      {statusText}
    </span>
    </div>
    
  );
}
