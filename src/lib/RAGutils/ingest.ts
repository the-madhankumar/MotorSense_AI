import * as fs from 'fs/promises';
import * as path from 'path';
import { pipeline } from '@xenova/transformers';

const processAndStore = async () => {
    try {
        console.log("[INFO] Loading free local embedding model (all-MiniLM-L6-v2)...");
        const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

        // 1. Read your text files
        console.log("[INFO] Reading text files...");
        const [text1, text2, text3] = await Promise.all([
            fs.readFile('./data/pdf1.txt', 'utf-8').catch(() => ""),
            fs.readFile('./data/pdf2.txt', 'utf-8').catch(() => ""),
            fs.readFile('./data/pdf3.txt', 'utf-8').catch(() => "")
        ]);

        const combinedText = `${text1}\n${text2}\n${text3}`;
        const documents = combinedText
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean);

        if (documents.length === 0) {
            console.log("[WARN] No text found in documents.");
            return;
        }

        console.log(`[INFO] Creating high-precision embeddings for ${documents.length} snippets...`);
        const vectorDatabase: Array<{ text: string; vector: number[] }> = [];

        // 2. Generate and structure text matrices properly
        for (let i = 0; i < documents.length; i++) {
            const docText = documents[i];
            
            // Extract features with explicit pooling and formatting
            const output = await extractor(docText, { pooling: 'mean', normalize: true });
            
            // Convert native float array to standard JS number list
            const vector = output.tolist()[0]; 

            vectorDatabase.push({
                text: docText,
                vector: vector
            });

            if ((i + 1) % 50 === 0) {
                console.log(`[PROGRESS] Embedded ${i + 1}/${documents.length} items...`);
            }
        }

        // 3. Write data to your local folder database file
        const dbDir = path.join(process.cwd(), 'data');
        await fs.mkdir(dbDir, { recursive: true });
        const dbPath = path.join(dbDir, 'local_vector_db.json');
        
        await fs.writeFile(dbPath, JSON.stringify(vectorDatabase), 'utf-8');
        console.log(`\n[SUCCESS] Database built perfectly at: ${dbPath}`);

    } catch (error) {
        console.error("[ERROR] Ingestion failed:", error);
    }
};

processAndStore();