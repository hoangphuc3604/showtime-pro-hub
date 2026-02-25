import { Minus, Plus } from "lucide-react";

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

const foodItems: FoodItem[] = [
  { id: "popcorn-s", name: "Popcorn (S)", category: "Snacks", price: 35000 },
  { id: "popcorn-l", name: "Popcorn (L)", category: "Snacks", price: 55000 },
  { id: "combo-couple", name: "Combo Couple", category: "Combo", price: 89000 },
  { id: "water", name: "Mineral Water 500ml", category: "Drinks", price: 20000 },
  { id: "soda", name: "Coca Cola 330ml", category: "Drinks", price: 28000 },
  { id: "juice", name: "Orange Juice 327ml", category: "Drinks", price: 28000 },
];

interface Props {
  quantities: Record<string, number>;
  onChange: (quantities: Record<string, number>) => void;
}

const categories = ["Snacks", "Combo", "Drinks"];

const FoodDrinksSelector = ({ quantities, onChange }: Props) => {
  const update = (id: string, delta: number) => {
    const current = quantities[id] || 0;
    const next = Math.max(0, Math.min(10, current + delta));
    onChange({ ...quantities, [id]: next });
  };

  return (
    <div>
      <h2 className="font-bebas text-2xl tracking-wide text-foreground mb-4">Food & Drinks</h2>
      {categories.map((cat) => {
        const items = foodItems.filter((f) => f.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} className="mb-4">
            <p className="text-sm font-medium text-muted-foreground italic text-center mb-3">{cat}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-border bg-card p-4 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-sm text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} VNĐ</p>
                  </div>
                  <div className="flex items-center gap-0 shrink-0">
                    <button
                      onClick={() => update(item.id, -1)}
                      className="h-8 w-8 rounded-l-md bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="h-8 w-10 bg-secondary/60 text-foreground flex items-center justify-center text-sm font-medium">
                      {quantities[item.id] || 0}
                    </span>
                    <button
                      onClick={() => update(item.id, 1)}
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
      })}
    </div>
  );
};

export { foodItems };
export default FoodDrinksSelector;
