"use client";

import { useState } from "react";
import { FileDown, FileText, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface ExportData {
  [key: string]: string | number | boolean | null | undefined;
}

interface ExportButtonProps {
  data: ExportData[];
  filename: string;
  label?: string;
  onExport?: (format: "csv" | "pdf") => void;
}

export function ExportButton({
  data,
  filename,
  label = "Export",
  onExport,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: "csv" | "pdf") => {
    if (onExport) {
      onExport(format);
    }
    
    setIsExporting(true);
    
    try {
      if (format === "csv") {
        exportAsCSV();
      } else {
        exportAsPDF();
      }
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsCSV = () => {
    if (data.length === 0) {
      toast({
        title: "No data to export",
        description: "There is no data available to export. Add measurements or complete assessments first.",
        variant: "destructive",
      });
      return;
    }

    // Get headers from the first item
    const headers = Object.keys(data[0]);
    
    // Convert data to CSV format
    const csvContent = [
      headers.join(","), // Header row
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle strings with commas by wrapping in quotes
          if (typeof value === "string" && value.includes(",")) {
            return `"${value}"`;
          }
          return value !== null && value !== undefined ? String(value) : "";
        }).join(",")
      )
    ].join("\n");
    
    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAsPDF = () => {
    // This is a placeholder - you would implement PDF export using a library like jsPDF or html2pdf
    console.log("PDF export not implemented yet");
    if (onExport) onExport("pdf");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2" disabled={isExporting}>
          <FileDown className="h-4 w-4" />
          {label}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          <Download className="mr-2 h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 