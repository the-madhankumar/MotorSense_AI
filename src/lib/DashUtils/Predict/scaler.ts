type StandardScaler = {
    mean: number[];
    scale: number[];
};

let scaler: StandardScaler | null = null;

async function loadScaler(): Promise<StandardScaler> {
    if (scaler) {
        return scaler;
    }

    const response = await fetch("/models/scaler.json");

    if (!response.ok) {
        throw new Error(
            `Failed to load scaler.json (${response.status} ${response.statusText})`
        );
    }

    const data = (await response.json()) as StandardScaler;

    if (
        !Array.isArray(data.mean) ||
        !Array.isArray(data.scale) ||
        data.mean.length !== data.scale.length
    ) {
        throw new Error("Invalid scaler.json format.");
    }

    scaler = data;

    console.log("✅ StandardScaler loaded.");

    return scaler;
}

export async function scaleInput(input: number[]): Promise<number[]> {
    const { mean, scale } = await loadScaler();

    if (input.length !== mean.length) {
        throw new Error(
            `Scaler expects ${mean.length} features but received ${input.length}.`
        );
    }

    return input.map((value, index) => {
        const divisor = scale[index];

        // Prevent divide-by-zero just in case
        if (divisor === 0) {
            return 0;
        }

        return (value - mean[index]) / divisor;
    });
}