fetch("/api/ss/help/contact-block/")
    .then(response => response.json())
    .then(data => {
        // Create a new script element
        var script = document.createElement('script');

        // Add the JavaScript code as the content of the new script
        script.innerHTML = `
            Theme.contactBlocks = {
              blocks: ${JSON.stringify(data.blocks)},
              images: ${JSON.stringify(data.images)},
              numberColumns: ${data.numberColumns},
              color: "${data.color}"
            };
            console.log(Theme.contactBlocks);
          `;

        // Append the script to the body
        document.body.appendChild(script);
    });