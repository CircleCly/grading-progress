function displayEstimatedTime(remainingTime) {
  var targetElement = document.querySelector('.progressBar--caption.progressBar--caption-on-gray');
  if (targetElement) {
    var etaElement = document.getElementById('eta');
    if (!etaElement) {
      etaElement = document.createElement('div');
      etaElement.id = "eta";
      etaElement.classList.add(...targetElement.classList);
      targetElement.parentNode.insertBefore(etaElement, targetElement.nextSibling);
    }
    var secs = Math.round(remainingTime);
    etaElement.textContent = "Estimated " + Math.floor(secs / 60) + " minute(s) remaining to grade all submissions.";
  }
}

var gradingData = []; // Array to store grading progress data
var MAX_ENTRIES = 60; // Maximum number of entries to store

// Function to update the grading progress data
function updateGradingProgress(graded, total) {
  const timestamp = Date.now();

  // Add new entry to the grading data array
  gradingData.push({ timestamp, graded });

  // Ensure the array does not exceed the maximum number of entries
  if (gradingData.length > MAX_ENTRIES) {
    gradingData.shift(); // Remove the oldest entry from the beginning of the array
  }

  // Calculate grading speed based on the stored data
  calculateGradingSpeed(graded, total);

}

// Function to calculate grading speed based on the stored data
function calculateGradingSpeed(graded, total) {
  if (gradingData.length >= 2) {
    const latestEntry = gradingData[gradingData.length - 1];
    const oldestEntry = gradingData[0];
    const timeElapsed = (latestEntry.timestamp - oldestEntry.timestamp) / 1000; // Convert to seconds
    const submissionsGraded = latestEntry.graded - oldestEntry.graded;

    const gradingSpeed = submissionsGraded / timeElapsed;
    const submissionsLeft = total - graded;
    // Estimate the remaining time (seconds)
    const remainingTime = submissionsLeft / gradingSpeed;

    // Display the estimated time remaining to the user
    displayEstimatedTime(remainingTime);
  }
}

// Start the polling process
setInterval(() => {
  var divElement = document.querySelector('.progressBar--caption.progressBar--caption-on-gray');
  if (divElement) {
    var text = divElement.textContent;
    const matches = text.match(/(\d+)\s*of\s*(\d+)/i);
    if (matches) {
      var graded = parseInt(matches[1], 10);
      var total = parseInt(matches[2], 10);

      // Update the grading progress
      updateGradingProgress(graded, total);
    }
  }
}, 10000); // Repeat every 1 second.