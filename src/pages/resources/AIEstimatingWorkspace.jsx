import React from "react";
import SEO from "@/components/SEO";
import EstimateWorkspace from "@/components/estimating/EstimateWorkspace";

const AIEstimatingWorkspace = () => {
  return (
    <>
      <SEO
        title="AI Estimating Workspace | Benson Home Solutions"
        description="Upload inspection reports, answer targeted questions, and review citation-backed line-item estimates."
        keywords="inspection report estimate, ai estimating, line item estimate, repair scope builder"
      />
      <EstimateWorkspace />
    </>
  );
};

export default AIEstimatingWorkspace;
