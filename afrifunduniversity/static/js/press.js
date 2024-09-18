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

fetch("/api/articles-info/").then(response => response.json()).then(data => {
  try {
    window.articlesInfo = data;
    console.log(window.articlesInfo);
  } catch (error) {
    console.log(error);
  }
}).catch(error => console.error("Error fetching data:", error));
