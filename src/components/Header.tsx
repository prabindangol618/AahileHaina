import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🛍️</span>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-black text-gray-900 tracking-tight group-hover:text-orange-600 transition-colors">
                AahileHaina
              </span>
              <span className="text-[10px] text-orange-500 font-semibold tracking-widest uppercase -mt-0.5">
                .com
              </span>
            </div>
          </Link>

          {/* Tagline — hidden on small screens */}
          <div className="hidden md:flex items-center gap-1 text-sm text-gray-400 italic">
            <span>Aahile haina.</span>
            <span className="text-orange-400 font-semibold">Bholi hola.</span>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className="hidden sm:inline-flex px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
            >
              Home
            </Link>
            <Link
              to="/track"
              className="hidden sm:inline-flex px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
            >
              Track Order
            </Link>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow"
            >
              <span className="text-base">🛒</span>
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
