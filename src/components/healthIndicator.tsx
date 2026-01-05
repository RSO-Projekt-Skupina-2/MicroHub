import { useEffect, useState } from "react";
import { getHealth, HealthStatus } from "../api"; // ali "./api/health" če je tam

export function HealthIndicator() {
  const [health, setHealth] = useState<HealthStatus | null>(null);

  useEffect(() => {
    getHealth().then(setHealth);
  }, []);

  if (!health) return <div>Loading...</div>;

  return (
    <div>
      System status:{" "}
      {health.status === "ok" && "Online"}
      {health.status === "down" && "Offline"}
    </div>
  );
}
