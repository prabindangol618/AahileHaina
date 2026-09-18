import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCTS, CATEGORIES, formatNPR, getDiscount } from "../data/products";
import ProductCard from "../components/ProductCard";
import { cartStore } from "../store/cartStore";
import { useCart } from "../hooks/useCart";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();
  const { totalPrice } = useCart();

  const flashDeals = PRODUCTS.filter((p) => p.originalPrice > p.price).slice(0, 4);

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory).slice(0, 6);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ===================== HERO ===================== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: Text */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-4 py-1.5 w-fit">
                <span className="text-sm">🇳🇵</span>
                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Nepal's Most Patient Store</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                Great deals.<br />
                <span className="text-orange-500">Eventually.</span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                Discover products you probably need, definitely want, and may receive
                sooner than expected.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/product/chiya-temperature-monitor"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
                >
                  🛍️ Shop Now
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-orange-300 text-gray-700 font-semibold rounded-xl transition-all"
                >
                  How It Works
                </a>
              </div>

              <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 w-fit">
                <span className="text-lg">⏳</span>
                <span className="text-sm text-amber-700">
                  Today's delivery estimate:{" "}
                  <strong className="font-bold">Probably tomorrow.</strong>
                </span>
              </div>
            </div>

            {/* Right: Sale card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 rounded-3xl p-8 text-white w-full max-w-sm shadow-xl shadow-orange-200 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-white/10 rounded-full" />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase">
                      MEGA BHOLI SALE
                    </span>
                    <span className="text-3xl">🛍️</span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black leading-tight">Up to 99% less regret.</h2>
                    <p className="text-orange-100 text-sm mt-1">
                      Prices so good, waiting feels worth it.
                    </p>
                  </div>

                  <div className="flex items-baseline gap-3 bg-white/10 rounded-2xl px-4 py-3">
                    <strong className="text-3xl font-black">₨999</strong>
                    <span className="text-orange-200 line-through text-lg">₨9,999</span>
                    <span className="ml-auto bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">-90%</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-orange-100">Offer expires...</span>
                    <strong className="text-white">Tomorrow™</strong>
                  </div>

                  <button
                    onClick={() => navigate("/product/chiya-temperature-monitor")}
                    className="w-full py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-all active:scale-95 shadow-sm"
                  >
                    Grab the Deal →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ===================== CATEGORIES + PRODUCTS ===================== */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-8">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Browse</span>
            <h2 className="text-3xl font-black text-gray-900 mt-1">Shop by Category</h2>
          </div>

          <div className="flex gap-8 lg:gap-10">

            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col gap-4 w-56 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Categories</h3>
                <div className="flex flex-col gap-0.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                        activeCategory === cat.id
                          ? "bg-orange-50 text-orange-600 font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </span>
                      <span className="text-gray-300 text-xs">→</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Savings panel */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 flex flex-col gap-2">
                <div className="text-3xl text-center">💰</div>
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-0.5">Your unspent balance</div>
                  <div className="text-xl font-black text-green-600">
                    {formatNPR(totalPrice > 0 ? totalPrice : 0)}
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  Money saved by not receiving your order yet.
                </p>
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1 min-w-0">
              {/* Mobile categories */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-6 lg:hidden scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${
                      activeCategory === cat.id
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              <div className="mb-5">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Trending Now</span>
                <h2 className="text-2xl font-black text-gray-900 mt-0.5">Popular Picks</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ===================== FLASH DEALS ===================== */}
      <section className="py-12 lg:py-16 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Limited-ish</span>
              <h2 className="text-3xl font-black text-gray-900 mt-1">Flash Deals</h2>
              <p className="text-gray-500 mt-1">These deals may disappear. Or they may not.</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-red-50 text-red-500 text-xs font-bold px-3 py-1.5 rounded-full border border-red-100 animate-pulse">
              🔥 Live Now
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {flashDeals.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
              >
                {/* Flash deal header */}
                <div className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 flex items-center justify-between">
                  <span className="text-white text-xs font-bold uppercase tracking-wide">Flash Deal</span>
                  <span className="bg-white text-red-600 text-xs font-black px-2 py-0.5 rounded-full">
                    -{getDiscount(product.price, product.originalPrice)}%
                  </span>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 h-36 flex items-center justify-center overflow-hidden">
                  {product.image.startsWith("/") || product.image.startsWith("http") ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                    />
                  ) : (
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-200">
                      {product.image}
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-gray-900">{formatNPR(product.price)}</span>
                    <span className="text-sm text-gray-400 line-through">{formatNPR(product.originalPrice)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      cartStore.addToCart(product, 1);
                    }}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-all active:scale-95"
                  >
                    Grab Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how-it-works" className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl font-black text-gray-900 mt-1">How AahileHaina Works</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Shopping shouldn't be complicated. Waiting, however, is a different story.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: "01",
                icon: "🛒",
                title: "Find Something",
                desc: "Browse our carefully selected products and add something unnecessary to your cart.",
              },
              {
                num: "02",
                icon: "💳",
                title: "Place Your Order",
                desc: "Choose your preferred simulated payment method and confidently click the button.",
              },
              {
                num: "03",
                icon: "⏳",
                title: "Wait Patiently",
                desc: "Your order is being processed, packed, reconsidered, and eventually delivered.",
              },
              {
                num: "04",
                icon: "📦",
                title: "Receive It",
                desc: "A miracle occurs. Your package arrives. Probably tomorrow.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-gray-100 select-none">{step.num}</span>
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ===================== FINAL CTA ===================== */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-orange-100 text-xs font-bold uppercase tracking-widest mb-4">Ready?</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Aahile haina.<br />Bholi hola.
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Start shopping today and begin waiting immediately.
          </p>
          <Link
            to="/product/chiya-temperature-monitor"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-2xl hover:bg-orange-50 transition-all active:scale-95 shadow-lg"
          >
            🛍️ Start Shopping
          </Link>
        </div>
      </section>

    </div>
  );
}
