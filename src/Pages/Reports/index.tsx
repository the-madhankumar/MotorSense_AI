"use client";

import { useState } from "react";
import DashboardDivider from "@/components/Dashboard/divider";
import PDFViewer from "@/components/Reports/PDFViewer";
import RAG_PAPERS from "@/Context/rag_context";
import { FileText, ArrowRight } from "lucide-react";

const Reports = () => {
    const [activePaper, setActivePaper] = useState(RAG_PAPERS[0]);

    return (
        <div className="min-h-screen bg-gray-700 p-6 font-mono transition-colors dark:bg-neutral-950">
            <DashboardDivider title="Reports" />

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">

                <div className="w-full space-y-4 lg:w-1/3">
                    <p className="text-xs tracking-wider text-neutral-400 uppercase">
                        Select Document ({RAG_PAPERS.length})
                    </p>

                    <div className="space-y-2 max-h-50 overflow-y-auto scrollbar-none bg-gray-800 rounded-3xl p-4">
                        {RAG_PAPERS.map((paper) => {
                            const isSelected = activePaper.id === paper.id;

                            return (
                                <button
                                    key={paper.id}
                                    onClick={() => setActivePaper(paper)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 group ${isSelected
                                        ? "bg-neutral-800 border-neutral-700 text-white"
                                        : "bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className={`h-4 w-4 shrink-0 ${isSelected ? "text-sky-400" : "text-neutral-500"}`} />
                                        <div>
                                            <h3 className={`text-sm font-medium leading-tight ${isSelected ? "text-white" : "text-neutral-300"}`}>
                                                {paper.title}
                                            </h3>
                                            <p className="text-[11px] mt-1 text-neutral-500">
                                                {paper.category}
                                            </p>
                                        </div>
                                    </div>

                                    <ArrowRight className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${isSelected ? "text-white opacity-100" : "text-neutral-500 opacity-0 group-hover:opacity-100"
                                        }`} />
                                </button>
                            );
                        })}
                    </div>

                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-xs backdrop-blur-md">
                        <p className="text-[10px] tracking-widest uppercase text-neutral-500 mb-2 font-bold">
                            Document Summary
                        </p>
                        <div className="relative pl-3 border-l-2 border-sky-500/50 py-0.5">
                            <p className="text-xs font-normal leading-relaxed text-neutral-300 antialiased font-sans">
                                {activePaper.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {activePaper.focus.map((tag, index) => (
                            <span
                                key={index}
                                className="text-[10px] font-mono font-medium tracking-wide text-sky-400 bg-sky-950/40 border border-sky-900/50 px-2 py-0.5 rounded-md"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-1.5 mt-3 pt-3 border-t border-neutral-800 bg-neutral-900/60 rounded-2xl p-6">
                        <p className="text-[10px] tracking-widest uppercase text-neutral-500 font-bold">
                            Applications
                        </p>
                        <div className="flex flex-col gap-1">
                            {activePaper.usedFor.map((item, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs text-neutral-400 font-sans">
                                    <span className="h-1 w-1 rounded-full bg-emerald-500 shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full flex-1 rounded-xl bg-neutral-900 p-2 border border-neutral-800 shadow-lg">
                    <PDFViewer url={activePaper.pdfUrl || "/sample.pdf"} />
                </div>

            </div>
        </div>
    );
};

export default Reports;