import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import AnswerDisplay from "@/components/AnswerDisplay";
import DocumentUpload from "@/components/DocumentUpload";
import DocumentGrid from "@/components/DocumentGrid";
import LoadingState from "@/components/LoadingState";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Document {
  id: string;
  filename: string;
  fileSize: string;
  uploadDate: string;
}

interface AnswerData {
  answer: string;
  sources: Array<{
    documentName: string;
    excerpt: string;
    fullContext?: string;
  }>;
}

export default function Home() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<AnswerData | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: documents = [], refetch } = useQuery<Document[]>({
    queryKey: ["/api/documents"],
  });

  const uploadMutation = useMutation({
    mutationFn: async (files: FileList) => {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append("files", file);
      });
      
      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Upload failed");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      refetch();
      toast({
        title: "Success",
        description: "Documents uploaded and processed successfully",
      });
      setTimeout(() => {
        setIsUploadOpen(false);
      }, 1000);
    },
    onError: (error: Error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/documents/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      refetch();
      toast({
        title: "Deleted",
        description: "Document deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSearch = async (query: string) => {
    setLastQuery(query);
    setIsSearching(true);
    setCurrentAnswer(null);
    
    try {
      const res = await apiRequest("POST", "/api/query", { query });
      const response = await res.json();
      
      setCurrentAnswer(response);
    } catch (error) {
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "Failed to process query",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleFileSelect = (files: FileList) => {
    uploadMutation.mutate(files);
  };

  const handleDeleteDocument = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleRegenerate = () => {
    if (!lastQuery) {
      toast({
        title: "No query to regenerate",
        description: "Please run a search first",
        variant: "destructive",
      });
      return;
    }

    // Re-run the same query to regenerate the answer
    (async () => {
      setIsSearching(true);
      setCurrentAnswer(null);
      try {
        const res = await apiRequest("POST", "/api/query", { query: lastQuery });
        const response = await res.json();
        setCurrentAnswer(response);
      } catch (error) {
        toast({
          title: "Regenerate failed",
          description: error instanceof Error ? error.message : "Failed to regenerate",
          variant: "destructive",
        });
      } finally {
        setIsSearching(false);
      }
    })();
  };

  const formattedDocuments = documents.map(doc => ({
    ...doc,
    uploadDate: new Date(doc.uploadDate)
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        documentCount={documents.length} 
        onUploadClick={() => setIsUploadOpen(true)} 
      />
      
      <main className="flex-1">
        <div className="py-12 px-6">
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </div>

        {isSearching && (
          <div className="px-6 mb-12">
            <LoadingState />
          </div>
        )}

        {currentAnswer && !isSearching && (
          <div className="px-6 mb-12">
            <AnswerDisplay
              answer={currentAnswer.answer}
              sources={currentAnswer.sources}
              onRegenerate={handleRegenerate}
            />
          </div>
        )}

        <div className="px-6 py-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Your Documents</h2>
          <DocumentGrid
            documents={formattedDocuments}
            onDeleteDocument={handleDeleteDocument}
          />
        </div>
      </main>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Documents</DialogTitle>
          </DialogHeader>
          <DocumentUpload 
            onFileSelect={handleFileSelect}
            isUploading={uploadMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
