export type Severity = "critical" | "warning" | "info";

export type Status = "New" | "Acknowledged" | "In Progress" | "Resolved";

export interface Alert {
  id: string;
  title: string;
  severity: Severity;
  category: "Mechanical" | "Electrical" | "AI" | "System";
  time: string;
  status: Status;
  confidence: number;
  summary: string;
  action: string;
  evidence: { label: string; value: string }[];
}