import * as ort from "onnxruntime-web";

let session: ort.InferenceSession | null = null;

export interface PredictionResult {
    prediction: string;
    confidence: number;
    allProbabilities: Record<string, number>;
}

const LABELS = [
    "healthy",
    "bearing_fault",
    "rotor_fault",
    "stator_fault",
    "misalignment",
];

export async function predictMotor(
    input: number[]
): Promise<PredictionResult> {
    try {
        if (!session) {
            session = await ort.InferenceSession.create("/models/model.onnx");

            console.log("✅ ONNX model loaded.");
            console.log("Inputs:", session.inputNames);
            console.log("Outputs:", session.outputNames);
            console.log("Output Metadata:", session.outputMetadata);
        }

        if (input.length !== 5) {
            throw new Error(`Expected 5 inputs but received ${input.length}.`);
        }

        const tensor = new ort.Tensor(
            "float32",
            new Float32Array(input),
            [1, 5]
        );

        // Request ONLY the tensor output
        const results = await session.run(
            {
                [session.inputNames[0]]: tensor,
            },
            [session.outputNames[0]]
        );

        const labelTensor = results[session.outputNames[0]];

        if (!labelTensor) {
            throw new Error("Model did not return a label tensor.");
        }

        const classIndex = Number(labelTensor.data[0]);
        console.log("Predicted Index:", classIndex);
        console.log("Predicted Label:", LABELS[classIndex]);

        console.log({
            prediction: LABELS[classIndex] ?? `class_${classIndex}`,
            confidence: 1,
            allProbabilities: {
                [LABELS[classIndex] ?? `class_${classIndex}`]: 1,
            },
        })

        return {
            prediction: LABELS[classIndex] ?? `class_${classIndex}`,
            confidence: 1,
            allProbabilities: {
                [LABELS[classIndex] ?? `class_${classIndex}`]: 1,
            },
        };
    } catch (error) {
        console.error("ONNX Runtime Error:", error);

        return {
            prediction: "unknown",
            confidence: 0,
            allProbabilities: {},
        };
    }
}