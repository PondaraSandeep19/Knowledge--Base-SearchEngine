import { Card } from "@/components/ui/card";

export default function LoadingState() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="p-6 border-l-4 border-l-primary">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium" data-testid="text-loading">
            Analyzing documents...
          </p>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
          <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
        </div>
      </Card>
    </div>
  );
}
