import { useState } from "react";
import { Link } from "react-router-dom";

const MOCK_ORDERS = [
  {
    id: "AH-XK92PL",
    product: "Smart Chiya Temperature Monitor",
    icon: "☕",
    price: 999,
    date: "2025-07-14",
    status: "out_for_delivery",
    steps: [
      { label: "Order Placed", time: "Jul 14, 10:30 AM", done: true },
      { label: "Processing", time: "Jul 14, 11:00 AM", done: true },
      { label: "Packed", time: "Jul 14, 2:00 PM", done: true },
      { label: "Out for Delivery", time: "Jul 15, 9:00 AM", done: true },
      { label: "Delivered", time: "Bholi™", done: false },
    ],
  },
  {
    id: "AH-MN44RT",
    product: "Load-Shedding Survival Lamp",
    icon: "💡",
    price: 1199,
    date: "2025-07-13",
    status: "processing",
    steps: [
      { label: "Order Placed", time: "Jul 13, 3:45 PM", done: true },
      { label: "Processing", time: "Still processing...", done: false },
      { label: "Packed", time: "—", done: false },
      { label: "Out for Delivery", time: "—", done: false },
      { label: "Delivered", time: "—", done: false },
    ],
  },
];

const STATUS_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  out_for_delivery: { label: "Out for Delivery", color: "text-blue-600 bg-blue-50 border-blue-100", icon: "🚚" },
  processing: { label: "Processing", color: "text-orange-600 bg-orange-50 border-orange-100", icon: "🔄" },
  delivered: { label: "Delivered", color: "text-green-600 bg-green-50 border-green-100", icon: "✅" },
  packed: { label: "Packed", color: "text-purple-600 bg-purple-50 border-purple-100", icon: "📦" },
};

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<typeof MOCK_ORDERS[0] | null>(null);
  const [notFound, setNotFound] = useState(false);


  function handleSearch() {
    setSearched(true);
    const found = MOCK_ORDERS.find(
      (o) => o.id.toLowerCase() === query.trim().toLowerCase()
    );
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  }

  function formatNPR(n: number) {
    return `₨${n.toLocaleString("en-NP")}`;
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">Track Order</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📍</div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-500 max-w-sm mx-auto">
            Enter your order ID to see exactly where your package is. Spoiler: it's on its way. Probably.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Order ID</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="e.g. AH-XK92PL"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-gray-50"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all active:scale-95 text-sm shadow-sm"
            >
              Track
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Try: <button onClick={() => setQuery("AH-XK92PL")} className="text-orange-400 hover:underline">AH-XK92PL</button> or <button onClick={() => setQuery("AH-MN44RT")} className="text-orange-400 hover:underline">AH-MN44RT</button>
          </p>
        </div>

        {/* Result */}
        {searched && notFound && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center mb-8">
            <div className="text-5xl mb-3">🤷</div>
            <h3 className="text-lg font-black text-gray-800 mb-2">Order not found</h3>
            <p className="text-sm text-gray-500">
              That order ID doesn't exist. Or it does, but we lost the record. Check again bholi.
            </p>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">

            {/* Order header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-5 text-white flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{result.icon}</span>
                <div>
                  <div className="text-xs font-semibold text-orange-100 uppercase tracking-wide mb-0.5">Order ID</div>
                  <div className="text-lg font-black tracking-wide">{result.id}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-orange-100">Placed on</div>
                <div className="text-sm font-semibold">{result.date}</div>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-6">

              {/* Product info */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Product</div>
                  <div className="font-semibold text-gray-800">{result.product}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 mb-0.5">Amount</div>
                  <div className="font-black text-gray-900">{formatNPR(result.price)}</div>
                </div>
              </div>

              {/* Status badge */}
              {STATUS_LABELS[result.status] && (
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold w-fit ${STATUS_LABELS[result.status].color}`}>
                  <span>{STATUS_LABELS[result.status].icon}</span>
                  <span>{STATUS_LABELS[result.status].label}</span>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Delivery Progress</h3>
                <div className="flex flex-col gap-0">
                  {result.steps.map((step, i) => (
                    <div key={step.label} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 font-bold ${
                          step.done ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-300"
                        }`}>
                          {step.done ? "✓" : "○"}
                        </div>
                        {i < result.steps.length - 1 && (
                          <div className={`w-0.5 h-6 mt-1 ${step.done ? "bg-green-200" : "bg-gray-100"}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-4 flex items-center justify-between">
                        <span className={`text-sm font-semibold ${step.done ? "text-gray-800" : "text-gray-400"}`}>
                          {step.label}
                        </span>
                        <span className="text-xs text-gray-400">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun note */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700 flex items-start gap-2">
                <span>💡</span>
                <span>
                  Your delivery is being handled by <strong>YetiExpress™</strong> —
                  Nepal's most optimistic courier. They believe in Bholi.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Recent orders list */}
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Sample Orders to Try</h2>
          <div className="flex flex-col gap-3">
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between flex-wrap gap-3 cursor-pointer hover:shadow-md transition-all"
                onClick={() => {
                  setQuery(order.id);
                  setResult(order);
                  setNotFound(false);
                  setSearched(true);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-orange-50 rounded-xl w-10 h-10 flex items-center justify-center text-xl">
                    {order.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{order.product}</div>
                    <div className="text-xs text-gray-400">{order.id} · {order.date}</div>
                  </div>
                </div>
                {STATUS_LABELS[order.status] && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${STATUS_LABELS[order.status].color}`}>
                    {STATUS_LABELS[order.status].icon} {STATUS_LABELS[order.status].label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
