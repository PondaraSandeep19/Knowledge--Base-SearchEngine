import { FileText, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface DocumentCardProps {
  id: string;
  filename: string;
  fileSize: string;
  uploadDate: Date;
  onDelete: (id: string) => void;
}

export default function DocumentCard({ 
  id, 
  filename, 
  fileSize, 
  uploadDate, 
  onDelete 
}: DocumentCardProps) {
  return (
    <Card className="p-4 hover-elevate transition-all group" data-testid={`card-document-${id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate" title={filename} data-testid="text-filename">
              {filename}
            </p>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <span data-testid="text-filesize">{fileSize}</span>
              <span>•</span>
              <span data-testid="text-upload-date">
                {formatDistanceToNow(uploadDate, { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onDelete(id)}
          data-testid={`button-delete-${id}`}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </Card>
  );
}
