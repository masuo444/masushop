import Image from 'next/image'
import type { ProductData } from '@/lib/api'

export default function ProductCard({ product }: { product: ProductData }) {
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {/* Image */}
      <div className="aspect-square bg-[var(--color-subtle)] overflow-hidden mb-3">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-muted)] text-xs">
            No Image
          </div>
        )}
      </div>
      {/* Info */}
      <h3 className="text-sm text-[var(--foreground)] group-hover:text-[var(--color-muted)] transition-colors">
        {product.name}
      </h3>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-sm text-[var(--foreground)]">
          &yen;{product.price.toLocaleString()}
        </span>
        {hasDiscount && (
          <span className="text-xs text-[var(--color-muted)] line-through">
            &yen;{product.compare_at_price!.toLocaleString()}
          </span>
        )}
      </div>
      {!product.is_available && (
        <span className="text-[10px] text-red-500 mt-1 inline-block">SOLD OUT</span>
      )}
      {/* "FOMUS SHOPで購入" indicator */}
      <p className="text-[10px] text-[var(--color-muted)] mt-2 group-hover:text-[var(--color-accent)] transition-colors">
        FOMUS SHOPで購入 &rarr;
      </p>
    </a>
  )
}
