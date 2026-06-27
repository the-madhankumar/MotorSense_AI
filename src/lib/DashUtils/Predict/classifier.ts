import * as ort from "onnxruntime-web";
import { getClassifierSession } from "./session";

export async function classify(features: number[]) {
    const session = await getClassifierSession();

    const tensor = new ort.Tensor(
        "float32",
        Float32Array.from(features),
        [1, features.length]
    );

    console.log("Outputs:", session.outputNames);
    console.log("Metadata:", session.outputMetadata);

    const results = await session.run(
        {
            [session.inputNames[0]]: tensor,
        },
        [session.outputNames[0]] // Request only the label output
    );

    return results[session.outputNames[0]];
}