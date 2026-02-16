import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useStripe } from "@/hooks/useStripe";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import {
  ShoppingCart,
  Settings,
  Filter,
  Wrench,
  Home,
  Shield,
  Users,
  Check,
  AlertCircle,
} from "lucide-react";

const FixedPriceServiceMenu = ({
  filterCategory = null,
  showSubscriptions = true,
  compactView = false,
  className = "",
}) => {
  const { toast } = useToast();
  const { startCheckout, loading: paymentLoading } = useStripe();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(
    filterCategory || "all",
  );
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    quantity: 1,
  });
  const [showCheckout, setShowCheckout] = useState(null);

  // Fixed price service menu data
  const serviceMenu = [
    // Maintenance Services
    {
      id: "smoke_alarm_install",
      name: "Smoke Alarm Installation",
      description:
        "Professional installation of smoke alarm with testing and compliance check",
      price: 75,
      unit: "each",
      category: "maintenance",
      icon: <Shield className="w-6 h-6" />,
      features: [
        "Professional installation",
        "Testing included",
        "Compliance verification",
        "1-year warranty",
      ],
      price_id: "price_smoke_alarm_install",
      amount: 7500,
    },
    {
      id: "air_handler_cleaning",
      name: "Air Handler Filter Cleaning",
      description:
        "Complete cleaning and filter replacement for air handler unit",
      price: 95,
      unit: "each",
      category: "maintenance",
      icon: <Filter className="w-6 h-6" />,
      features: [
        "Filter replacement",
        "Coil cleaning",
        "System inspection",
        "Performance test",
      ],
      price_id: "price_air_handler_clean",
      amount: 9500,
    },
    {
      id: "gutter_cleaning",
      name: "Gutter Cleaning Service",
      description:
        "Complete gutter cleaning, debris removal, and downspout check",
      price: 150,
      unit: "linear foot",
      category: "maintenance",
      icon: <Home className="w-6 h-6" />,
      features: [
        "Debris removal",
        "Downspout clearing",
        "Visual inspection",
        "Minor repair identification",
      ],
      price_id: "price_gutter_clean",
      amount: 15000,
    },
    {
      id: "hvac_filter_replace",
      name: "HVAC Filter Replacement",
      description: "Professional filter replacement service (up to 4 units)",
      price: 60,
      unit: "service call",
      category: "maintenance",
      icon: <Settings className="w-6 h-6" />,
      features: [
        "Up to 4 filters",
        "Filter disposal",
        "System check",
        "Maintenance log",
      ],
      price_id: "price_hvac_filter",
      amount: 6000,
    },
    {
      id: "faucet_repair",
      name: "Faucet Repair Service",
      description: "Fix leaky or malfunctioning faucets with parts included",
      price: 85,
      unit: "each",
      category: "plumbing",
      icon: <Wrench className="w-6 h-6" />,
      features: [
        "Diagnosis included",
        "Common parts included",
        "2-hour service window",
        "90-day warranty",
      ],
      price_id: "price_faucet_repair",
      amount: 8500,
    },
    {
      id: "toilet_repair",
      name: "Toilet Repair Service",
      description: "Complete toilet repair including flush mechanism and seals",
      price: 95,
      unit: "each",
      category: "plumbing",
      icon: <Wrench className="w-6 h-6" />,
      features: [
        "Complete diagnosis",
        "Parts replacement",
        "Leak testing",
        "Performance verification",
      ],
      price_id: "price_toilet_repair",
      amount: 9500,
    },
    {
      id: "outlet_install",
      name: "Electrical Outlet Installation",
      description:
        "Install new electrical outlet with GFCI protection where required",
      price: 125,
      unit: "each",
      category: "electrical",
      icon: <Settings className="w-6 h-6" />,
      features: [
        "GFCI protection",
        "Code compliance",
        "Safety testing",
        "Clean installation",
      ],
      price_id: "price_outlet_install",
      amount: 12500,
    },
    {
      id: "light_fixture_install",
      name: "Light Fixture Installation",
      description:
        "Professional installation of ceiling or wall-mounted light fixture",
      price: 145,
      unit: "each",
      category: "electrical",
      icon: <Settings className="w-6 h-6" />,
      features: [
        "Wiring included",
        "Switch installation",
        "Safety testing",
        "Fixture mounting",
      ],
      price_id: "price_light_install",
      amount: 14500,
    },

    // Subscription Services
    {
      id: "basic_maintenance_plan",
      name: "Basic Maintenance Plan",
      description:
        "Quarterly maintenance visits including filter changes and basic inspections",
      price: 49,
      unit: "month",
      interval: "month",
      category: "subscription",
      icon: <Users className="w-6 h-6" />,
      features: [
        "Quarterly visits",
        "Filter replacements",
        "Basic inspections",
        "Priority scheduling",
      ],
      price_id: "price_basic_maintenance",
      amount: 4900,
    },
    {
      id: "premium_maintenance_plan",
      name: "Premium Maintenance Plan",
      description:
        "Monthly maintenance with priority service and emergency response",
      price: 99,
      unit: "month",
      interval: "month",
      category: "subscription",
      icon: <Users className="w-6 h-6" />,
      features: [
        "Monthly visits",
        "Emergency response",
        "Priority service",
        "Comprehensive inspections",
        "Repair discounts",
      ],
      price_id: "price_premium_maintenance",
      amount: 9900,
    },
  ];

  const categories = [
    {
      id: "all",
      label: "All Services",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: "maintenance",
      label: "Maintenance",
      icon: <Home className="w-4 h-4" />,
    },
    { id: "plumbing", label: "Plumbing", icon: <Wrench className="w-4 h-4" /> },
    {
      id: "electrical",
      label: "Electrical",
      icon: <Settings className="w-4 h-4" />,
    },
    ...(showSubscriptions
      ? [
          {
            id: "subscription",
            label: "Subscriptions",
            icon: <Users className="w-4 h-4" />,
          },
        ]
      : []),
  ];

  const filteredServices = serviceMenu.filter((service) => {
    if (selectedCategory === "all") return true;
    return service.category === selectedCategory;
  });

  const handlePurchaseService = async (service, quantity = 1) => {
    if (!user) {
      // Show checkout form for guest users
      setShowCheckout(service);
      return;
    }

    try {
      const metadata = {
        service_type: service.category,
        service_id: service.id,
        user_id: user.id,
        quantity: quantity.toString(),
        unit: service.unit,
      };

      await startCheckout({
        mode: service.category === "subscription" ? "subscription" : "payment",
        priceId: service.price_id,
        amount: service.amount * quantity,
        currency: "USD",
        productName: `${service.name} (${quantity} ${service.unit})`,
        metadata,
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Unable to start checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGuestCheckout = async (service) => {
    // Validate required fields
    if (!customerInfo.name || !customerInfo.address || !customerInfo.phone) {
      toast({
        title: "Information Required",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const metadata = {
        service_type: service.category,
        service_id: service.id,
        quantity: customerInfo.quantity.toString(),
        unit: service.unit,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        service_address: customerInfo.address,
      };

      await startCheckout({
        mode: service.category === "subscription" ? "subscription" : "payment",
        priceId: service.price_id,
        amount: service.amount * customerInfo.quantity,
        currency: "USD",
        productName: `${service.name} (${customerInfo.quantity} ${service.unit})`,
        metadata,
        customerEmail: customerInfo.email,
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Unable to start checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (compactView) {
    return (
      <div
        className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Quick Service Order
        </h3>
        <div className="space-y-3">
          {filteredServices.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <div className="flex items-center gap-3">
                <div className="text-maroon">{service.icon}</div>
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-600">
                    ${service.price}/{service.unit}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handlePurchaseService(service)}
                disabled={paymentLoading}
                size="sm"
                className="bg-maroon text-white hover:bg-opacity-90"
              >
                Order
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white ${className}`}>
      {/* Service Categories */}
      <div className="border-b border-gray-200 mb-8">
        <nav
          aria-label="Service categories"
          className="flex space-x-8 overflow-x-auto"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                selectedCategory === category.id
                  ? "border-maroon text-maroon"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-maroon">{service.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-2xl font-bold text-maroon mb-2">
                ${service.price}
                <span className="text-sm font-normal text-gray-600">
                  /{service.unit}
                </span>
                {service.interval && (
                  <span className="text-sm font-normal text-gray-600">
                    {" "}
                    per {service.interval}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Includes:</h4>
              <ul className="space-y-1">
                {service.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => handlePurchaseService(service)}
              disabled={paymentLoading}
              className="w-full bg-maroon text-white hover:bg-opacity-90"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {service.category === "subscription"
                ? "Subscribe Now"
                : "Order Service"}
            </Button>
          </div>
        ))}
      </div>

      {/* Guest Checkout Modal */}
      {showCheckout && !user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Service Information
              </h3>
              <button
                onClick={() => setShowCheckout(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded">
              <h4 className="font-medium text-gray-900">{showCheckout.name}</h4>
              <p className="text-sm text-gray-600 mb-2">
                {showCheckout.description}
              </p>
              <p className="text-lg font-bold text-maroon">
                ${showCheckout.price}/{showCheckout.unit}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="(541) 555-0123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Address *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Full address where service is needed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={customerInfo.quantity}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      quantity: parseInt(e.target.value) || 1,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="text-xl font-bold text-maroon">
                    ${(showCheckout.price * customerInfo.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => handleGuestCheckout(showCheckout)}
                disabled={paymentLoading}
                className="flex-1 bg-maroon text-white hover:bg-opacity-90"
              >
                Continue to Payment
              </Button>
              <Button
                onClick={() => setShowCheckout(null)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixedPriceServiceMenu;
