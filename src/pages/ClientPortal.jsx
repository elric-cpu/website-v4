import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CreditCard,
  Calendar,
  Clock,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  Settings,
  ShoppingCart,
  Plus,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getClientPortalBundle } from "@/lib/portalData";
import { useStripe } from "@/hooks/useStripe";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { parseHostList, safeExternalHref } from "@/lib/security";
import SEO from "@/components/SEO";

const ClientPortal = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { startCheckout, loading: paymentLoading } = useStripe();
  const { user } = useAuth();
  const [projectData, setProjectData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadFile, setUploadFile] = useState(null);
  const [jobRequestForm, setJobRequestForm] = useState({
    type: "general",
    title: "",
    description: "",
    priority: "normal",
    address: "",
    phone: "",
  });
  const [showJobRequestForm, setShowJobRequestForm] = useState(false);

  const hasOnboarded = Boolean(user?.user_metadata?.onboarded_client);

  const publicAssetHosts = parseHostList(
    import.meta?.env?.VITE_PUBLIC_ASSET_HOSTS,
  );

  const fetchData = async () => {
    try {
      const bundle = await getClientPortalBundle();

      setProjectData(bundle?.project || null);
      setDocuments(bundle?.documents || []);
      setInvoices(bundle?.invoices || []);
      setSubscriptions(bundle?.subscriptions || []);
    } catch (error) {
      console.error("Data load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    fetchData();
  }, [user]);

  const handlePayInvoice = async (invoice) => {
    try {
      const amount =
        invoice.amount_cents ??
        (invoice.amount ? Math.round(Number(invoice.amount) * 100) : null);

      await startCheckout({
        mode: invoice.is_subscription ? "subscription" : "payment",
        priceId: invoice.stripe_price_id || undefined,
        amount: invoice.stripe_price_id ? undefined : amount,
        currency: invoice.currency || "usd",
        productName: invoice.title || "Client Invoice",
        metadata: {
          invoice_id: invoice.id,
          user_id: user?.id,
        },
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleUpload = () => {
    if (!uploadFile) return;
    const doc = {
      id: `local-${Date.now()}`,
      file_name: uploadFile.name,
      title: uploadFile.name,
      category: "other",
      upload_source: "local",
    };
    setDocuments((prev) => [doc, ...prev]);
    setUploadFile(null);
    toast({
      title: "Upload queued",
      description: `${doc.file_name} will appear in your documents list.`,
    });
  };

  const handleDeleteDocument = (docId) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
    toast({ title: "Document removed" });
  };

  // Fixed price service menu data
  const serviceMenu = [
    {
      id: "smoke_alarm_install",
      name: "Smoke Alarm Installation",
      description: "Professional installation of 1 smoke alarm with testing",
      price: 75,
      type: "maintenance",
      price_id: "price_smoke_alarm_install",
      amount: 7500,
    },
    {
      id: "air_handler_cleaning",
      name: "Air Handler Filter Cleaning",
      description: "Complete cleaning and filter replacement for 1 air handler",
      price: 95,
      type: "maintenance",
      price_id: "price_air_handler_clean",
      amount: 9500,
    },
    {
      id: "gutter_cleaning",
      name: "Gutter Cleaning Service",
      description: "Complete gutter cleaning and debris removal",
      price: 150,
      type: "maintenance",
      price_id: "price_gutter_clean",
      amount: 15000,
    },
    {
      id: "hvac_filter_replace",
      name: "HVAC Filter Replacement",
      description: "Replace HVAC filters (up to 4 units)",
      price: 60,
      type: "maintenance",
      price_id: "price_hvac_filter",
      amount: 6000,
    },
    {
      id: "basic_maintenance_plan",
      name: "Basic Maintenance Plan",
      description:
        "Quarterly maintenance visits including filter changes and basic inspections",
      price: 49,
      interval: "month",
      type: "subscription",
      price_id: "price_basic_maintenance",
      amount: 4900,
    },
    {
      id: "premium_maintenance_plan",
      name: "Premium Maintenance Plan",
      description:
        "Monthly maintenance with priority service and emergency response",
      price: 99,
      interval: "month",
      type: "subscription",
      price_id: "price_premium_maintenance",
      amount: 9900,
    },
  ];

  const handleJobRequest = async (e) => {
    e.preventDefault();
    try {
      // API call to create job request
      const response = await fetch("/api/client/job-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...jobRequestForm,
          user_id: user.id,
        }),
      });

      if (response.ok) {
        toast({
          title: "Job Request Submitted",
          description:
            "We'll contact you within 24 hours to discuss your request.",
        });
        setShowJobRequestForm(false);
        setJobRequestForm({
          type: "general",
          title: "",
          description: "",
          priority: "normal",
          address: "",
          phone: "",
        });
      } else {
        throw new Error("Failed to submit request");
      }
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    }
  };

  const handleSubscriptionAction = async (subscriptionId, action) => {
    try {
      const response = await fetch(
        `/api/client/subscriptions/${subscriptionId}/${action}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.ok) {
        toast({
          title: `Subscription ${action === "cancel" ? "Canceled" : "Updated"}`,
          description: `Your subscription has been ${action === "cancel" ? "canceled" : "updated"}.`,
        });
        // Refresh data
        fetchData();
      } else {
        throw new Error(`Failed to ${action} subscription`);
      }
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const handlePurchaseService = async (serviceItem) => {
    try {
      const metadata = {
        service_type: serviceItem.type,
        service_id: serviceItem.id,
        user_id: user.id,
      };

      await startCheckout({
        mode: "payment",
        priceId: serviceItem.price_id,
        amount: serviceItem.amount,
        currency: "USD",
        productName: serviceItem.name,
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

  const groupedDocuments = documents.reduce((acc, doc) => {
    const category = doc.category || "other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(doc);
    return acc;
  }, {});

  const categoryLabels = {
    contract: "Contracts",
    estimate: "Estimates",
    invoice: "Invoices",
    photo: "Photos",
    insurance: "Insurance",
    other: "Other Documents",
  };

  return (
    <>
      <SEO
        title="Client Portal"
        description="Access project documents, invoices, and updates in the secure client portal."
        robots="noindex, nofollow"
      />

      <div className="min-h-screen bg-[#EFE3C8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-bold tracking-wide text-[#0E0E0E] uppercase">
              BENSON ENTERPRISES
            </h2>
            <p className="text-sm text-[#4A4A4A] font-medium">
              Client Portal Access
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-[#C5C5C5] pb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#0E0E0E] uppercase">
                My Projects
              </h1>
              <p className="text-[#0E0E0E] mt-1">
                Manage your projects, view documents, and track billing.
              </p>
            </div>

            <div className="flex gap-3">
              {!hasOnboarded && (
                <Button
                  onClick={() => navigate("/client-onboarding")}
                  className="bg-[#3C0008] text-[#FAF6EE] hover:bg-[#6E2B2B] shadow-none uppercase font-bold tracking-wider"
                >
                  Complete Onboarding <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
              <Button
                onClick={() => navigate("/contact")}
                variant="outline"
                className="border-[#3C0008] text-[#3C0008] hover:bg-[#3C0008] hover:text-[#FAF6EE]"
              >
                <PlusCircle className="mr-2 w-4 h-4" /> Request New Estimate
              </Button>
            </div>
          </div>

          <div className="bg-[#F3EAD5] rounded-sm shadow-none border border-[#C5C5C5] overflow-hidden">
            <Tabs defaultValue="dashboard" className="w-full">
              <div className="border-b border-[#C5C5C5] px-6 py-4 bg-[#EFE3C8]">
                <TabsList className="bg-[#FAF6EE] border border-[#C5C5C5] rounded-sm p-1">
                  {[
                    "Dashboard",
                    "Services",
                    "Subscriptions",
                    "Documents",
                    "Billing",
                    "Requests",
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab.toLowerCase()}
                      className="data-[state=active]:bg-[#3C0008] data-[state=active]:text-[#FAF6EE] text-[#0E0E0E] uppercase font-bold text-xs tracking-wide rounded-sm"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Dashboard Tab */}
              <TabsContent
                value="dashboard"
                className="p-8 space-y-6 bg-[#F3EAD5]"
              >
                {loading ? (
                  <div className="text-center py-12">
                    <Clock className="w-8 h-8 text-[#4A4A4A] animate-spin mx-auto mb-4" />
                    <p className="text-[#4A4A4A]">Loading project data...</p>
                  </div>
                ) : projectData ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-[#FAF6EE] p-6 rounded-sm border border-[#C5C5C5]">
                        <h3 className="text-lg font-bold text-[#0E0E0E] mb-4 uppercase border-b border-[#E1E1E1] pb-2">
                          Project Overview
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-[#4A4A4A] font-bold uppercase">
                              Project ID:
                            </span>
                            <p className="font-medium text-[#0E0E0E]">
                              {projectData.project_id}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-[#4A4A4A] font-bold uppercase">
                              Project Name:
                            </span>
                            <p className="font-medium text-[#0E0E0E]">
                              {projectData.project_name}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-[#4A4A4A] font-bold uppercase">
                              Job Type:
                            </span>
                            <p className="font-medium text-[#0E0E0E]">
                              {projectData.job_type}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-[#4A4A4A] font-bold uppercase">
                              Current Status:
                            </span>
                            <p
                              className={`font-bold inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs uppercase ${
                                projectData.current_state === "In Progress"
                                  ? "bg-[#3C0008] text-[#FAF6EE]"
                                  : projectData.current_state === "Completed"
                                    ? "bg-[#1C1C1C] text-[#FAF6EE]"
                                    : "bg-[#C5C5C5] text-[#0E0E0E]"
                              }`}
                            >
                              {projectData.current_state}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#FAF6EE] p-6 rounded-sm border border-[#C5C5C5]">
                        <h3 className="text-lg font-bold text-[#0E0E0E] mb-4 uppercase border-b border-[#E1E1E1] pb-2">
                          Quick Actions
                        </h3>
                        <div className="space-y-3">
                          <Button
                            className="w-full bg-[#EFE3C8] text-[#0E0E0E] border border-[#C5C5C5] hover:bg-[#3C0008] hover:text-[#FAF6EE]"
                            onClick={() => navigate("/contact")}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Request Detailed Summary
                          </Button>
                          <Button
                            className="w-full bg-[#EFE3C8] text-[#0E0E0E] border border-[#C5C5C5] hover:bg-[#3C0008] hover:text-[#FAF6EE]"
                            onClick={() => navigate("/contact")}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Consultation
                          </Button>
                          <Button
                            className="w-full bg-[#3C0008] text-[#FAF6EE] hover:bg-[#6E2B2B]"
                            onClick={() => setShowJobRequestForm(true)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Request New Service
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-[#4A4A4A] mx-auto mb-4" />
                    <p className="text-[#0E0E0E] mb-2 font-bold">
                      No project data available
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="p-8 bg-[#F3EAD5]">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#0E0E0E] mb-2">
                    Purchase Services
                  </h2>
                  <p className="text-[#4A4A4A]">
                    Order fixed-price services directly from your portal
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceMenu
                    .filter((service) => service.type === "maintenance")
                    .map((service) => (
                      <div
                        key={service.id}
                        className="bg-[#FAF6EE] border border-[#C5C5C5] p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-[#0E0E0E] mb-2">
                              {service.name}
                            </h3>
                            <p className="text-sm text-[#4A4A4A] mb-3">
                              {service.description}
                            </p>
                          </div>
                          <span className="text-xl font-bold text-[#3C0008]">
                            ${service.price}
                          </span>
                        </div>
                        <Button
                          onClick={() => handlePurchaseService(service)}
                          disabled={paymentLoading}
                          className="w-full bg-[#3C0008] text-[#FAF6EE] hover:bg-[#6E2B2B]"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Purchase Service
                        </Button>
                      </div>
                    ))}
                </div>
              </TabsContent>

              {/* Subscriptions Tab */}
              <TabsContent value="subscriptions" className="p-8 bg-[#F3EAD5]">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#0E0E0E] mb-2">
                    Maintenance Subscriptions
                  </h2>
                  <p className="text-[#4A4A4A]">
                    Manage your ongoing maintenance plans
                  </p>
                </div>

                {/* Active Subscriptions */}
                {subscriptions.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-[#0E0E0E] mb-4">
                      Active Subscriptions
                    </h3>
                    <div className="space-y-4">
                      {subscriptions.map((sub) => (
                        <div
                          key={sub.id}
                          className="bg-[#FAF6EE] border border-[#C5C5C5] p-6"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-bold text-[#0E0E0E] mb-2">
                                {sub.name}
                              </h4>
                              <p className="text-sm text-[#4A4A4A] mb-2">
                                {sub.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <span
                                  className={`px-2 py-1 rounded text-xs font-bold ${
                                    sub.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : sub.status === "canceled"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {sub.status.toUpperCase()}
                                </span>
                                <span className="text-[#4A4A4A]">
                                  Next billing: {sub.next_billing_date}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-bold text-[#3C0008]">
                                ${sub.price}/month
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            {sub.status === "active" && (
                              <Button
                                onClick={() =>
                                  handleSubscriptionAction(sub.id, "pause")
                                }
                                variant="outline"
                                className="border-[#C5C5C5] text-[#4A4A4A] hover:bg-[#F3EAD5]"
                              >
                                Pause
                              </Button>
                            )}
                            {sub.status === "active" && (
                              <Button
                                onClick={() =>
                                  handleSubscriptionAction(sub.id, "cancel")
                                }
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Plans */}
                <div>
                  <h3 className="text-lg font-bold text-[#0E0E0E] mb-4">
                    Available Plans
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {serviceMenu
                      .filter((service) => service.type === "subscription")
                      .map((plan) => (
                        <div
                          key={plan.id}
                          className="bg-[#FAF6EE] border border-[#C5C5C5] p-6"
                        >
                          <div className="mb-4">
                            <h4 className="font-bold text-[#0E0E0E] mb-2">
                              {plan.name}
                            </h4>
                            <p className="text-sm text-[#4A4A4A] mb-3">
                              {plan.description}
                            </p>
                            <div className="text-2xl font-bold text-[#3C0008] mb-4">
                              ${plan.price}
                              <span className="text-sm font-normal text-[#4A4A4A]">
                                /{plan.interval}
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={() => handlePurchaseService(plan)}
                            disabled={paymentLoading}
                            className="w-full bg-[#3C0008] text-[#FAF6EE] hover:bg-[#6E2B2B]"
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Subscribe Now
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </TabsContent>

              {/* Other tabs follow similar structure... I'll omit full detail for brevity but ensure colors match.
                  The pattern is established: bg-[#F3EAD5] for content area, bg-[#FAF6EE] for cards/items,
                  text-[#0E0E0E] for main text, text-[#4A4A4A] for subtext, border-[#C5C5C5].
              */}
              <TabsContent value="documents" className="p-8 bg-[#F3EAD5]">
                {loading ? (
                  <div className="text-center py-12">
                    <Clock className="w-8 h-8 text-[#4A4A4A] animate-spin mx-auto mb-4" />
                    <p className="text-[#4A4A4A]">Loading documents...</p>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-[#4A4A4A] mx-auto mb-4" />
                    <p className="text-[#0E0E0E]">No documents yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(groupedDocuments).map(
                      ([category, docs]) => (
                        <div
                          key={category}
                          className="bg-[#FAF6EE] p-6 border border-[#C5C5C5]"
                        >
                          <h3 className="text-sm font-bold uppercase text-[#0E0E0E] mb-4">
                            {categoryLabels[category] || category}
                          </h3>
                          <ul className="space-y-3">
                            {docs.map((doc) => (
                              <li
                                key={doc.id}
                                className="flex items-center justify-between border border-[#E1E1E1] bg-white px-4 py-3"
                              >
                                <span className="text-[#0E0E0E] text-sm">
                                  {doc.title || doc.file_name}
                                </span>
                                <div className="flex items-center gap-3">
                                  {(() => {
                                    const safeUrl = safeExternalHref(doc.url, {
                                      allowedHosts: publicAssetHosts,
                                    });
                                    return safeUrl ? (
                                      <a
                                        href={safeUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs uppercase font-bold text-[#3C0008]"
                                      >
                                        View
                                      </a>
                                    ) : null;
                                  })()}
                                  {doc.upload_source === "local" && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDeleteDocument(doc.id)
                                      }
                                      className="text-xs uppercase font-bold text-[#6E2B2B]"
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ),
                    )}
                  </div>
                )}
                <div className="mt-6 bg-[#FAF6EE] p-6 border border-[#C5C5C5]">
                  <h3 className="text-sm font-bold uppercase text-[#0E0E0E] mb-3">
                    Upload Document
                  </h3>
                  <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                    <input
                      type="file"
                      aria-label="Upload document"
                      onChange={(event) =>
                        setUploadFile(event.target.files?.[0] || null)
                      }
                    />
                    <Button
                      onClick={handleUpload}
                      disabled={!uploadFile}
                      className="bg-[#3C0008] text-[#FAF6EE] hover:bg-[#6E2B2B]"
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="billing" className="p-8 bg-[#F3EAD5]">
                {loading ? (
                  <div className="text-center py-12">
                    <Clock className="w-8 h-8 text-[#4A4A4A] animate-spin mx-auto mb-4" />
                    <p className="text-[#4A4A4A]">Loading invoices...</p>
                  </div>
                ) : invoices.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="w-12 h-12 text-[#4A4A4A] mx-auto mb-4" />
                    <p className="text-[#0E0E0E]">No invoices at this time.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#FAF6EE] border border-[#C5C5C5] p-5"
                      >
                        <div>
                          <p className="font-bold text-[#0E0E0E]">
                            {invoice.title || "Invoice"}
                          </p>
                          <p className="text-sm text-[#4A4A4A]">
                            Due {invoice.due_date || "Soon"}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-bold text-[#0E0E0E]">
                            $
                            {invoice.amount
                              ? Number(invoice.amount).toFixed(2)
                              : invoice.amount_cents
                                ? (invoice.amount_cents / 100).toFixed(2)
                                : "0.00"}
                          </p>
                          {invoice.status === "Paid" ? (
                            <span className="text-xs uppercase font-bold text-green-700">
                              Paid
                            </span>
                          ) : (
                            <Button
                              onClick={() => handlePayInvoice(invoice)}
                              disabled={paymentLoading}
                              className="bg-[#3C0008] text-[#FAF6EE] hover:bg-[#6E2B2B]"
                            >
                              Pay Now
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              {/* Job Requests Tab */}
              <TabsContent value="requests" className="p-8 bg-[#F3EAD5]">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#0E0E0E] mb-2">
                    Request New Job
                  </h2>
                  <p className="text-[#4A4A4A]">
                    Submit a new job request or insurance claim
                  </p>
                </div>

                {!showJobRequestForm ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#FAF6EE] border border-[#C5C5C5] p-6 text-center">
                      <Settings className="w-12 h-12 text-[#3C0008] mx-auto mb-4" />
                      <h3 className="font-bold text-[#0E0E0E] mb-2">
                        General Service
                      </h3>
                      <p className="text-sm text-[#4A4A4A] mb-4">
                        Request maintenance, repairs, or other services
                      </p>
                      <Button
                        onClick={() => {
                          setJobRequestForm((prev) => ({
                            ...prev,
                            type: "general",
                          }));
                          setShowJobRequestForm(true);
                        }}
                        className="bg-[#3C0008] text-[#FAF6EE] hover:bg-[#6E2B2B]"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Request Service
                      </Button>
                    </div>

                    <div className="bg-[#FAF6EE] border border-[#C5C5C5] p-6 text-center">
                      <AlertCircle className="w-12 h-12 text-[#3C0008] mx-auto mb-4" />
                      <h3 className="font-bold text-[#0E0E0E] mb-2">
                        Insurance Claim
                      </h3>
                      <p className="text-sm text-[#4A4A4A] mb-4">
                        Submit an insurance claim for damages
                      </p>
                      <Button
                        onClick={() => {
                          setJobRequestForm((prev) => ({
                            ...prev,
                            type: "insurance",
                          }));
                          setShowJobRequestForm(true);
                        }}
                        className="bg-[#3C0008] text-[#FAF6EE] hover:bg-[#6E2B2B]"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        File Claim
                      </Button>
                    </div>

                    <div className="bg-[#FAF6EE] border border-[#C5C5C5] p-6 text-center">
                      <Clock className="w-12 h-12 text-[#3C0008] mx-auto mb-4" />
                      <h3 className="font-bold text-[#0E0E0E] mb-2">
                        Emergency Service
                      </h3>
                      <p className="text-sm text-[#4A4A4A] mb-4">
                        24/7 emergency service request
                      </p>
                      <Button
                        onClick={() => {
                          setJobRequestForm((prev) => ({
                            ...prev,
                            type: "emergency",
                            priority: "urgent",
                          }));
                          setShowJobRequestForm(true);
                        }}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Emergency Request
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FAF6EE] border border-[#C5C5C5] p-6">
                    <form onSubmit={handleJobRequest} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-[#0E0E0E] mb-2">
                            Request Type
                          </label>
                          <select
                            value={jobRequestForm.type}
                            onChange={(e) =>
                              setJobRequestForm((prev) => ({
                                ...prev,
                                type: e.target.value,
                              }))
                            }
                            className="w-full border border-[#C5C5C5] p-3 bg-white"
                          >
                            <option value="general">General Service</option>
                            <option value="insurance">Insurance Claim</option>
                            <option value="emergency">Emergency Service</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-[#0E0E0E] mb-2">
                            Priority
                          </label>
                          <select
                            value={jobRequestForm.priority}
                            onChange={(e) =>
                              setJobRequestForm((prev) => ({
                                ...prev,
                                priority: e.target.value,
                              }))
                            }
                            className="w-full border border-[#C5C5C5] p-3 bg-white"
                          >
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#0E0E0E] mb-2">
                          Service Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={jobRequestForm.title}
                          onChange={(e) =>
                            setJobRequestForm((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          className="w-full border border-[#C5C5C5] p-3"
                          placeholder="Brief description of service needed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#0E0E0E] mb-2">
                          Service Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={jobRequestForm.address}
                          onChange={(e) =>
                            setJobRequestForm((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                          className="w-full border border-[#C5C5C5] p-3"
                          placeholder="Full service address"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#0E0E0E] mb-2">
                          Contact Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={jobRequestForm.phone}
                          onChange={(e) =>
                            setJobRequestForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full border border-[#C5C5C5] p-3"
                          placeholder="Your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#0E0E0E] mb-2">
                          Detailed Description
                        </label>
                        <textarea
                          value={jobRequestForm.description}
                          onChange={(e) =>
                            setJobRequestForm((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="w-full border border-[#C5C5C5] p-3 h-32 resize-none"
                          placeholder="Provide as much detail as possible about the work needed..."
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          className="bg-[#3C0008] text-[#FAF6EE] hover:bg-[#6E2B2B]"
                        >
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Submit Request
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setShowJobRequestForm(false)}
                          variant="outline"
                          className="border-[#C5C5C5] text-[#4A4A4A] hover:bg-[#F3EAD5]"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientPortal;
