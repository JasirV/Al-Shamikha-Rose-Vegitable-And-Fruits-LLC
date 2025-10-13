import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  category?: string;
}

const ProductCard = ({ name, price, image, category }: ProductCardProps) => {
  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in buying ${name} (Price: AED ${price}/kg).`
    );
    const whatsappUrl = `https://wa.me/971XXXXXXXXX?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card className="group overflow-hidden hover-lift hover-glow border-border/50 animate-fade-in-up">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {category && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm">
            <span className="text-xs font-medium text-primary-foreground">
              {category}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-2xl font-bold text-gradient-primary">
          AED {price}
          <span className="text-sm text-muted-foreground font-normal">/kg</span>
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleWhatsAppOrder}
          className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white"
        >
          <MessageCircle className="h-4 w-4" />
          Order on WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
