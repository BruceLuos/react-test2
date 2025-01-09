"use client";

import { useStore } from "@/store";
import { ImageWithLoading } from "./ImageWithLoading";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import Loading from "@/components/Loading";

export function ProductList() {
  const { setSelectedProduct, selectedProductId } = useStore();
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: Infinity,
  });

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-red-500 text-lg font-semibold mb-4">
          Something went wrong
        </div>
        <div className="text-gray-600 mb-4">
          {error instanceof Error ? error.message : "未知错误"}
        </div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.map((product) => (
        <div
          key={product.id}
          onClick={() => setSelectedProduct(product.id)}
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedProductId === product.id ? "border-blue-500" : ""
          }`}
        >
          <ImageWithLoading
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-contain"
          />
          <h3 className="font-semibold mt-2">{product.title}</h3>
          <p className="text-gray-600">{product.category}</p>
          <p className="font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
