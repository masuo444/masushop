import siteConfig from './site-config'

const EC_API_BASE = process.env.EC_API_URL || siteConfig.fomusUrl

export interface ProductData {
  id: string
  name: string
  description: string | null
  price: number
  compare_at_price: number | null
  images: string[]
  stock: number
  member_price: number | null
  is_available: boolean
  url: string
}

export async function fetchMasuProducts(): Promise<ProductData[]> {
  try {
    const res = await fetch(`${EC_API_BASE}/api/public/products?tag=枡&limit=20`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function fetchAllProducts(limit = 20): Promise<ProductData[]> {
  try {
    const res = await fetch(`${EC_API_BASE}/api/public/products?limit=${limit}`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}
