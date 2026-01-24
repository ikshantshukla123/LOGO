import { getAllProducts } from "@/lib/api/products";
import ProductGrid from "@/components/product/ProductGrid";

export default async function ProductsContent() {
  const products = await getAllProducts();

  return <ProductGrid products={products} />;
}