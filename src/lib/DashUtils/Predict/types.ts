import * as ort from "onnxruntime-web";

export type ONNXTensor = ort.Tensor;

export interface PredictionResult {
    prediction: string;
    confidence: number;
    allProbabilities: Record<string, number>;
}