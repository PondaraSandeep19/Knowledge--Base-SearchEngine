import { Sparkles, RotateCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SourceReference from "./SourceReference";

interface Source {
  documentName: string;
  excerpt: string;
  fullContext?: string;
}

interface AnswerDisplayProps {
  answer: string;
  sources: Source[];
  onRegenerate?: () => void;
}

export default function AnswerDisplay({ answer, sources, onRegenerate }: AnswerDisplayProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <Card className="border-l-4 border-l-primary p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            AI Generated Answer
          </Badge>
          {onRegenerate && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onRegenerate}
              data-testid="button-regenerate"
            >
              <RotateCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          )}
        </div>
        <p className="text-lg leading-relaxed" data-testid="text-answer">
          {answer}
        </p>
      </Card>

      {sources.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Sources
          </h3>
          <div className="space-y-2">
            {sources.map((source, index) => (
              <SourceReference
                key={index}
                documentName={source.documentName}
                excerpt={source.excerpt}
                fullContext={source.fullContext}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
