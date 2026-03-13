import Navbar from "@/components/Navbar";
import { useParams, Link } from "react-router-dom";
import { promotions } from "@/data/promotions";
import { CalendarDays, ChevronRight } from "lucide-react";

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const PromotionDetail = () => {
  const { id } = useParams();
  const promo = promotions.find((p) => p.id === id);

  if (!promo) {
    return (
      <div className="min-h-screen bg-gradient-cinema">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="font-bebas text-3xl text-foreground">Promotion not found</h1>
          <Link to="/promotions" className="mt-4 inline-block text-primary hover:underline">
            ← Back to Promotions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/promotions" className="hover:text-primary">Promotions</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground line-clamp-1">{promo.name}</span>
        </nav>

        <h1 className="font-bebas text-3xl md:text-4xl tracking-wide text-primary mb-6">
          {promo.name}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-full md:w-[350px] flex-shrink-0">
            <img
              src={promo.poster}
              alt={promo.name}
              className="w-full rounded-lg border border-border"
            />
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span>{formatDate(promo.start_time)} - {formatDate(promo.end_time)}</span>
            </div>
          </div>

          {/* Description */}
          <div className="flex-1">
            <div className="prose prose-invert max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
              {promo.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetail;
