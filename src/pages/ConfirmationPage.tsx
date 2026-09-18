import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

function generateOrderId() {
  return "AH-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const orderId = useMemo(() => generateOrderId(), []);

  const steps = [
    { icon: "✅", label: "Order Placed", status: "done", time: "Just now" },
    { icon: "🔄", label: "Processing", status: "done", time: "Any moment" },
    { icon: "📦", label: "Packed", status: "active", time: "Soon™" },
    { icon: "🚚", label: "Out for Delivery", status: "pending", time: "Bholi" },
    { icon: "🏠", label: "Delivered", status: "pending", time: "Bholi™" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">

        {/* Success card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Top banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-10 text-center text-white">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h1 className="text-3xl font-black mb-2">Order Placed!</h1>
            <p className="text-green-100 text-base">
              Congratulations! Your order is confirmed.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-semibold">
              <span>Order ID:</span>
              <span className="font-black tracking-wider">{orderId}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">

            {/* Humorous note */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">⏳</div>
              <h2 className="text-lg font-black text-gray-900 mb-1">
                Aahile haina. Bholi hola.
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your order is in our very capable hands. We're currently processing it,
                re-processing it, and having a team meeting about it.
                Expected delivery: <strong className="text-orange-600">Tomorrow™</strong>
              </p>
            </div>

            {/* Order tracking timeline */}
            <div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Order Timeline</h3>
              <div className="flex flex-col gap-0">
                {steps.map((step, i) => (
                  <div key={step.label} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        step.status === "done"
                          ? "bg-green-100 text-green-600"
                          : step.status === "active"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        {step.icon}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`w-0.5 h-6 mt-1 ${
                          step.status === "done" ? "bg-green-200" : "bg-gray-100"
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold ${
                          step.status === "done"
                            ? "text-green-700"
                            : step.status === "active"
                            ? "text-orange-600"
                            : "text-gray-400"
                        }`}>
                          {step.label}
                        </span>
                        <span className="text-xs text-gray-400">{step.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: "📅", label: "Estimated Delivery", value: "Bholi™" },
                { icon: "🚚", label: "Shipping Partner", value: "YetiExpress™" },
                { icon: "💌", label: "Confirmation", value: "Sent (eventually)" },
              ].map((info) => (
                <div key={info.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">{info.icon}</div>
                  <div className="text-xs text-gray-400 mb-0.5">{info.label}</div>
                  <div className="text-xs font-bold text-gray-700">{info.value}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate("/track")}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all active:scale-95 text-sm"
              >
                📍 Track My Order
              </button>
              <Link
                to="/"
                className="flex-1 py-3 bg-white border-2 border-gray-200 hover:border-orange-300 text-gray-700 font-semibold rounded-xl transition-all text-sm text-center"
              >
                🛍️ Continue Shopping
              </Link>
            </div>

            {/* Fun note */}
            <p className="text-xs text-gray-300 text-center">
              Pro tip: The best way to make delivery faster is to stop checking. It knows when you're watching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
