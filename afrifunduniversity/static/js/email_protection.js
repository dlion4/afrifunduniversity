    const cachedContentKey = 'cachedEmailProtectionContent';
    const emailProtectionUrl = '/email-protection/';  // URL of the Django view

    // Check if the content is cached
    const cachedContent = localStorage.getItem(cachedContentKey);

    if (cachedContent) {
        // Use cached content if available
        document.querySelector('.footer-content').innerHTML = cachedContent;
    } else {
        // Load the content using AJAX
        fetch(emailProtectionUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  // Expecting a JSON response
            })
            .then(data => {
                // Inject the HTML content into the target element
                document.querySelector('.footer-content').innerHTML = data.html;
                
                // Cache the content in localStorage
                localStorage.setItem(cachedContentKey, data.html);
            })
            .catch(error => {
                console.error('Error fetching content:', error);
            });
    }
