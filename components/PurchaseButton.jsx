"use client";
import { useState, useEffect } from "react";

export default function PurchaseButton({ course }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePurchase = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const reference = `COURSE-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    try {
      // Create purchase record first
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          courseName: course.title,
          amount: course.price_amount,
          userName: formData.name,
          userEmail: formData.email,
          userPhone: formData.phone,
          reference: reference,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Initialize Paystack payment
        const handler = window.PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email: formData.email,
          amount: course.price_amount * 100, // Convert to kobo
          ref: reference,
          metadata: {
            custom_fields: [
              {
                display_name: "Course Name",
                variable_name: "course_name",
                value: course.title,
              },
              {
                display_name: "Student Name",
                variable_name: "student_name",
                value: formData.name,
              },
            ],
          },
          onClose: function () {
            console.log("Payment closed");
            setLoading(false);
          },
          callback: function (response) {
            console.log("Payment successful!", response);

            // ✅ ADD THESE TWO LINES HERE - Save to localStorage
            localStorage.setItem(
              `course_${course.id}_reference`,
              response.reference,
            );
            localStorage.setItem("userEmail", formData.email);

            // Redirect to access page
            window.location.href = `/courses/${course.id}/access?ref=${response.reference}`;
          },
        });

        handler.openIframe();
      } else {
        alert("Failed to initialize payment");
        setLoading(false);
      }
    } catch (error) {
      alert("Error: " + error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-[#4169E1] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
      >
        Buy Course - ₦{course.price_amount?.toLocaleString()}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Complete Your Purchase
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="08012345678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                onClick={handlePurchase}
                disabled={loading}
                className="w-full bg-[#008450] text-white px-6 py-4 rounded-xl font-bold cursor-pointer transition-all disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : `Pay ₦${course.price_amount.toLocaleString()} with Paystack`}
              </button>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 font-bold">
                🔒 Secure Payment
              </p>
              <p className="text-xs text-green-700 mt-1">
                Powered by Paystack - Pay with Card, Bank Transfer, or USSD
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
