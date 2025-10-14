import DocumentCard from "./DocumentCard";

interface Document {
  id: string;
  filename: string;
  fileSize: string;
  uploadDate: Date;
}

interface DocumentGridProps {
  documents: Document[];
  onDeleteDocument: (id: string) => void;
}

export default function DocumentGrid({ documents, onDeleteDocument }: DocumentGridProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12" data-testid="empty-state">
        <p className="text-muted-foreground">No documents uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          id={doc.id}
          filename={doc.filename}
          fileSize={doc.fileSize}
          uploadDate={doc.uploadDate}
          onDelete={onDeleteDocument}
        />
      ))}
    </div>
  );
}
