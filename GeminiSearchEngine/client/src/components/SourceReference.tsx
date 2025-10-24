import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface SourceReferenceProps {
  documentName: string;
  excerpt: string;
  fullContext?: string;
}

export default function SourceReference({ 
  documentName, 
  excerpt, 
  fullContext 
}: SourceReferenceProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-4 hover-elevate cursor-pointer" onClick={() => fullContext && setIsExpanded(!isExpanded)}>
      <div className="flex items-start gap-3">
        <FileText className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium font-mono truncate" data-testid="text-document-name">
            {documentName}
          </p>
          <p className="text-sm text-muted-foreground italic mt-1" data-testid="text-excerpt">
            "{excerpt}"
          </p>
          {isExpanded && fullContext && (
            <p className="text-sm text-foreground mt-2 pt-2 border-t" data-testid="text-full-context">
              {fullContext}
            </p>
          )}
        </div>
        {fullContext && (
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
