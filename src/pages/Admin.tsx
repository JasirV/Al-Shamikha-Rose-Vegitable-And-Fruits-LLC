import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Package,
  Plus,
  LogOut,
  User,
  Edit,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import ProductModal from "@/components/ProductModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Product } from "@/types/product";
import Footer from "@/components/Footer";
import AdminNavigation from "@/components/AdminNavigation";

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  // Auth & Products listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        const productsRef = collection(db, "products");
        const unsubscribeProducts = onSnapshot(
          productsRef,
          (snapshot) => {
            const productsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Product[];
            setProducts(productsData);
            setLoading(false);
          },
          (error) => {
            console.error("Firestore error:", error);
            setLoading(false);
          }
        );

        return () => unsubscribeProducts();
      } else {
        setUser(null);
        setLoading(false);
        navigate("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  // Sign out
 

  // Edit product
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  // Delete product
  const handleDeleteProduct = async () => {
    if (!deleteProduct) return;

    try {
      await deleteDoc(doc(db, "products", deleteProduct.id));
      setDeleteProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        {/* User Info */}
        <AdminNavigation/>

        {/* Page Title */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center mb-6">
            <Package className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Product <span className="text-gradient-primary">Management</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your fruits and vegetables inventory
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-6 bg-card rounded-2xl border border-border/50 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            <p className="text-muted-foreground">
              {products.length} product{products.length !== 1 ? "s" : ""} in
              inventory
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingProduct(null);
              setShowProductModal(true);
            }}
            size="lg"
            className="gap-2 bg-primary hover:bg-primary/90 transition-all"
          >
            <Plus className="h-5 w-5" />
            Add New Product
          </Button>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 animate-scale-in"
              >
                <div className="relative h-48 bg-muted/30 rounded-t-2xl overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-blue-500/80 backdrop-blur-sm hover:bg-primary/20 transition-all"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 p-0 bg-destructive/80 backdrop-blur-sm hover:bg-destructive transition-all"
                      onClick={() => setDeleteProduct(product)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 truncate">
                    {product.name}
                  </h3>

                  {product.type === "kg" ? (
                    <div className="flex flex-col text-sm mb-2 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          Price per kg:
                        </span>
                        <span className="font-semibold text-primary">
                          ${product.price}
                        </span>
                      </div>
                      {product.offerPrice && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Offer Price:
                          </span>
                          <span className="font-semibold text-red-600">
                            ${product.offerPrice}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">
                        Box Sizes:
                      </span>
                      {product.boxSizes?.map((box, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-muted-foreground">
                            {box.size}:
                          </span>
                          <span className="font-medium">${box.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-border/50">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.category === "vegetable"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in-up">
            <div className="w-24 h-24 rounded-2xl bg-muted/50 mx-auto flex items-center justify-center mb-6">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground mb-6">
              Get started by adding your first product to the inventory
            </p>
            <Button
              onClick={() => {
                setEditingProduct(null);
                setShowProductModal(true);
              }}
              size="lg"
              className="gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Your First Product
            </Button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteProduct?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
      />

      {/* Footer */}
<Footer/>
    </div>
  );
};

export default Admin;
