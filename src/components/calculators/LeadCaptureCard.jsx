import React from "react";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LeadCaptureCard({
  title,
  subtitle,
  benefits = [],
  lead,
  onLeadChange,
  onSubmit,
  canSubmit,
  submitting,
  submitted,
  buttonLabel,
  successMessage,
}) {
  return (
    <div className="bg-contractor-black text-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Lock className="w-5 h-5 text-cream" />
        <div>
          <p className="text-xs uppercase tracking-wide text-cream m-0">
            Get Full Report
          </p>
          <p className="text-lg font-bold m-0">{title}</p>
        </div>
      </div>
      {subtitle ? (
        <p className="text-sm text-gray-200 mb-6">{subtitle}</p>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lead-name" className="text-cream">
            Name
          </Label>
          <Input
            id="lead-name"
            name="name"
            value={lead.name}
            onChange={onLeadChange}
            placeholder="Full name"
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-email" className="text-cream">
            Email
          </Label>
          <Input
            id="lead-email"
            name="email"
            type="email"
            value={lead.email}
            onChange={onLeadChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-phone" className="text-cream">
            Phone (optional)
          </Label>
          <Input
            id="lead-phone"
            name="phone"
            value={lead.phone}
            onChange={onLeadChange}
            placeholder="(541) 555-0123"
            autoComplete="tel"
          />
        </div>

        <Button
          type="submit"
          disabled={!canSubmit || submitting}
          className="w-full bg-maroon hover:bg-red-700 text-white font-bold"
        >
          {submitting ? "Submitting..." : buttonLabel}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </form>

      {submitted ? (
        <p className="text-xs text-cream mt-4">{successMessage}</p>
      ) : (
        <p className="text-xs text-gray-300 mt-4">
          We respect your inbox. No spam, no resale.
        </p>
      )}

      {benefits.length ? (
        <div className="mt-6 border-t border-white/10 pt-5">
          <h4 className="text-sm font-semibold text-cream mb-3">
            What you will receive
          </h4>
          <ul className="space-y-2 text-sm text-gray-200">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
