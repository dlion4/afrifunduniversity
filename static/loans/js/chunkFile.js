const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'main.js'); // Adjust to your file
const maxLines = 6000; // Maximum lines per chunk

function chunkFile(content, maxLines) {
    const lines = content.split('\n');
    const chunks = [];
    let currentChunk = [];
    let lineCount = 0;

    lines.forEach(line => {
        currentChunk.push(line);
        lineCount++;

        // Check if we reached the maximum lines
        if (lineCount >= maxLines) {
            // Look for the last complete function or class ending
            const lastLine = currentChunk.join('\n');
            const functionEndIndex = lastLine.lastIndexOf('}');
            if (functionEndIndex !== -1) {
                // Split before the last function or class ending
                const chunk = currentChunk.join('\n').slice(0, functionEndIndex + 1);
                chunks.push(chunk);

                // Prepare for the next chunk
                currentChunk = [lastLine.slice(functionEndIndex + 1)];
                lineCount = 1; // Reset line count
            } else {
                // If we didn't find a closing brace, just push the chunk as is
                chunks.push(currentChunk.join('\n'));
                currentChunk = [];
                lineCount = 0;
            }
        }
    });

    // Push any remaining lines as a final chunk
    if (currentChunk.length > 0) {
        chunks.push(currentChunk.join('\n'));
    }

    return chunks;
}

fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const chunks = chunkFile(data, maxLines);

    chunks.forEach((chunk, index) => {
        const outputFilePath = path.join(__dirname, `chunk_${index + 1}.js`);
        fs.writeFile(outputFilePath, chunk, (err) => {
            if (err) {
                console.error('Error writing chunk:', err);
            } else {
                console.log(`Created: ${outputFilePath}`);
            }
        });
    });
});
