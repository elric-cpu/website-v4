import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  initDocumentUpload,
  uploadPdfToSignedUrl,
  completeDocumentUpload,
  fetchEstimateStatus,
} from "@/lib/estimating/api";

export default function DocumentUploader({ project, onStatusUpdate }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file || !project) return;
    setUploading(true);
    setError(null);

    try {
      const init = await initDocumentUpload({
        project_id: project.id,
        file_name: file.name,
        mime_type: file.type,
        size_bytes: file.size,
      });

      await uploadPdfToSignedUrl({
        storagePath: init.storage_path,
        token: init.token,
        file,
      });

      await completeDocumentUpload({ document_id: init.document_id });
      const status = await fetchEstimateStatus({
        document_id: init.document_id,
      });
      onStatusUpdate?.({ ...status, document_id: init.document_id });
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-contractor-black mb-2">
        Upload Inspection PDF
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Upload the inspection report or scope of work to start extraction.
      </p>
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <Input
          type="file"
          accept="application/pdf"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
        />
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="bg-maroon hover:bg-red-700"
        >
          {uploading ? "Uploading…" : "Upload PDF"}
        </Button>
      </div>
      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
    </div>
  );
}
