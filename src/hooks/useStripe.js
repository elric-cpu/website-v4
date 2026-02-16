import { useState } from "react";
import { fetchFromWorker } from "@/lib/edgeClient";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { ensureSafeRedirectUrl, getStripeAllowedHosts } from "@/lib/security";

export const useStripe = () => {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const startCheckout = async ({
    mode = "payment",
    priceId,
    amount,
    currency,
    quantity,
    productName,
    successUrl,
    cancelUrl,
    metadata,
  }) => {
    if (!session?.access_token) {
      throw new Error("Must be signed in to pay.");
    }

    setLoading(true);
    try {
      const data = await fetchFromWorker("/api/stripe/checkout", {
        token: session.access_token,
        body: {
          mode,
          priceId,
          amount,
          currency,
          quantity,
          productName,
          successUrl,
          cancelUrl,
          metadata,
        },
      });

      if (data?.url) {
        const allowedHosts = getStripeAllowedHosts(
          import.meta?.env?.VITE_STRIPE_ALLOWED_HOSTS,
        );
        const safeUrl = ensureSafeRedirectUrl(data.url, {
          allowedHosts,
          allowSameOrigin: false,
          allowHttpOnLocalhost: true,
        });
        window.location.href = safeUrl;
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    startCheckout,
  };
};
