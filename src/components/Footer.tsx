import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🛍️</span>
              <div>
                <div className="text-white font-black text-lg tracking-tight">AahileHaina</div>
                <div className="text-orange-400 text-[10px] font-semibold tracking-widest uppercase">.com</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Nepal's most patient shopping experience.
              We'll get there. Eventually.
            </p>
            <p className="mt-3 text-xs text-orange-400 italic font-medium">
              "Aahile haina. Bholi hola."
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link to="/product/chiya-temperature-monitor" className="hover:text-orange-400 transition-colors">Featured Products</Link></li>
              <li><Link to="/cart" className="hover:text-orange-400 transition-colors">My Cart</Link></li>
              <li><Link to="/track" className="hover:text-orange-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-500 cursor-not-allowed">Help Center (Bholi)</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">Returns (Parsi)</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">Complaints (Eventually)</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">Live Chat (Offline)</span></li>
            </ul>
          </div>

          {/* Delivery */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Delivery</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span>⏳</span>
                <span className="text-gray-400">Standard: Bholi (Tomorrow™)</span>
              </div>
              <div className="flex items-start gap-2">
                <span>🐢</span>
                <span className="text-gray-400">Economy: Parsi (Day after™)</span>
              </div>
              <div className="flex items-start gap-2">
                <span>🚀</span>
                <span className="text-gray-400">Express: Still Bholi</span>
              </div>
              <div className="flex items-start gap-2">
                <span>📦</span>
                <span className="text-gray-400">Free shipping over ₨999</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© 2025 AahileHaina.com. All rights reserved. Probably.</span>
          <span className="flex items-center gap-1">
            Made with <span className="text-red-500">❤️</span> in Nepal
          </span>
        </div>
      </div>
    </footer>
  );
}
