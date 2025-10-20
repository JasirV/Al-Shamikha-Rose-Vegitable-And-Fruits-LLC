import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { MdAddShoppingCart } from "react-icons/md";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  category,
}: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, imageUrl, category });
  };

  return (
    <Card className="group overflow-hidden hover-lift hover-glow border-border/50 animate-fade-in-up transition-transform duration-300 hover:scale-[1.02]">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {category && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary/90 backdrop-blur-sm">
            <span className="text-[10px] sm:text-xs font-medium text-primary-foreground">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <CardContent className="p-2 sm:p-4 text-center">
        <h3 className="text-[10px] sm:text-lg font-semibold mb-0.5 sm:mb-1 group-hover:text-primary transition-colors truncate">
          {name}
        </h3>
        <p className="text-sm sm:text-2xl font-bold text-gradient-primary">
          AED {price}
          <span className="text-[9px] sm:text-sm text-muted-foreground font-normal">
            /kg
          </span>
        </p>
      </CardContent>

      {/* Add to Cart Button */}
      <CardFooter className="p-2 sm:p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full gap-1 sm:gap-2 text-[10px] sm:text-base py-1 sm:py-2"
        >
          <MdAddShoppingCart  className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Add</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
