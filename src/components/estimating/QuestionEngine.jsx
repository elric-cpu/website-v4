import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function QuestionEngine({ questions, onSubmit, loading }) {
  const [answers, setAnswers] = useState({});

  const buildKey = (question) =>
    `${question.question_id}:${question.target_id || "global"}`;

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = questions
      .map((question) => {
        const key = buildKey(question);
        return {
          question_id: question.question_id,
          target_id: question.target_id,
          value: answers[key],
        };
      })
      .filter(
        (entry) =>
          entry.value !== undefined &&
          entry.value !== null &&
          entry.value !== "",
      );
    if (!payload.length) return;
    onSubmit(payload);
  };

  if (!questions?.length) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-contractor-black mb-3">
        Additional Inputs
      </h3>
      <div className="space-y-4">
        {questions.map((question) => {
          const key = buildKey(question);
          return (
            <div key={key}>
              <Label className="block mb-1">{question.prompt}</Label>
              {question.input_type === "select" ? (
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  value={answers[key] ?? ""}
                  onChange={(event) => handleChange(key, event.target.value)}
                >
                  <option value="">Select…</option>
                  {(question.options || []).map((option) => (
                    <option key={String(option.value)} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  type={question.input_type === "number" ? "number" : "text"}
                  value={answers[key] ?? ""}
                  onChange={(event) => handleChange(key, event.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>
      <Button
        type="submit"
        className="mt-6 bg-maroon hover:bg-red-700"
        disabled={loading}
      >
        {loading ? "Updating…" : "Update Estimate"}
      </Button>
    </form>
  );
}
