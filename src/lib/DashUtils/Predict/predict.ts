import { classify } from "./classifier";
import { LABELS } from "./label";
import { scaleInput } from "./scaler";
import { PredictionResult } from "./types";

export async function predictMotor(
  input: number[]
): Promise<PredictionResult> {
  try {
    console.log(LABELS);
    const scaledInput = await scaleInput(input);

    const labelTensor = await classify(scaledInput);

    const classIndex = Number(labelTensor.data[0]);

    const prediction =
      LABELS[classIndex] ?? `unknown_${classIndex}`;

    return {
      prediction,
      confidence: 1, 
      allProbabilities: {
        [prediction]: 1,
      },
    };
  } catch (error) {
    console.error("Prediction Error:", error);

    return {
      prediction: "unknown",
      confidence: 0,
      allProbabilities: {},
    };
  }
}