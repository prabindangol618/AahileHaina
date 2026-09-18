import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatNPR } from "../data/products";
import { cartStore } from "../store/cartStore";

const PAYMENT_METHODS = [
  { id: "esewa", label: "eSewa", icon: "💚", desc: "Pay with eSewa wallet" },
  { id: "khalti", label: "Khalti", icon: "💜", desc: "Pay with Khalti wallet" },
  { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when delivered (Bholi™)" },
  { id: "card", label: "Credit/Debit Card", icon: "💳", desc: "Visa, Mastercard, etc." },
];

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    city: "",
    address: "",
  });

  const shipping = totalPrice >= 999 ? 0 : 100;
  const grandTotal = totalPrice + shipping;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function isValid() {
    return form.fullName && form.phone && form.address && form.district;
  }

  function handlePlaceOrder() {
    if (!isValid()) return;
    setLoading(true);
    setTimeout(() => {
      cartStore.clearCart();
      navigate("/confirmation");
    }, 1500);
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Nothing to checkout</h2>
          <p className="text-gray-500 mb-6">Your cart is empty. Go add something first!</p>
          <Link to="/" className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-orange-500 transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-sm">
            {[
              { label: "Cart", done: true },
              { label: "Checkout", active: true },
              { label: "Confirmation", done: false },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 sm:gap-4">
                {i > 0 && <div className="h-px w-8 sm:w-16 bg-gray-200" />}
                <div className={`flex items-center gap-1.5 font-semibold ${
                  step.done ? "text-green-500" : step.active ? "text-orange-500" : "text-gray-300"
                }`}>
                  <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${
                    step.done ? "bg-green-100 text-green-500" : step.active ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-300"
                  }`}>
                    {step.done ? "✓" : i + 1}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* Left: Form */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Delivery details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-black text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-xl">📦</span> Delivery Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Ram Bahadur Thapa"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-gray-50 transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Phone <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="98XXXXXXXX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-gray-50 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Email
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ram@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-gray-50 transition-all"
                  />
                </div>

                {/* Province */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Province</label>
                  <select
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-gray-50 transition-all appearance-none"
                  >
                    <option value="">Select Province</option>
                    <option>Koshi</option>
                    <option>Madhesh</option>
                    <option>Bagmati</option>
                    <option>Gandaki</option>
                    <option>Lumbini</option>
                    <option>Karnali</option>
                    <option>Sudurpashchim</option>
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    District <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    placeholder="Kathmandu"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-gray-50 transition-all"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">City / VDC</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Thamel"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-gray-50 transition-all"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Street Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House no, Street, Landmark..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-gray-50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-black text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-xl">💳</span> Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === method.id
                        ? "border-orange-400 bg-orange-50"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">{method.label}</div>
                      <div className="text-xs text-gray-500">{method.desc}</div>
                    </div>
                    {paymentMethod === method.id && (
                      <span className="ml-auto text-orange-500 font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {paymentMethod === "cod" && (
                <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2 text-sm text-amber-700">
                  <span>⏳</span>
                  <span>Cash on Delivery — pay when the package arrives. Bholi, most likely.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24 flex flex-col gap-4">
              <h2 className="text-lg font-black text-gray-900">Order Summary</h2>

              {/* Items */}
              <div className="flex flex-col gap-3 max-h-52 overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div className="bg-orange-50 rounded-lg w-10 h-10 flex items-center justify-center shrink-0 text-xl overflow-hidden">
                      {product.image.startsWith("/") || product.image.startsWith("http") ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        product.image
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-400">Qty: {quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-900 shrink-0">
                      {formatNPR(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatNPR(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-semibold">Free 🎉</span>
                  ) : (
                    <span className="font-semibold">{formatNPR(shipping)}</span>
                  )}
                </div>
                <div className="flex justify-between font-black text-gray-900 text-base pt-1 border-t border-gray-100">
                  <span>Total</span>
                  <span>{formatNPR(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!isValid() || loading}
                className={`w-full py-3.5 font-bold rounded-xl transition-all text-sm ${
                  isValid() && !loading
                    ? "bg-orange-500 hover:bg-orange-600 text-white active:scale-95 shadow-sm hover:shadow"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Placing Order...
                  </span>
                ) : (
                  "Place Order →"
                )}
              </button>

              {!isValid() && (
                <p className="text-xs text-gray-400 text-center">
                  Please fill in required fields (*)
                </p>
              )}

              <div className="flex items-center justify-center gap-4 text-xs text-gray-300 pt-1">
                <span>🔒 SSL Secured</span>
                <span>📦 Tracked Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
