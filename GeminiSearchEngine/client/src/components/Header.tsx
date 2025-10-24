import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  documentCount: number;
  onUploadClick: () => void;
}

export default function Header({ documentCount, onUploadClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-lg font-semibold" data-testid="text-app-title">
              Knowledge Search
            </h1>
            <p className="text-xs text-muted-foreground" data-testid="text-document-count">
              {documentCount} {documentCount === 1 ? 'document' : 'documents'} indexed
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={onUploadClick} data-testid="button-upload">
            Upload Documents
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
