import * as ort from "onnxruntime-web";

let scaler: ort.InferenceSession | null = null;
let classifier: ort.InferenceSession | null = null;
let labelEncoder: ort.InferenceSession | null = null;

export async function getScalerSession() {
    if (!scaler) {
        scaler = await ort.InferenceSession.create("/models/scaler.onnx");
    }

    return scaler;
}

export async function getClassifierSession() {
    if (!classifier) {
        classifier = await ort.InferenceSession.create("/models/model.onnx");
    }

    return classifier;
}

// export async function getLabelSession() {
//     if (!labelEncoder) {
//         labelEncoder = await ort.InferenceSession.create("/models/fault_label_encoder.onnx");
//     }

//     return labelEncoder;
// }