import { loadScaler } from "./loadScale";

export async function scaleInput(x: number[]) {
    const scaler = await loadScaler();

    return x.map((val, i) => {
        return (val - scaler.mean[i]) / scaler.scale[i];
    });
}