import React from "react";
import { Lock } from "lucide-react";

export default function ResultsLock({ locked, message, children }) {
  return (
    <div className="relative">
      {locked ? (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl border border-dashed border-maroon flex flex-col items-center justify-center text-center p-6 z-10">
          <Lock className="w-6 h-6 text-maroon mb-3" />
          <p className="text-sm font-semibold text-contractor-black mb-1">
            {message}
          </p>
          <p className="text-xs text-restoration-gray m-0">
            Enter your email to unlock the full PDF report.
          </p>
        </div>
      ) : null}
      <div className={`rounded-xl ${locked ? "blur-sm" : ""}`}>{children}</div>
    </div>
  );
}
