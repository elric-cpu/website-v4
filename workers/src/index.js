const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

const jsonResponse = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...headers,
    },
  });

const textResponse = (body, status = 200, headers = {}) =>
  new Response(body, {
    status,
    headers: {
      ...corsHeaders,
      ...headers,
    },
  });

const requireEnv = (env, key) => {
  if (!env[key]) {
    throw new Error(`Missing ${key} in worker environment.`);
  }
  return env[key];
};

const getSupabaseUser = async (env, token) => {
  const supabaseUrl = requireEnv(env, "SUPABASE_URL");
  const supabaseAnonKey = requireEnv(env, "SUPABASE_ANON_KEY");

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      apikey: supabaseAnonKey,
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

const encodeForm = (payload, prefix = "") =>
  Object.entries(payload)
    .filter(([, value]) => value !== undefined && value !== null)
    .flatMap(([key, value]) => {
      const formKey = prefix ? `${prefix}[${key}]` : key;

      if (Array.isArray(value)) {
        return value.flatMap((item, index) =>
          typeof item === "object"
            ? encodeForm(item, `${formKey}[${index}]`)
            : `${encodeURIComponent(`${formKey}[${index}]`)}=${encodeURIComponent(item)}`,
        );
      }

      if (typeof value === "object") {
        return encodeForm(value, formKey);
      }

      return `${encodeURIComponent(formKey)}=${encodeURIComponent(value)}`;
    })
    .join("&");

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    try {
      if (
        request.method === "POST" &&
        url.pathname === "/api/stripe/checkout"
      ) {
        const token = request.headers
          .get("Authorization")
          ?.replace("Bearer ", "");
        if (!token) {
          return textResponse("Missing auth token", 401);
        }

        const user = await getSupabaseUser(env, token);
        if (!user?.email) {
          return textResponse("Invalid auth token", 401);
        }

        const payload = await request.json();
        const mode = payload.mode || "payment";
        const currency = payload.currency || "usd";
        const origin = request.headers.get("Origin") || "http://127.0.0.1:3000";
        const successUrl = payload.successUrl || `${origin}/client-portal`;
        const cancelUrl = payload.cancelUrl || `${origin}/client-portal`;

        const lineItems = [];

        if (payload.priceId) {
          lineItems.push({
            price: payload.priceId,
            quantity: payload.quantity || 1,
          });
        } else if (payload.amount) {
          lineItems.push({
            price_data: {
              currency,
              product_data: {
                name: payload.productName || "Benson Home Solutions Payment",
              },
              unit_amount: payload.amount,
            },
            quantity: payload.quantity || 1,
          });
        } else {
          return textResponse("Missing priceId or amount", 400);
        }

        const formPayload = {
          mode,
          success_url: successUrl,
          cancel_url: cancelUrl,
          customer_email: user.email,
          "automatic_tax[enabled]": "true",
          metadata: payload.metadata || undefined,
        };

        const encoded = encodeForm({
          ...formPayload,
          line_items: lineItems,
        });

        const stripeSecret = requireEnv(env, "STRIPE_SECRET_KEY");
        const stripeResponse = await fetch(
          "https://api.stripe.com/v1/checkout/sessions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${stripeSecret}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: encoded,
          },
        );

        const stripeData = await stripeResponse.json();
        if (!stripeResponse.ok) {
          return jsonResponse(
            { error: stripeData.error?.message || "Stripe error" },
            400,
          );
        }

        return jsonResponse({ url: stripeData.url, id: stripeData.id });
      }

      if (request.method === "POST" && url.pathname === "/api/email/welcome") {
        const token = request.headers
          .get("Authorization")
          ?.replace("Bearer ", "");
        if (!token) {
          return textResponse("Missing auth token", 401);
        }

        const user = await getSupabaseUser(env, token);
        if (!user?.email) {
          return textResponse("Invalid auth token", 401);
        }

        const payload = await request.json();
        const resendApiKey = requireEnv(env, "RESEND_API_KEY");
        const fromEmail = requireEnv(env, "RESEND_FROM_EMAIL");

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: payload.email || user.email,
            subject: "Welcome to Benson Home Solutions",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2>Welcome to Benson Home Solutions</h2>
                <p>Thanks for joining our portal. Your role is set to <strong>${payload.role || "client"}</strong>.</p>
                <p>If you need help, reply to this email and our team will assist.</p>
              </div>
            `,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          return textResponse(errorText || "Resend error", 400);
        }

        return jsonResponse({ ok: true });
      }

      if (
        request.method === "POST" &&
        url.pathname === "/api/email/notification"
      ) {
        const token = request.headers
          .get("Authorization")
          ?.replace("Bearer ", "");
        if (!token) {
          return textResponse("Missing auth token", 401);
        }

        const user = await getSupabaseUser(env, token);
        if (!user?.email) {
          return textResponse("Invalid auth token", 401);
        }

        const payload = await request.json();
        const resendApiKey = requireEnv(env, "RESEND_API_KEY");
        const fromEmail = requireEnv(env, "RESEND_FROM_EMAIL");

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: payload.email || user.email,
            subject: payload.subject || "Benson Home Solutions Update",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <p>${payload.message || "You have a new update from Benson Home Solutions."}</p>
              </div>
            `,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          return textResponse(errorText || "Resend error", 400);
        }

        return jsonResponse({ ok: true });
      }

      return textResponse("Not found", 404);
    } catch (error) {
      return jsonResponse({ error: error.message || "Worker error" }, 500);
    }
  },
};
