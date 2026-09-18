import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PRODUCTS, formatNPR, getDiscount } from "../data/products";
import { cartStore } from "../store/cartStore";
import ProductCard from "../components/ProductCard";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-500 mb-6">This item may have sold out. Or never existed.</p>
          <Link to="/" className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const discount = getDiscount(product.price, product.originalPrice);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  function handleAddToCart() {
    if (!product) return;
    cartStore.addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    if (!product) return;
    cartStore.addToCart(product, qty);
    navigate("/cart");
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="capitalize text-gray-400">{product.category}</span>
            <span>/</span>
            <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

          {/* Left: Image */}
          <div className="flex flex-col gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl h-72 sm:h-96 flex items-center justify-center relative border border-orange-100 overflow-hidden">
              {product.image.startsWith("/") || product.image.startsWith("http") ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[120px] sm:text-[150px] select-none">{product.image}</span>
              )}

              {product.badge && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-black px-3 py-1.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Specs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-400 mb-0.5">{spec.label}</div>
                    <div className="text-sm font-semibold text-gray-800">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-5">

            {/* Name & rating */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-200"}`}>★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">{product.rating} / 5</span>
                <span className="text-sm text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-black text-gray-900">{formatNPR(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through">{formatNPR(product.originalPrice)}</span>
                )}
              </div>
              {discount > 0 && (
                <span className="text-sm text-green-600 font-semibold">
                  You save {formatNPR(product.originalPrice - product.price)} ({discount}% off)
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Delivery */}
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <span className="text-2xl">⏳</span>
              <div>
                <div className="text-xs text-amber-600 font-semibold uppercase tracking-wide">Delivery</div>
                <div className="text-sm text-amber-800 font-medium">{product.deliveryNote}</div>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center gap-0 rounded-xl overflow-hidden border border-gray-200 bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm font-bold text-gray-900 border-x border-gray-200 h-10 flex items-center justify-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-400">
                Total: <strong className="text-gray-700">{formatNPR(product.price * qty)}</strong>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 border-2 ${
                  added
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-white border-orange-500 text-orange-600 hover:bg-orange-50"
                }`}
              >
                {added ? "✓ Added to Cart!" : "🛒 Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all active:scale-95 shadow-sm hover:shadow text-sm"
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: "🔒", label: "Secure Payment" },
                { icon: "↩️", label: "Easy Returns" },
                { icon: "📦", label: "Free Shipping" },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-1 text-center bg-gray-50 rounded-xl p-3">
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-xs text-gray-500 font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-14">
            <div className="mb-6">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">You Might Also Like</span>
              <h2 className="text-2xl font-black text-gray-900 mt-0.5">Related Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
