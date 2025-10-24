import { CloudUpload, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useCallback } from "react";
import { Progress } from "@/components/ui/progress";

interface DocumentUploadProps {
  onFileSelect: (files: FileList) => void;
  isUploading?: boolean;
  uploadProgress?: number;
}

export default function DocumentUpload({ 
  onFileSelect, 
  isUploading = false,
  uploadProgress = 0 
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      onFileSelect(e.dataTransfer.files);
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFileSelect(e.target.files);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card
        className={`relative p-12 border-2 border-dashed transition-colors ${
          isDragging ? "border-primary bg-primary/5" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-testid="dropzone-upload"
      >
        <input
          type="file"
          multiple
          accept=".pdf,.txt,.docx"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
          data-testid="input-file"
        />
        
        <div className="flex flex-col items-center text-center space-y-4">
          {uploadComplete ? (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <div>
                <p className="text-lg font-semibold">Upload Complete!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your documents have been processed
                </p>
              </div>
            </>
          ) : (
            <>
              <CloudUpload className={`h-12 w-12 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
              <div>
                <p className="text-lg font-semibold">
                  {isUploading ? "Uploading..." : "Drop your files here"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse
                </p>
              </div>
              <div className="flex gap-2 text-xs font-mono text-muted-foreground">
                <span className="px-2 py-1 bg-muted rounded">PDF</span>
                <span className="px-2 py-1 bg-muted rounded">TXT</span>
                <span className="px-2 py-1 bg-muted rounded">DOCX</span>
              </div>
              <p className="text-xs text-muted-foreground">Max 10MB per file</p>
            </>
          )}
        </div>

        {isUploading && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-xs text-center text-muted-foreground mt-2">
              {uploadProgress}% complete
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
