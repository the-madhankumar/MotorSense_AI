import { ElectricalChart } from "@/components/Charts/Line";
import DashboardDivider from "@/components/Dashboard/divider";
import KPIWidget from "@/components/Dashboard/kpi_component";
import MetricWidget from "@/components/Dashboard/metric_component";
import SystemStatus from "@/components/Dashboard/system_status";

import {
    mockElectricalData,
    SYSTEM_STATUS,
    useKPIStore,
    useMotorStore,
} from "@/Context/dashboard_context";
import { predictMotor } from "@/lib/DashUtils/Predict/predict";

import { subscribeToMachineData } from "@/lib/firebaseUtils";

import { kpiType, MetricProps } from "@/Types/dashboard";
import { useEffect, useMemo, useState } from "react";

const Dashboard = () => {
    const raw = useMotorStore((state) => state.raw);
    const setRaw = useMotorStore((state) => state.setRaw);

    const setSensor = useKPIStore((s) => s.setSensor);
    const sensor = useKPIStore((s) => s.sensor);

    const [prediction, setPrediction] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = subscribeToMachineData((latestData) => {
            if (!latestData) return;
            setRaw(latestData);
        });

        return () => unsubscribe();
    }, [setRaw]);

    useEffect(() => {
        if (!raw) return;

        setSensor({
            voltage: raw.voltage ?? 0,
            current: raw.current ?? 0,
            thd: raw.thd ?? 0,
            powerFactor: raw.powerFactor ?? 1,
            vibration: raw.vibration ?? 0,
        });
    }, [raw, setSensor]);

    useEffect(() => {
        if (!raw) return;

        const runModel = async () => {
            const input = [
                raw.voltage,
                raw.current,
                raw.powerFactor,
                raw.thd,
                raw.vibration,
            ];

            const result = await predictMotor(input);

            if (result) setPrediction(result);
        };

        runModel();
    }, [raw]);

    const METRICS: MetricProps[] = useMemo(() => {
        if (!raw) return [];

        return [
            {
                name: "Voltage",
                value: `${raw.voltage}V`,
                percentage: Math.min((raw.voltage / 300) * 100, 100),
                variant: "success",
            },
            {
                name: "Current",
                value: `${raw.current}A`,
                percentage: Math.min((raw.current / 10) * 100, 100),
                variant: "success",
            },
            {
                name: "Power Factor",
                value: raw.powerFactor?.toFixed(2) ?? "0.00",
                percentage: (raw.powerFactor ?? 0) * 100,
                variant: "success",
            },
            {
                name: "THD",
                value: `${raw.thd}%`,
                percentage: Math.min((raw.thd / 20) * 100, 100),
                variant: "info",
            },
            {
                name: "Vibration",
                value: `${raw.vibration} mm/s`,
                percentage: Math.min((raw.vibration / 5) * 100, 100),
                variant: "warning",
            },
            {
                name: "Health Score",
                value: prediction
                    ? `${(prediction.confidence * 100).toFixed(1)}%`
                    : "Calculating...",
                percentage: prediction ? prediction.confidence * 100 : 0,
                variant:
                    prediction?.prediction === "healthy" ? "success" : "danger",
            },
            {
                name: "Fault Status",
                value: prediction?.prediction ?? "Analyzing...",
                percentage: prediction
                    ? Math.max(
                        ...(Object.values(prediction.allProbabilities || {}) as number[])
                    ) * 100
                    : 0,
                variant:
                    prediction?.prediction === "healthy" ? "success" : "warning",
            },
        ];
    }, [raw, prediction]);

    const kpis = useMemo(() => {
        if (!sensor) return [];
        return useKPIStore.getState().kpis();
    }, [sensor]);

    return (
        <div className="min-h-screen bg-gray-700 p-6 font-mono">
            <div className="max-w-7xl space-y-8">
                <div className="flex items-center gap-6">
                    <div className="flex-1">
                        <DashboardDivider title="KPI OVERVIEW" />
                    </div>

                    <div className="flex items-center gap-3">
                        {SYSTEM_STATUS.map((element, index) => (
                            <SystemStatus key={index} status={element} />
                        ))}
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-6">
                    {kpis.map((element: kpiType, index: number) => (
                        <KPIWidget key={index} kpi={element} />
                    ))}
                </div>

                <DashboardDivider title="METRICS OVERVIEW" />

                <div className="flex flex-row gap-3 justify-between">
                    <div className="rounded-2xl flex flex-col gap-3 w-120 max-h-100 border border-neutral-800 bg-linear-to-br from-neutral-900 via-neutral-900 to-neutral-950 overflow-y-auto scrollbar-none">
                        {METRICS.map((element, index) => (
                            <MetricWidget key={index} {...element} />
                        ))}
                    </div>

                    <ElectricalChart
                        title="Live Transformer Telemetry"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;