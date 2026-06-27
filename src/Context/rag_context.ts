import { RAGPaperType } from "@/Types/rag";
import { create } from "zustand";

type AICheckStore = {
  getAI: boolean;
  toggle: () => void;
};

export const useAICheck = create<AICheckStore>((set) => ({
  getAI: true,
  toggle: () =>
    set((state) => ({
      getAI: !state.getAI,
    })),
}));

const RAG_PAPERS: RAGPaperType[] = [
  {
    id: "paper_1",
    title: "Vibration and Current-Based Fault Diagnosis of Induction Motors",
    category: "Mechanical Fault Detection",
    focus: ["Vibration Analysis", "Motor Current Signature Analysis", "Bearing Faults"],
    description:
      "This paper explains how vibration signals and motor current patterns can be combined to detect mechanical faults such as bearing failures, misalignment, and rotor imbalance. It forms the core foundation for mechanical condition monitoring in industrial motors.",
    usedFor: [
      "Bearing Fault Detection",
      "Misalignment Detection",
      "Mechanical Health Estimation",
    ],
    pdfUrl: "/documents/pdf1.pdf"
  },

  {
    id: "paper_2",
    title: "Fuzzy Logic-Based Fault Detection with Power Quality Analysis in Induction Motors",
    category: "Electrical Fault Diagnosis",
    focus: ["Fuzzy Logic", "Power Quality", "Voltage & Current Deviations", "THD"],
    description:
      "This paper introduces a fuzzy logic approach to detect motor faults using electrical parameters such as voltage variations, current imbalance, and harmonic distortion (THD). It provides a rule-based decision system for early-stage fault detection.",
    usedFor: [
      "Voltage Anomaly Detection",
      "THD-Based Fault Identification",
      "Rule-Based AI Reasoning",
      "Electrical Fault Classification",
    ],
    pdfUrl: "/documents/pdf2.pdf"
  },

  {
    id: "paper_3",
    title: "Comprehensive Review of Induction Motor Fault Diagnosis Techniques with Focus on Power Factor and THD",
    category: "Review & System Design",
    focus: ["Power Factor", "THD", "Condition Monitoring", "Industrial Fault Systems"],
    description:
      "This review paper summarizes multiple industrial fault detection techniques and highlights the importance of power factor degradation and harmonic distortion in motor health monitoring systems. It supports system-level justification for multi-parameter monitoring.",
    usedFor: [
      "Power Factor Analysis",
      "THD Justification",
      "System-Level Fault Modeling",
      "Industrial Benchmarking",
    ],
    pdfUrl: "/documents/pdf3.pdf"
  },
];

export default RAG_PAPERS;