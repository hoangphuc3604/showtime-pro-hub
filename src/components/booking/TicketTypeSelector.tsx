import { Minus, Plus } from "lucide-react";

export interface TicketType {
  id: string;
  name: string;
  category: string;
  price: number;
}

const ticketTypes: TicketType[] = [
  { id: "adult", name: "Adult", category: "Single", price: 69000 },
  { id: "student", name: "Student / U22", category: "Single", price: 49000 },
  { id: "senior", name: "Senior", category: "Single", price: 55000 },
  { id: "member", name: "Member", category: "Single", price: 45000 },
  { id: "couple", name: "Adult", category: "Couple", price: 128000 },
];

interface Props {
  quantities: Record<string, number>;
  onChange: (quantities: Record<string, number>) => void;
}

const TicketTypeSelector = ({ quantities, onChange }: Props) => {
  const update = (id: string, delta: number) => {
    const current = quantities[id] || 0;
    const next = Math.max(0, Math.min(10, current + delta));
    onChange({ ...quantities, [id]: next });
  };

  return (
    <div>
      <h2 className="font-bebas text-2xl tracking-wide text-foreground mb-4">Select Ticket Type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ticketTypes.map((t) => (
          <div
            key={t.id}
            className="rounded-lg border border-border bg-card p-4 flex flex-col justify-between gap-3"
          >
            <div>
              <p className="font-bebas text-lg tracking-wide text-foreground">{t.name}</p>
              <p className="text-xs font-semibold text-primary">{t.category}</p>
              <p className="text-sm text-muted-foreground mt-1">{t.price.toLocaleString()} VNĐ</p>
            </div>
            <div className="flex items-center gap-0 w-fit">
              <button
                onClick={() => update(t.id, -1)}
                className="h-8 w-8 rounded-l-md bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="h-8 w-10 bg-secondary/60 text-foreground flex items-center justify-center text-sm font-medium">
                {quantities[t.id] || 0}
              </span>
              <button
                onClick={() => update(t.id, 1)}
                className="h-8 w-8 rounded-r-md bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ticketTypes };
export default TicketTypeSelector;
