import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProjectList({
  projects,
  selectedProjectId,
  onSelect,
  onCreate,
}) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    onCreate({
      name: form.name.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      zip: form.zip.trim(),
    });
    setForm({ name: "", address: "", city: "", state: "", zip: "" });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-contractor-black mb-4">
        Projects
      </h2>
      <div className="space-y-3 mb-6">
        {(projects || []).map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project)}
            className={
              "w-full text-left p-3 rounded-lg border transition " +
              (selectedProjectId === project.id
                ? "border-maroon bg-cream/40"
                : "border-gray-200 hover:border-gray-300")
            }
          >
            <div className="font-semibold text-contractor-black">
              {project.name}
            </div>
            <div className="text-xs text-gray-500">
              {project.city || "—"}, {project.state || ""} {project.zip || ""}
            </div>
          </button>
        ))}
        {projects?.length === 0 && (
          <div className="text-sm text-gray-500">No projects yet.</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label htmlFor="proj_name">Project name *</Label>
          <Input
            id="proj_name"
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            placeholder="Inspection report - Main St"
          />
        </div>
        <div>
          <Label htmlFor="proj_address">Address</Label>
          <Input
            id="proj_address"
            value={form.address}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, address: event.target.value }))
            }
            placeholder="123 Main St"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <Label htmlFor="proj_city">City</Label>
            <Input
              id="proj_city"
              value={form.city}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, city: event.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="proj_state">State</Label>
            <Input
              id="proj_state"
              value={form.state}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, state: event.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="proj_zip">ZIP</Label>
            <Input
              id="proj_zip"
              value={form.zip}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, zip: event.target.value }))
              }
            />
          </div>
        </div>
        <Button type="submit" className="bg-maroon hover:bg-red-700 w-full">
          Create Project
        </Button>
      </form>
    </div>
  );
}
