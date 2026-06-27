import * as fs from 'fs/promises';
import * as path from 'path';

const checkData = async () => {
    const dbPath = path.join(process.cwd(), 'data', 'local_vector_db.json');
    const rawData = await fs.readFile(dbPath, 'utf-8');
    const database: Array<{ text: string }> = JSON.parse(rawData);

    console.log(`Total snippets stored: ${database.length}`);
    
    // Print the first 5 rows to see what kind of text we actually have
    console.log("\n--- First 5 snippets in your database ---");
    database.slice(0, 5).forEach((item, i) => console.log(`[${i}]: ${item.text}`));

    // Search for keywords that actually exist in your text
    console.log("\n--- Testing a search for 'motor' ---");
    const matches = database.filter(item => item.text.toLowerCase().includes('motor'));
    matches.slice(0, 3).forEach(item => console.log(`Found: ${item.text}`));
};

checkData();