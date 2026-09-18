import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatNPR } from "../data/products";

export default function CartPage() {
  const { items, removeFromCart, updateQty, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const shipping = totalPrice >= 999 ? 0 : 100;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-sm">
          <div className="text-7xl mb-6">🛒</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Nothing here yet. Go find something you probably need.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all"
          >
            🛍️ Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Your Cart</h1>
            <p className="text-gray-500 mt-0.5">{totalItems} item{totalItems !== 1 ? "s" : ""} waiting to be delivered</p>
          </div>
          <Link to="/" className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1">
            ← Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* Cart items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex gap-4"
              >
                {/* Image */}
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
                >
                  {product.image.startsWith("/") || product.image.startsWith("http") ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl sm:text-6xl">{product.image}</span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="text-sm sm:text-base font-semibold text-gray-800 hover:text-orange-600 cursor-pointer transition-colors line-clamp-2 leading-snug"
                    >
                      {product.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors shrink-0 text-lg ml-1"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-xs text-orange-500 font-medium flex items-center gap-1">
                    <span>⏳</span> {product.deliveryNote}
                  </p>

                  <div className="flex items-center justify-between mt-auto flex-wrap gap-2">
                    {/* Qty */}
                    <div className="flex items-center gap-0 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        className="w-8 h-8 text-gray-600 hover:bg-gray-200 transition-colors font-bold flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-gray-900 border-x border-gray-200 h-8 flex items-center justify-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-8 h-8 text-gray-600 hover:bg-gray-200 transition-colors font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-base font-black text-gray-900">
                        {formatNPR(product.price * quantity)}
                      </div>
                      {quantity > 1 && (
                        <div className="text-xs text-gray-400">{formatNPR(product.price)} each</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Delivery note */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-2xl">⏳</span>
              <div>
                <div className="text-sm font-semibold text-amber-800">Delivery Estimate</div>
                <div className="text-sm text-amber-600 mt-0.5">
                  Your items will arrive… eventually. Probably Bholi. Maybe Parsi.
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24 flex flex-col gap-4">
              <h2 className="text-lg font-black text-gray-900">Order Summary</h2>

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-gray-900">{formatNPR(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-semibold">Free 🎉</span>
                  ) : (
                    <span className="font-semibold text-gray-900">{formatNPR(shipping)}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">
                    Add {formatNPR(999 - totalPrice)} more for free shipping
                  </p>
                )}
                <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-xl font-black text-gray-900">{formatNPR(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all active:scale-95 shadow-sm hover:shadow"
              >
                Proceed to Checkout →
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-gray-400 pt-1">
                <span className="flex items-center gap-1">🔒 Secure</span>
                <span className="flex items-center gap-1">↩️ Easy Returns</span>
              </div>

              {/* Coupon */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-2 font-medium">Have a coupon?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="BHOLI10"
                    className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-300 bg-gray-50"
                  />
                  <button className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-lg transition-colors">
                    Apply
                  </button>
                </div>
                <p className="text-[10px] text-gray-300 mt-1.5">Coupon works. Discount arrives bholi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
