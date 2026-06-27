export const labels = [
    "healthy",
    "bearing_fault",
    "stator_fault",
    "overload",
    "misalignment",
];

export function decodeLabel(index: number) {
    return labels[index];
}