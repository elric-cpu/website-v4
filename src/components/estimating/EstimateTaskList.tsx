import React from "react";
import type { EstimateTask } from "@/lib/estimating/types";

type Props = {
  tasks: EstimateTask[];
};

const EstimateTaskList = ({ tasks }: Props) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Extracted tasks</h3>
      <p className="text-sm text-gray-600 mt-1">
        Draft scope narratives created from the inspection report.
      </p>
      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-lg border border-gray-100 p-4">
            <div className="text-sm font-semibold text-gray-800">
              {task.trade || "General"} · {task.task_key}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {task.scope_narrative}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstimateTaskList;
