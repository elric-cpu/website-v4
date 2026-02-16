import React, { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import FixedPriceServiceMenu from "./FixedPriceServiceMenu";

const FloatingServiceButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="bg-maroon text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-maroon focus:ring-opacity-50"
          aria-label="Open service menu"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div>

      {/* Service Menu Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Order Fixed-Price Services
                </h2>
                <p className="text-gray-600">
                  Quick ordering for maintenance and repair services
                </p>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close service menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="p-6">
              <FixedPriceServiceMenu />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingServiceButton;
