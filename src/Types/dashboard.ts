export type kpiType = {
  name: string;
  value: string | number;
  unit?: string;
  trend?: {
    direction: "up" | "down" | "neutral";
    label: string;
  };
  statusVariant?: "success" | "warning" | "danger" | "info";
};

export interface MetricProps {
  name: string;
  value: string | number;
  percentage: number; 
  variant?: "success" | "warning" | "danger" | "info";
}

export type DashboardDividerProps = {
  title: string;
};

export type SysteStatusType = {
  name: string;
  connect: boolean;
  time?: number
}


export interface DataPoint {
  time: string
  voltage: number
  current: number
  [key: string]: string | number
}

export interface ElectricalChartProps {
  title?: string
  data: DataPoint[]
}