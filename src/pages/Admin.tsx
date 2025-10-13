import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Lock, Package, Plus } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center mb-6">
              <Lock className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Admin <span className="text-gradient-primary">Panel</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your products and orders
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-8 md:p-12 animate-scale-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-primary mx-auto flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Backend Setup Required
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                To enable product management, authentication, and order handling,
                we need to connect your backend infrastructure.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">User Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure admin login with email and password
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Product Database</h3>
                  <p className="text-sm text-muted-foreground">
                    Store and manage all your fruits and vegetables
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Image Storage</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload and manage product images with Cloudinary
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Contact Form Handling</h3>
                  <p className="text-sm text-muted-foreground">
                    Process and store customer inquiries from the contact page
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Ready to enable these features? Let me know and I'll set up the
                backend for you!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2" disabled>
                  <Plus className="h-5 w-5" />
                  Add Product (Coming Soon)
                </Button>
                <Button size="lg" variant="outline" disabled>
                  View Orders (Coming Soon)
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl bg-muted/50 animate-fade-in-up">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Next Steps
            </h3>
            <p className="text-muted-foreground">
              To activate the admin panel, simply ask me to "Enable the backend"
              or "Connect Lovable Cloud" and I'll set up everything you need for
              product management, authentication, and more!
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Fresh Harvest Dubai. All rights reserved.</p>
          <p className="mt-2">Delivering freshness across Dubai 🌱</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
