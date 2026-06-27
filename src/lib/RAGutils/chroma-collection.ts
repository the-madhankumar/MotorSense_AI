import { ChromaClient } from "chromadb";
import { DefaultEmbeddingFunction } from "@chroma-core/default-embed";

const client = new ChromaClient();
const defaultEF = new DefaultEmbeddingFunction();

const getCollection = async (collectionName: string) => {
    const collection = await client.getOrCreateCollection({
        name: collectionName,
        embeddingFunction: defaultEF
    });

    return collection;
}

export default getCollection;