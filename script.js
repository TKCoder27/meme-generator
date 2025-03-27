// Array to store previously fetched meme URLs
let previousMemes = [];

document.getElementById("generateMemeButton").addEventListener("click", generateMeme);

function generateMeme() {
  // Fetch meme from the API
  fetch("https://meme-api.com/gimme")
    .then(response => response.json())
    .then(data => {
      const memeUrl = data.url;

      // Check if the meme has been previously fetched
      if (previousMemes.includes(memeUrl)) {
        console.log("Duplicate meme detected, fetching a new one...");
        // If it's a duplicate, call the function again recursively to get a new one
        generateMeme();
      } else {
        const memeImage = document.getElementById("memeImage");

        // Add the "newMeme" class to trigger the CSS animation
        memeImage.classList.remove('newMeme');
        void memeImage.offsetWidth; // Forces a reflow to reset the animation
        memeImage.classList.add('newMeme');

        // Set meme image source
        memeImage.src = memeUrl;

        // Add the current meme URL to the list of previous memes
        previousMemes.push(memeUrl);

        // Limit the length of previousMemes array (to prevent excessive memory usage)
        if (previousMemes.length > 20) {
          previousMemes.shift(); // Remove the oldest meme if we have more than 20 stored
        }

        // Trigger confetti celebration
        triggerConfetti();
      }
    })
    .catch(error => {
      console.error("Error fetching meme:", error);
    });
}

function triggerConfetti() {
  // Trigger confetti effect
  confetti({
    particleCount: 150, // number of confetti particles
    spread: 90,         // angle of spread
    origin: { y: 0.6 }, // where the confetti comes from
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffcc00'] // confetti colors
  });
}
