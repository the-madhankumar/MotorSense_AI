export interface RawTelemetry {
    voltage: number;
    current: number;
    powerFactor: number;
    thd: number;
    vibration: number;
}

export function evaluateTelemetry(raw: RawTelemetry) {
    // --- 1. VECTOR POWER CALCULATIONS ---
    // Apparent Power (S) = (V * I) / 1000
    const apparentPowerKVA = (raw.voltage * raw.current) / 1000;

    // Active Real Power (P) = S * PF
    const activePowerKW = apparentPowerKVA * raw.powerFactor;

    // Reactive Overhead Loss (Q) = sqrt(S^2 - P^2)
    const reactivePowerKVAR = Math.sqrt(
        Math.pow(apparentPowerKVA, 2) - Math.pow(activePowerKW, 2)
    ) || 0;

    // --- 2. LOAD DIAGNOSTICS ---
    // Joulean Thermal Stress Factor (Proportional to I^2)
    const thermalStressFactor = Math.pow(raw.current, 2) * 0.1;

    // Harmonic Current Leakage = Current * THD%
    const currentDistortionAmps = raw.current * (raw.thd / 100);

    // Voltage Configs
    const vStatus = raw.voltage > 240 || raw.voltage < 200
        ? { text: "text-red-400", bg: "bg-red-950/30", border: "border-red-900", label: "OUT OF BOUNDS" }
        : { text: "text-emerald-400", bg: "bg-emerald-950/20", border: "border-emerald-900", label: "STABLE DELTA" };

    // Current Configs
    const cStatus = raw.current > 8
        ? { text: "text-red-400", bg: "bg-red-950/30", border: "border-red-900", label: "OVERLOAD RISK" }
        : raw.current > 5
            ? { text: "text-amber-400", bg: "bg-amber-950/30", border: "border-amber-900", label: "HIGH DRAW" }
            : { text: "text-emerald-400", bg: "bg-emerald-950/20", border: "border-emerald-900", label: "DRAW BASELINE" };

    // Power Factor Configs
    const pfStatus = raw.powerFactor >= 0.95
        ? { text: "text-emerald-400", bg: "bg-emerald-950/20", border: "border-emerald-900", label: "OPTIMAL EFFICIENCY" }
        : raw.powerFactor >= 0.85
            ? { text: "text-blue-400", bg: "bg-blue-950/20", border: "border-blue-900", label: "NORMAL RUN" }
            : { text: "text-amber-400", bg: "bg-amber-950/30", border: "border-amber-900", label: "POOR EFFICIENCY" };

    // THD Configs
    const thdStatus = raw.thd > 10
        ? { text: "text-red-400", bg: "bg-red-950/30", border: "border-red-900", label: "CRITICAL DISTORTION" }
        : raw.thd > 5
            ? { text: "text-amber-400", bg: "bg-amber-950/30", border: "border-amber-900", label: "MODERATE HARMONICS" }
            : { text: "text-emerald-400", bg: "bg-emerald-950/20", border: "border-emerald-900", label: "CLEAN WAVE" };

    // Vibration Configs
    const vibStatus = raw.vibration > 4.0
        ? { text: "text-red-400", bg: "bg-red-950/30", border: "border-red-900", label: "CRITICAL VIBE" }
        : raw.vibration > 1.5
            ? { text: "text-amber-400", bg: "bg-amber-950/30", border: "border-amber-900", label: "HIGH DISPLACEMENT" }
            : { text: "text-neutral-400", bg: "bg-neutral-900/40", border: "border-neutral-800", label: "STATIC/RESTING" };

    let systemAssessment = "All structural bus parameters report normal within expected operational thresholds.";
    let systemStatusColor = "text-emerald-400";

    if (raw.thd > 10) {
        systemAssessment = "High harmonic distortion levels detected inside grid lines. Indication of capacitor bank degradation or inverter feedback tracking anomalies.";
        systemStatusColor = "text-red-400";
    } else if (raw.powerFactor < 0.85) {
        systemAssessment = "Low operational Power Factor detected. High reactive payload overhead present. Verify induction motor loads and tuning steps.";
        systemStatusColor = "text-amber-400";
    } else if (raw.vibration > 4.0) {
        systemAssessment = "Mechanical harmonic resonance anomaly. Check physical rotor/stator alignment tolerances immediately.";
        systemStatusColor = "text-red-400";
    }

    return {
        apparentPowerKVA,
        activePowerKW,
        reactivePowerKVAR,
        thermalStressFactor,
        currentDistortionAmps,
        styles: { vStatus, cStatus, pfStatus, thdStatus, vibStatus },
        systemAssessment,
        systemStatusColor
    };
}