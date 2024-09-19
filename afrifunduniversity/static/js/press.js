// AJAX call to fetch press releases from the backend
fetch("/api/press/").then(response => response.json()).then(data => {
  // Assign the received data to window.allPressReleases
  try {
    // Format the data
    window.allPressReleases = data.map(pr => {
      // Create a new Date object from the date string
      const date = new Date(pr.date);

      // Define options for the desired date format
      const options = {
        year: "numeric",
        month: "short", // Short month name (e.g., 'Jun')
        day: "numeric" // Day of the month (e.g., '19')
      };

      // Format the date as 'Jun 19 2024'
      const formattedDate = date.toLocaleDateString("en-US", options);

      return {
        id: pr.id, title: pr.title, url: pr.url, // Assuming the URL format; adjust as needed
        date: formattedDate
      };
    });
  } catch (error) {
    console.log(error);
  }

  // You can now use window.allPressReleases in your frontend code
}).catch(error => console.error("Error fetching press releases:", error));

// Function to display press releases on the page (example)

// AJAX call to fetch press releases from the backend
fetch("/api/reviews/").then(response => response.json()).then(data => {
  // Assign the received data to window.allPressReleases
  try {
    // Format the data
    window.NP = data.map(pr => {
      // Create a new Date object from the date string
      const date = new Date(pr.date);
      // Define options for the desired date format
      const options = {
        year: "numeric",
        month: "short", // Short month name (e.g., 'Jun')
        day: "numeric" // Day of the month (e.g., '19')
      };

      // Format the date as 'Jun 19 2024'
      const formattedDate = date.toLocaleDateString("en-US", options);
      return {
        id: pr.id,
        review_title: pr.review_title,
        review_content: pr.review_content,
        review_score: pr.review_score,
        date: formattedDate,
        display_name: pr.display_name
      };
    });

    console.log("Reviews: ", window.NP);
  } catch (error) {
    console.log(error);
  }

  // You can now use window.allPressReleases in your frontend code
}).catch(error => console.error("Error fetching reviews:", error));
// Function to display press releases on the page (example)
fetch("/api/articles-info/")
  .then(response => response.json())
  .then(data => {
    try {
      // Store the data in the global window object
      window.articlesInfo = data;

      // Transform 'label' to 'name' in the category of each article
      window.articlesInfo.articles.forEach(article => {
        if (article.category && article.category.label) {
          // Rename 'label' to 'name'
          article.category.name = article.category.label;
          delete article.category.label; // Remove the old 'label' field
        }
      });

      // Log the transformed data
      console.log(window.articlesInfo);
    } catch (error) {
      console.log("Error processing data:", error);
    }
  })
  .catch(error => console.error("Error fetching data:", error));

// feting leaders
// Fetch leadership data from the API
fetch("/api/leadership/")
  .then(response => response.json())
  .then(data => {
    try {
      // Assuming data is an array of leadership objects
      window.leadership = data;

      // Get the container element
      const leadershipList = document.getElementById('leadership-list');

      // Clear any existing content
      leadershipList.innerHTML = '';

      // Iterate over the leadership data and create list items
      data.forEach(leader => {
        // Create a list item for each leader
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${leader.id}, Name: ${leader.name}`; // Customize as needed

        // Append the list item to the list
        leadershipList.appendChild(listItem);
      });
    } catch (error) {
      console.log("Error processing data:", error);
    }
  })
  .catch(error => console.error("Error fetching data:", error));


