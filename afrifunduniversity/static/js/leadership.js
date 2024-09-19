fetch("/api/leadership/")
    .then(response => response.json())
    .then(data => {
        try {
            // Transform the fetched data
            const transformedData = transformLeadershipData(data);

            // Create a script element
            const scriptElement = document.createElement('script');
            scriptElement.type = 'text/javascript';

            // Set the script content dynamically
            scriptElement.textContent = `window.leadership = ${JSON.stringify(transformedData)};`;

            // Find the target section
            const targetSection = document.querySelector('section.leadership-grid-section');
            if (targetSection) {
                targetSection.parentNode.insertBefore(scriptElement, targetSection);
            } else {
                console.error('Target section not found');
            }
        } catch (error) {
            console.error("Error processing data:", error);
        }
    })
    .catch(error => console.error("Error fetching data:", error));

// Function to transform leadership data
function transformLeadershipData(data) {
    return data.map(item => {
        // Assuming the image ID (13575) is derived from the URL somehow
        // You will need to provide a way to map image URLs to IDs, if that's required
        const imageId = 13575; // Replace with actual logic if needed

        // Combine paragraphs into one
        const paragraphs = item.paragraphs.map(p => ({ paragraph: p.paragraph }));

        return {
            image: imageId,
            content: {
                name: item.name,
                job_title: item.job_title,
                paragraphs: paragraphs
            }
        };
    });
}