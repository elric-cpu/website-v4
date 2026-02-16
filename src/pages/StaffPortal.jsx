import React, { useEffect, useMemo, useState } from "react";
import SEO from "@/components/SEO";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { supabase } from "@/lib/customSupabaseClient";
import ProjectList from "@/components/estimating/ProjectList";
import DocumentUploader from "@/components/estimating/DocumentUploader";
import ExtractionStatus from "@/components/estimating/ExtractionStatus";
import QuestionEngine from "@/components/estimating/QuestionEngine";
import EstimateReview from "@/components/estimating/EstimateReview";
import {
  fetchEstimate,
  fetchEstimateStatus,
  fetchQuestions,
  submitAnswers,
} from "@/lib/estimating/api";

export default function StaffPortal() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [activeOrg, setActiveOrg] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [status, setStatus] = useState(null);
  const [estimateData, setEstimateData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const questionKey =
    status?.estimate_version_id ||
    status?.document_id ||
    selectedProject?.id ||
    "questions";

  const orgOptions = useMemo(
    () =>
      organizations.map((org) => ({
        id: org.organization_id,
        name: org.organizations?.name || "Organization",
      })),
    [organizations],
  );

  const loadProjects = async (orgId) => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("organization_id", orgId)
      .order("created_at", { ascending: false });
    setProjects(data || []);
  };

  useEffect(() => {
    if (!user?.id) return;
    const loadMemberships = async () => {
      const { data } = await supabase
        .from("workspace_members")
        .select("organization_id, organizations ( id, name )")
        .eq("user_id", user.id);

      setOrganizations(data || []);
      const defaultOrg = data?.[0]?.organization_id || null;
      setActiveOrg(defaultOrg);
      if (defaultOrg) {
        loadProjects(defaultOrg);
      }
    };

    loadMemberships();
  }, [user]);

  const handleCreateProject = async (payload) => {
    if (!activeOrg) return;
    const { data, error } = await supabase
      .from("projects")
      .insert({
        organization_id: activeOrg,
        name: payload.name,
        address: payload.address,
        city: payload.city,
        state: payload.state,
        zip: payload.zip,
        status: "active",
        created_by: user?.id,
      })
      .select("*")
      .single();

    if (!error && data) {
      setProjects((prev) => [data, ...prev]);
      setSelectedProject(data);
    }
  };

  const refreshStatus = async () => {
    if (!status?.document_id && !status?.estimate_id) return;
    const payload = status.document_id
      ? { document_id: status.document_id }
      : { estimate_id: status.estimate_id };
    const latest = await fetchEstimateStatus(payload);
    setStatus((prev) => ({ ...prev, ...latest }));
  };

  useEffect(() => {
    const loadEstimate = async () => {
      if (!status?.estimate_id || !status?.estimate_version_id) return;
      setLoading(true);
      try {
        const data = await fetchEstimate({ estimate_id: status.estimate_id });
        setEstimateData(data);
        const questionData = await fetchQuestions({
          estimate_version_id: status.estimate_version_id,
        });
        setQuestions(questionData?.questions || []);
      } finally {
        setLoading(false);
      }
    };
    loadEstimate();
  }, [status?.estimate_id, status?.estimate_version_id]);

  const handleSubmitAnswers = async (answers) => {
    if (!status?.estimate_version_id) return;
    setQuestionLoading(true);
    try {
      const response = await submitAnswers({
        estimate_version_id: status.estimate_version_id,
        answers,
      });
      if (response?.version_id) {
        setStatus((prev) => ({
          ...prev,
          estimate_version_id: response.version_id,
        }));
      }
    } finally {
      setQuestionLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Staff Estimating Portal"
        description="AI-assisted estimating workspace for staff."
        robots="noindex, nofollow"
      />

      <div className="min-h-screen bg-cream-50 py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-contractor-black">
                Estimating Workspace
              </h1>
              <p className="text-gray-600">
                Upload inspection reports, review AI-drafted scopes, and
                finalize pricing.
              </p>
            </div>
            {orgOptions.length > 1 && (
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <label className="text-xs text-gray-500">Organization</label>
                <select
                  className="w-full text-sm mt-1"
                  value={activeOrg || ""}
                  onChange={(event) => {
                    const nextOrg = event.target.value;
                    setActiveOrg(nextOrg);
                    setSelectedProject(null);
                    setStatus(null);
                    setEstimateData(null);
                    setQuestions([]);
                    loadProjects(nextOrg);
                  }}
                >
                  {orgOptions.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <ProjectList
              projects={projects}
              selectedProjectId={selectedProject?.id}
              onSelect={(project) => {
                setSelectedProject(project);
                setStatus(null);
                setEstimateData(null);
                setQuestions([]);
              }}
              onCreate={handleCreateProject}
            />

            <div className="lg:col-span-2 space-y-6">
              {selectedProject ? (
                <>
                  <DocumentUploader
                    project={selectedProject}
                    onStatusUpdate={(data) =>
                      setStatus({ ...data, document_id: data?.document_id })
                    }
                  />

                  <ExtractionStatus status={status} onRefresh={refreshStatus} />

                  {loading && (
                    <div className="text-sm text-gray-500">
                      Loading estimate…
                    </div>
                  )}

                  {estimateData && (
                    <EstimateReview estimateData={estimateData} />
                  )}

                  {questions.length > 0 && (
                    <QuestionEngine
                      key={questionKey}
                      questions={questions}
                      onSubmit={handleSubmitAnswers}
                      loading={questionLoading}
                    />
                  )}
                </>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <p className="text-sm text-gray-500">
                    Select or create a project to begin estimating.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
