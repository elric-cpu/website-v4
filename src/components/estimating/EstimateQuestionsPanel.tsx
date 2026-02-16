import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { EstimateQuestion } from "@/lib/estimating/types";

type Props = {
  questions: EstimateQuestion[];
  answersById: Record<string, string | number | null>;
  onChange: (question: EstimateQuestion, value: string | number) => void;
  isVisible: (question: EstimateQuestion) => boolean;
};

const renderControl = (
  question: EstimateQuestion,
  value: string | number | null,
  onChange: (value: string | number) => void,
) => {
  if (question.answer_type === "select") {
    return (
      <select
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select</option>
        {(question.options || []).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <Input
      type={question.answer_type === "number" ? "number" : "text"}
      value={value ?? ""}
      onChange={(event) =>
        onChange(
          question.answer_type === "number"
            ? Number(event.target.value)
            : event.target.value,
        )
      }
    />
  );
};

const EstimateQuestionsPanel = ({
  questions,
  answersById,
  onChange,
  isVisible,
}: Props) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        Questions to finalize pricing
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Only the missing inputs are shown. Answers update the estimate
        instantly.
      </p>
      <div className="mt-4 space-y-4">
        {questions.filter(isVisible).map((question) => (
          <div key={question.id} className="space-y-2">
            <Label className="text-sm font-medium text-gray-800">
              {question.prompt}
            </Label>
            {renderControl(question, answersById[question.id] ?? "", (value) =>
              onChange(question, value),
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstimateQuestionsPanel;
