import { useNavigate } from "react-router-dom";
import { Product, formatNPR, getDiscount } from "../data/products";
import { cartStore } from "../store/cartStore";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const discount = getDiscount(product.price, product.originalPrice);

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    cartStore.addToCart(product, 1);
  }

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Image area */}
      <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 h-44 flex items-center justify-center overflow-hidden">
        {product.image.startsWith("/") || product.image.startsWith("http") ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
          />
        ) : (
          <span className="text-7xl select-none group-hover:scale-110 transition-transform duration-200">
            {product.image}
          </span>
        )}

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">
            {product.badge}
          </span>
        )}

        {/* Discount pill */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-xs ${i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-200"}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-lg font-black text-gray-900">
            {formatNPR(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatNPR(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Delivery note */}
        <p className="text-[11px] text-orange-500 font-medium flex items-center gap-1">
          <span>⏳</span>
          <span>{product.deliveryNote}</span>
        </p>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="mt-1 w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-sm hover:shadow"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
