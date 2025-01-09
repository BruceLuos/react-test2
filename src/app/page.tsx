import { ProductList } from "@/components/ProductList";
import { ProductDetail } from "@/components/ProductDetail";

export default function Page() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <ProductList />
      <ProductDetail />
    </main>
  );
}
