import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface Props {
  durationSeconds: number;
  onExpired: () => void;
  active: boolean;
}

const CountdownTimer = ({ durationSeconds, onExpired, active }: Props) => {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    if (!active) {
      setRemaining(durationSeconds);
      return;
    }
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [active, durationSeconds, onExpired]);

  if (!active) return null;

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isUrgent = remaining <= 60;

  return (
    <div
      className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
        isUrgent
          ? "bg-destructive/15 border border-destructive/30 text-destructive"
          : "bg-primary/10 border border-primary/30 text-primary"
      }`}
    >
      <Clock className="h-4 w-4" />
      <span>
        Seat hold time: {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
    </div>
  );
};

export default CountdownTimer;
