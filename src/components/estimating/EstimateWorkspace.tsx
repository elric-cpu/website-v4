import React, { useMemo, useState } from "react";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parsePdfToText } from "@/lib/estimating/pdfParser";
import {
  createProject,
  ensureOrgForUser,
  fetchEstimateLineItems,
  fetchEstimateQuestions,
  fetchEstimateTasks,
  fetchLaborRates,
  fetchProductionRates,
  getPrice,
  invokeExtraction,
  updateLineItem,
  updateTask,
  upsertAnswer,
  uploadDocument,
} from "@/lib/estimating/estimateApi";
import {
  calculateLaborHours,
  calculateLineItemTotal,
  calculateMaterialCost,
} from "@/lib/estimating/estimateMath";
import { shouldShowQuestion } from "@/lib/estimating/questionLogic";
import type {
  EstimateLineItem,
  EstimateQuestion,
  EstimateTask,
} from "@/lib/estimating/types";
import EstimateQuestionsPanel from "./EstimateQuestionsPanel";
import EstimateReviewPanel from "./EstimateReviewPanel";
import EstimateTaskList from "./EstimateTaskList";

const EstimateWorkspace = () => {
  const { user, loading } = useAuth();
  const [orgId, setOrgId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectZip, setProjectZip] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);
  const [estimateVersionId, setEstimateVersionId] = useState<string | null>(
    null,
  );
  const [tasks, setTasks] = useState<EstimateTask[]>([]);
  const [lineItems, setLineItems] = useState<EstimateLineItem[]>([]);
  const [questions, setQuestions] = useState<EstimateQuestion[]>([]);
  const [answersById, setAnswersById] = useState<
    Record<string, string | number | null>
  >({});
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [productionRates, setProductionRates] = useState<any[]>([]);
  const [laborRates, setLaborRates] = useState<any[]>([]);

  const ensureOrg = async () => {
    if (!user) return;
    if (orgId) return orgId;
    const id = await ensureOrgForUser(user.id);
    setOrgId(id);
    return id;
  };

  const handleCreateProject = async () => {
    if (!user) return;
    try {
      setStatus("Creating project...");
      setError(null);
      const org = await ensureOrg();
      if (!org) return;
      const project = await createProject({
        orgId: org,
        name: projectName || "Inspection Estimate",
        propertyAddress: projectAddress,
        locationZip: projectZip,
        createdBy: user.id,
      });
      setProjectId(project.id);
      setStatus(null);
    } catch (err) {
      setError(err.message || "Failed to create project.");
      setStatus(null);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!user || !projectId) return;
    try {
      setStatus("Uploading and parsing PDF...");
      setError(null);
      const org = await ensureOrg();
      if (!org) return;
      const document = await uploadDocument({
        orgId: org,
        projectId,
        file,
        userId: user.id,
      });
      const parseResult = await parsePdfToText(file);
      const extraction = await invokeExtraction({
        documentId: document.id,
        projectId,
        parseResult,
      });
      setEstimateVersionId(extraction.estimate_version_id);
      setStatus("Loading tasks...");
      const [taskRows, questionRows] = await Promise.all([
        fetchEstimateTasks(extraction.estimate_version_id),
        fetchEstimateQuestions(extraction.estimate_version_id),
      ]);
      const lineItemRows = await fetchEstimateLineItems(
        taskRows.map((task) => task.id),
      );
      setTasks(taskRows);
      setLineItems(lineItemRows);
      setQuestions(questionRows);
      const [rateRows, laborRows] = await Promise.all([
        fetchProductionRates(),
        fetchLaborRates(),
      ]);
      setProductionRates(rateRows);
      setLaborRates(laborRows);
      setStatus(null);
    } catch (err) {
      setError(err.message || "Failed to process document.");
      setStatus(null);
    }
  };

  const answersByKey = useMemo(() => {
    return questions.reduce<Record<string, string | number | null>>(
      (acc, question) => {
        const value = answersById[question.id];
        if (value !== undefined) {
          acc[question.question_key] = value;
        }
        return acc;
      },
      {},
    );
  }, [answersById, questions]);

  const handleAnswerChange = async (
    question: EstimateQuestion,
    value: string | number,
  ) => {
    if (!user) return;
    setAnswersById((prev) => ({ ...prev, [question.id]: value }));
    await upsertAnswer({ questionId: question.id, value, answeredBy: user.id });
    if (question.derived_field === "location_label" && question.task_id) {
      await updateTask(question.task_id, { location_label: String(value) });
    }
  };

  const applyAnswers = async () => {
    if (!estimateVersionId || lineItems.length === 0) return;
    setStatus("Calculating line items...");
    setError(null);
    const updatedItems: EstimateLineItem[] = [];

    try {
      for (const item of lineItems) {
        const task = tasks.find((t) => t.id === item.estimate_task_id);
        const taskQuestions = questions.filter((q) => q.task_id === task?.id);
        const globalQuestions = questions.filter((q) => q.scope === "global");

        const getAnswer = (field: string) => {
          const q = taskQuestions.find(
            (question) => question.derived_field === field,
          );
          return q ? answersById[q.id] : null;
        };

        const getGlobal = (field: string) => {
          const q = globalQuestions.find(
            (question) => question.derived_field === field,
          );
          return q ? answersById[q.id] : null;
        };

        const quantity = Number(getAnswer("quantity") ?? item.quantity ?? 0);
        const unit = String(getAnswer("unit") ?? item.unit ?? "sqft");
        const access = String(getGlobal("access") ?? "standard");
        const occupancy = String(getGlobal("occupancy") ?? "occupied");
        const finish = String(getAnswer("finish") ?? "standard");

        const rate = productionRates.find(
          (rate) => rate.task_key === item.item_key,
        );
        const laborRateCard = laborRates.find(
          (rate) => rate.trade === task?.trade,
        );
        const laborRate = Number(
          laborRateCard?.loaded_rate ?? laborRateCard?.base_rate ?? 0,
        );
        const laborHours = rate
          ? calculateLaborHours(quantity, Number(rate.base_rate), {
              access: access as any,
              occupancy: occupancy as any,
              finish: finish as any,
            })
          : 0;

        const price = await getPrice({
          itemKey: item.item_key || "general",
          locationZip: String(getGlobal("location_zip") ?? projectZip ?? ""),
          unit,
          quantity,
        }).catch(() => null);

        const unitPrice = price?.unit_price
          ? Number(price.unit_price)
          : Number(item.material_unit_price ?? 0);
        const materialCost = calculateMaterialCost(quantity, unitPrice);
        const laborCost = laborHours * laborRate;
        const totalCost = calculateLineItemTotal({
          materialCost,
          laborCost,
          equipmentCost: Number(item.equipment_cost ?? 0),
          disposalCost: Number(item.disposal_cost ?? 0),
          markupPct: Number(item.markup_pct ?? 0),
        });

        const updated = {
          ...item,
          quantity,
          unit,
          material_unit_price: unitPrice,
          labor_hours: laborHours,
          labor_rate: laborRate,
          total_cost: totalCost,
        };

        await updateLineItem(item.id, updated);
        updatedItems.push(updated);
      }

      setLineItems(updatedItems);
      setStatus(null);
    } catch (err) {
      setError(err.message || "Failed to calculate estimate.");
      setStatus(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Loading estimator...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Sign in required
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Please sign in to access the estimating workspace.
        </p>
        <Button className="mt-4" asChild>
          <a href="/client-portal-login">Sign in</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">
          AI Estimating Workspace
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload an inspection report to generate tasks, answer targeted
          questions, and review a citation-backed estimate.
        </p>
        <div className="grid gap-4 mt-6 md:grid-cols-3">
          <Input
            placeholder="Project name"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
          />
          <Input
            placeholder="Project ZIP"
            value={projectZip}
            onChange={(event) => setProjectZip(event.target.value)}
          />
          <Input
            placeholder="Property address"
            value={projectAddress}
            onChange={(event) => setProjectAddress(event.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-3 items-center">
          <Button onClick={handleCreateProject} disabled={Boolean(projectId)}>
            {projectId ? "Project ready" : "Create project"}
          </Button>
          {projectId && (
            <label className="text-sm text-gray-700">
              <span className="mr-2">Upload inspection PDF</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
            </label>
          )}
        </div>
        {status && <p className="mt-3 text-sm text-gray-500">{status}</p>}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      {tasks.length > 0 && <EstimateTaskList tasks={tasks} />}

      {questions.length > 0 && (
        <EstimateQuestionsPanel
          questions={questions}
          answersById={answersById}
          onChange={handleAnswerChange}
          isVisible={(question) => shouldShowQuestion(question, answersByKey)}
        />
      )}

      {lineItems.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Button onClick={applyAnswers}>Recalculate estimate</Button>
          </div>
          <EstimateReviewPanel tasks={tasks} lineItems={lineItems} />
        </div>
      )}
    </div>
  );
};

export default EstimateWorkspace;
