import { ElectricalChart } from "@/components/Charts/Line";
import DashboardDivider from "@/components/Dashboard/divider";
import KPIWidget from "@/components/Dashboard/kpi_component";
import MetricWidget from "@/components/Dashboard/metric_component";
import SystemStatus from "@/components/Dashboard/system_status";
import { KPI, mockElectricalData, SYSTEM_STATUS, useMotorStore } from "@/Context/dashboard_context";
import { subscribeToMachineData } from "@/lib/firebaseUtils";
import { kpiType, LiveData, MetricProps, SysteStatusType } from "@/Types/dashboard";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const raw = useMotorStore((state) => state.raw);
    const setRaw = useMotorStore((state) => state.setRaw);

    useEffect(() => {
        const unsubscribe = subscribeToMachineData((latestData) => {
            setRaw(latestData);
        });

        return () => unsubscribe();
    }, [setRaw]);

    const METRICS: MetricProps[] = [
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
            value: raw.powerFactor.toFixed(2),
            percentage: raw.powerFactor * 100,
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
    ];

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

                <div className="gap-6 flex flex-row">
                    {KPI.map((element: kpiType, index) => (
                        <KPIWidget key={index} kpi={element} />
                    ))}
                </div>

                <DashboardDivider title="METRICS OVERVIEW" />
                <div className="flex flex-row gap-3">
                    <div className="rounded-2xl flex flex-col gap-3 w-120 max-h-100 overflow-y-auto scrollbar-none border border-neutral-800 bg-linear-to-br from-neutral-900 via-neutral-900 to-neutral-950">
                        {METRICS.map((element: MetricProps, index) => (
                            <MetricWidget
                                key={index}
                                name={element.name}
                                value={element.value}
                                percentage={element.percentage}
                                variant={element.variant}
                            />
                        ))}
                    </div>
                    <ElectricalChart
                        title="Live Transformer Telemetry"
                        data={mockElectricalData}
                    />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;