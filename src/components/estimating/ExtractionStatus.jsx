import React from "react";
import { Button } from "@/components/ui/button";

const statusColor = (status) => {
  if (status === "completed") return "text-green-700";
  if (status === "failed") return "text-red-600";
  return "text-yellow-600";
};

export default function ExtractionStatus({ status, onRefresh }) {
  if (!status) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-contractor-black">
            Extraction Status
          </h3>
          <p
            className={`text-sm ${statusColor(status.extraction_run?.status)}`}
          >
            {status.extraction_run?.status || "queued"}
          </p>
        </div>
        <Button variant="outline" onClick={onRefresh}>
          Refresh
        </Button>
      </div>
      {status.estimate_id && (
        <div className="mt-2 text-sm text-gray-500">
          Estimate ready: {status.estimate_id}
        </div>
      )}
    </div>
  );
}
