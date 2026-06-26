"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Loader2 } from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  url: string;
  height?: string; 
  width?: string;  
}

export default function PDFViewer({ url, height = "h-[700px]", width = "max-w-4xl" }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  return (
    <div className={`flex flex-col border border-neutral-200 bg-white shadow-xs rounded-xl dark:border-neutral-800 dark:bg-neutral-950 overflow-hidden w-full mx-auto ${width} ${height}`}>
      
      {/* Premium Minimal Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-100 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-950 sticky top-0 z-10 backdrop-blur-md">
        
        {/* Pagination */}
        <div className="flex items-center gap-1 font-mono">
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-200/50 disabled:opacity-30 dark:hover:bg-neutral-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 min-w-12 text-center select-none">
            {pageNumber} / {numPages || "--"}
          </span>
          <button
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || 1))}
            disabled={pageNumber >= (numPages || 1)}
            className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-200/50 disabled:opacity-30 dark:hover:bg-neutral-800"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Zoom Controls & Actions */}
        <div className="flex items-center gap-3 font-mono">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setScale(prev => Math.max(prev - 0.1, 0.6))}
              className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-200/50 dark:hover:bg-neutral-800"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 min-w-10 text-center select-none">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale(prev => Math.min(prev + 0.1, 1.8))}
              className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-200/50 dark:hover:bg-neutral-800"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />

          <a
            href={url}
            download
            className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors"
          >
            <Download className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Canvas View Area */}
      <div className="flex-1 overflow-auto bg-neutral-50/30 p-6 flex justify-center items-start dark:bg-neutral-900/20 custom-scrollbar">
        <div className="shadow-xs border border-neutral-100 rounded-sm overflow-hidden dark:border-neutral-800/50 bg-white dark:bg-black">
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => { setNumPages(numPages); setPageNumber(1); }}
            loading={
              <div className="flex items-center justify-center p-20">
                <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale} 
              renderAnnotationLayer={true}
              renderTextLayer={true}
              className="max-w-full"
            />
          </Document>
        </div>
      </div>

    </div>
  );
}