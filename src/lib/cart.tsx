'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export interface CartItem {
  id: string // unique key for this line item
  sizeId: string
  sizeName: string
  capacity: string
  engraving: string // 'none' | 'yakiin' | 'laser'
  engravingLabel: string
  coating: boolean
  lid: boolean
  quantity: number
  unitPrice: number
  setupFee: number // engraving setup (one-time per item)
  lineTotal: number // unitPrice * quantity + setupFee
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  checkoutUrl: string
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = 'masu-cart'

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch {}
    setLoaded(true)
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, loaded])

  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    setItems((prev) => [...prev, { ...item, id: generateId() }])
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 10) return
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, quantity, lineTotal: i.unitPrice * quantity + i.setupFee }
          : i
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.lineTotal, 0)

  // Build checkout URL with cart data as base64 JSON
  const checkoutUrl = (() => {
    if (items.length === 0) return '#'
    const cartData = items.map((i) => ({
      size: i.sizeId,
      name: i.sizeName,
      eng: i.engraving,
      coat: i.coating ? 1 : 0,
      lid: i.lid ? 1 : 0,
      qty: i.quantity,
      unit: i.unitPrice,
      setup: i.setupFee,
      total: i.lineTotal,
    }))
    const encoded = encodeURIComponent(JSON.stringify(cartData))
    return `https://shop.fomus.co.jp?cart=${encoded}&total=${totalPrice}&items=${totalItems}`
  })()

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, checkoutUrl }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
