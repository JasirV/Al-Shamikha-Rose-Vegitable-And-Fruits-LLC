import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } =
    useCart();

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = "Hi, I'd like to order the following items:\n\n";
    cart.forEach((item) => {
      message += `• ${item.name} - ${item.quantity}kg @ AED ${item.price}/kg = AED ${(
        item.price * item.quantity
      ).toFixed(2)}\n`;
    });
    message += `\nTotal: AED ${getTotalPrice().toFixed(2)}`;

    const whatsappUrl = `https://wa.me/+971547453650?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Start shopping to add items to your cart
            </p>
            <Link to="/">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-4xl md:text-5xl font-bold">
                Shopping <span className="text-gradient-primary">Cart</span>
              </h1>
              <Button
                variant="outline"
                onClick={clearCart}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4 mb-8">
              {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>
                            {item.category && (
                              <span className="text-xs text-muted-foreground">
                                {item.category}
                              </span>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-medium min-w-[3ch] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm text-muted-foreground">
                              kg
                            </span>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">
                              AED {item.price}/kg
                            </div>
                            <div className="text-lg font-bold text-gradient-primary">
                              AED {(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold">Total</span>
                  <span className="text-3xl font-bold text-gradient-primary">
                    AED {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={handleWhatsAppCheckout}
                  className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Checkout on WhatsApp
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  You'll be redirected to WhatsApp to complete your order
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
