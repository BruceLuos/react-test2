import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProductStore {
  selectedProductId: number | null
  setSelectedProduct: (id: number | null) => void
}

export const useStore = create(
  persist<ProductStore>(
    (set) => ({
      selectedProductId: null,
      setSelectedProduct: (id) => set({ selectedProductId: id }),
    }),
    {
      name: 'product-storage',
    }
  )
)
