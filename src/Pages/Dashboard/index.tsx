import { ElectricalChart } from "@/components/Charts/Line";
import DashboardDivider from "@/components/Dashboard/divider";
import KPIWidget from "@/components/Dashboard/kpi_component";
import MetricWidget from "@/components/Dashboard/metric_component";
import SystemStatus from "@/components/Dashboard/system_status";
import { KPI, METRICS, mockElectricalData, SYSTEM_STATUS } from "@/Context/dashboard_context";
import { kpiType, MetricProps, SysteStatusType } from "@/Types/dashboard";

const Dashboard = () => {
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