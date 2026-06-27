let cachedScaler: any = null;

export async function loadScaler() {
    if (cachedScaler) return cachedScaler;

    const res = await fetch("/models/scaler.json");
    cachedScaler = await res.json();
    return cachedScaler;
}