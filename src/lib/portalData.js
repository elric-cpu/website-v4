import { supabase } from "@/lib/customSupabaseClient";

export const getClientPortalBundle = async () => {
  const { data, error } = await supabase.rpc("get_client_portal_bundle");

  if (error) {
    throw error;
  }

  return data;
};

export const getSubcontractorPortalBundle = async () => {
  const { data, error } = await supabase.rpc("get_subcontractor_portal_bundle");

  if (error) {
    throw error;
  }

  return data;
};

export const getSubcontractorProfile = async (userId) => {
  const { data, error } = await supabase
    .from("subcontractors")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

// Service and subscription management functions
export const getClientSubscriptions = async (userId) => {
  const { data, error } = await supabase
    .from("client_subscriptions")
    .select(
      `
      *,
      subscription_plan:subscription_plans(*)
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
};

export const createJobRequest = async (jobRequest) => {
  const { data, error } = await supabase
    .from("job_requests")
    .insert([
      {
        user_id: jobRequest.user_id,
        type: jobRequest.type,
        title: jobRequest.title,
        description: jobRequest.description,
        priority: jobRequest.priority,
        service_address: jobRequest.address,
        contact_phone: jobRequest.phone,
        status: "submitted",
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateSubscriptionStatus = async (subscriptionId, action) => {
  let updateData = {};

  switch (action) {
    case "pause":
      updateData = { status: "paused", paused_at: new Date().toISOString() };
      break;
    case "cancel":
      updateData = {
        status: "canceled",
        canceled_at: new Date().toISOString(),
      };
      break;
    case "resume":
      updateData = { status: "active", paused_at: null };
      break;
    default:
      throw new Error("Invalid subscription action");
  }

  const { data, error } = await supabase
    .from("client_subscriptions")
    .update(updateData)
    .eq("id", subscriptionId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const createServiceOrder = async (orderData) => {
  const { data, error } = await supabase
    .from("service_orders")
    .insert([
      {
        user_id: orderData.user_id,
        service_id: orderData.service_id,
        service_type: orderData.service_type,
        quantity: orderData.quantity,
        unit_price: orderData.unit_price,
        total_amount: orderData.total_amount,
        service_address: orderData.service_address,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        status: "pending",
        metadata: orderData.metadata || {},
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getServiceOrders = async (userId) => {
  const { data, error } = await supabase
    .from("service_orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
};

export const getJobRequests = async (userId) => {
  const { data, error } = await supabase
    .from("job_requests")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
};
