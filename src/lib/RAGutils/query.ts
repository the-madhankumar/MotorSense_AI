function cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export const queryLocalVectorDb = async (promptText: string, maxResults: number = 5): Promise<string> => {
    try {
        // 1. Fetch your local database file from the public folder
        const response = await fetch('/data/local_vector_db.json');
        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status} - File not found at /public/data/local_vector_db.json`);
        }
        const database: Array<{ text: string; vector: number[] }> = await response.json();

        // 2. Fetch directly from the OpenRouter REST Endpoint
        // If testing on the client, use your NEXT_PUBLIC_ key prefix, otherwise keep it server-side.
        const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || ""; 
        
        const openRouterResponse = await fetch("https://openrouter.ai/api/v1/embeddings", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "nvidia/llama-nemotron-embed-vl-1b-v2:free", // Dimensions: 1536
                input: promptText
            })
        });

        if (!openRouterResponse.ok) {
            const errorText = await openRouterResponse.text();
            throw new Error(`OpenRouter API connection failed: ${openRouterResponse.status} - ${errorText}`);
        }

        const resultData = await openRouterResponse.json();
        
        // 3. Extract the array vector with native type casting safety
        const queryVector = resultData?.data?.[0]?.embedding as number[] | undefined;

        if (!queryVector || !Array.isArray(queryVector)) {
            throw new Error("Failed to retrieve a valid numeric array sequence from OpenRouter payload structure.");
        }

        // 4. Mathematical matching comparison
        const scoredResults = database.map(item => ({
            text: item.text,
            score: cosineSimilarity(queryVector, item.vector)
        }));

        scoredResults.sort((a, b) => b.score - a.score);
        const topMatches = scoredResults.slice(0, maxResults);

        return topMatches.map(match => match.text).join('\n');

    } catch (error) {
        console.error("[ERROR] OpenRouter Vector Search Query failed:", error);
        return "";
    }
};