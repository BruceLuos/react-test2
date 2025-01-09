"use client";

import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Product } from "@/types";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useStore } from "@/store";
import { ImageWithLoading } from "./ImageWithLoading";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/api";

export function ProductDetail() {
  const { selectedProductId, setSelectedProduct } = useStore();

  const handleOpenChange = () => {
    setSelectedProduct(null);
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product", selectedProductId],
    queryFn: () => getProduct(selectedProductId!),
    enabled: !!selectedProductId,
    staleTime: Infinity,
  });

  return (
    <Sheet open={!!selectedProductId} onOpenChange={handleOpenChange}>
      <SheetContent
        className="w-[400px] sm:w-[540px]"
        title={product?.title || "product-title"}
        aria-description={product?.description || "product-description"}
      >
        {isLoading ? (
          <div className="h-full p-6 space-y-4">
            <SheetHeader>
              <SheetTitle>{""}</SheetTitle>
            </SheetHeader>
            <div className="h-64 bg-gray-200 animate-pulse" />
            <div className="h-6 bg-gray-200 animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 animate-pulse w-1/2" />
            <div className="h-4 bg-gray-200 animate-pulse w-1/4" />
            <div className="h-20 bg-gray-200 animate-pulse" />
          </div>
        ) : isError ? (
          <div className="h-full p-6 flex flex-col items-center justify-center text-center">
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
        ) : (
          <ProductContent product={product!} />
        )}
      </SheetContent>
    </Sheet>
  );
}

export function ProductContent({ product }: { product: Product }) {
  return (
    <>
      <SheetHeader className="mt-4">
        <SheetTitle>{product.title}</SheetTitle>
      </SheetHeader>
      <div className="h-full overflow-y-auto p-6">
        <ImageWithLoading
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain"
        />
        <p className="text-gray-600 mt-2">{product.category}</p>
        <p className="font-bold text-xl mt-2">${product.price}</p>
        <p className="mt-4">{product.description}</p>
      </div>
    </>
  );
}
