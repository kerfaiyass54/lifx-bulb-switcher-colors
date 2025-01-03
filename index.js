const express = require('express');
const Lifx = require('node-lifx-lan');
const path = require('path');

const app = express();
const port = 3000;

// Define an array of colors to cycle through
const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'cyan'];
let currentIndex = 0;
let interval;

// Function to change the color and update the index
function changeColor() {
  Lifx.turnOnBroadcast({
    color: { css: colors[currentIndex] }
  })
    .then(() => {
      console.log(`Changed color to ${colors[currentIndex]}`);
      currentIndex = (currentIndex + 1) % colors.length;
    })
    .catch((error) => {
      console.error(error);
    });
}

// Initially, change the color
changeColor();

// Serve the index.html file from the same directory as index.js
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/start-color-cycling', (req, res) => {
  // Start color cycling
  if (!interval) {
    interval = setInterval(changeColor, 2000);
    res.send('Color cycling started.');
  } else {
    res.send('Color cycling is already running.');
  }
});

app.get('/stop-color-cycling', (req, res) => {
  // Stop color cycling
  if (interval) {
    clearInterval(interval);
    interval = null;
    res.send('Color cycling stopped.');
  } else {
    res.send('Color cycling is not running.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
