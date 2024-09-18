let videoLinks = [];
let currentIndex = 0;
const iframe = document.querySelector(".one-column-video__yt");

// Fetch video links from the Django backend
async function fetchVideoLinks() {
  try {
    const response = await fetch("/api/video-links/"); // Adjust the URL to your Django endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch video links");
    }
    videoLinks = await response.json();
  } catch (error) {
    console.error("Error fetching video links:", error);
  }
}

// Function to change the iframe src
function changeIframeSrc() {
  if (videoLinks.length === 0) 
    return;
  iframe.src = videoLinks[currentIndex]; // Set the iframe src to the current video link
  currentIndex = (currentIndex + 1) % videoLinks.length; // Move to the next video or loop back to the first
}

// Call fetchVideoLinks and start changing the iframe src every 30 seconds
(async function startAlternatingVideos() {
  await fetchVideoLinks(); // Fetch the video links first
  changeIframeSrc(); // Set the first video
  setInterval(changeIframeSrc, 1200000); // Change the iframe src every 30 seconds
})();
