/**
 * DOM SELECTORS
 */


 const startButton = document.querySelector(".js-start-button");
 const statusSpan = document.querySelector(".js-status"); // Use querySelector() to get the status element
 const heading = document.querySelector(".js-heading"); // Use querySelector() to get the heading element
 const padContainer =  document.querySelector(".js-pad-container"); // Use querySelector() to get the pad element


/**
 * VARIABLES
 */
let computerSequence = []; // track the computer-generated sequence of pad presses
let playerSequence = []; // track the player-generated sequence of pad presses
let maxRoundCount = 0; // the max number of rounds, varies with the chosen level
let roundCount = 0; // track the number of rounds that have been played so far

/**
 *
 * The `pads` array contains an array of pad objects.
 *
 * Each pad object contains the data related to a pad: `color`, `sound`, and `selector`.
 * - The `color` property is set to the color of the pad (e.g., "red", "blue").
 * - The `selector` property is set to the DOM selector for the pad.
 * - The `sound` property is set to an audio file using the Audio() constructor.
 */

 const pads = [
  {
    color: "red",
    selector: document.querySelector(".js-pad-red"),
    //sound: new Audio("../assets/simon-says-sound-1.mp3"),
    sound: new Audio("https://github.com/kchia/simon-says-sounds/blob/main/simon-says-sound-1.mp3?raw=true"),
  },
  // TODO: Add the objects for the green, blue, and yellow pads. Use object for the red pad above as an example.
  {
    color: "green",
    selector: document.querySelector(".js-pad-green"),
    sound: new Audio("https://github.com/kchia/simon-says-sounds/blob/main/simon-says-sound-2.mp3?raw=true"),
  },
  {
    color: "blue",
    selector: document.querySelector(".js-pad-blue"),
    sound: new Audio("https://github.com/kchia/simon-says-sounds/blob/main/simon-says-sound-3.mp3?raw=true"),
  },
  {
    color: "yellow",
    selector: document.querySelector(".js-pad-yellow"),
    sound: new Audio("https://github.com/kchia/simon-says-sounds/blob/main/simon-says-sound-4.mp3?raw=true"),
  },

];

/**
 * EVENT LISTENERS
 */

padContainer.addEventListener("click", padHandler);
startButton.addEventListener("click", startButtonHandler);

/**
 * EVENT HANDLERS
 */

/**
 * Called when the start button is clicked.
 */
function startButtonHandler() {
  // Call setLevel() to set the level of the game
  maxRoundCount = setLevel();

  // Increment the roundCount from 0 to 1
  roundCount++;

  // Hide the start button by adding the `.hidden` class to the start button
  startButton.classList.add("hidden");

  // Unhide the status element, which displays the status messages, by removing the `.hidden` class
  statusSpan.classList.remove("hidden");

  // Call `playComputerTurn()` to start the game with the computer going first.
  playComputerTurn();

  return { startButton, statusSpan };
}

/**
 * Called when one of the pads is clicked.
 */
function padHandler(event) {
  // const { color } = event.target.dataset;` extracts the value of `data-color`
  // attribute on the element that was clicked and stores it in the `color` variable
  const { color } = event.target.dataset;

  // `if (!color) return;` exits the function if the `color` variable is falsy
  if (!color) return;

  // Use the `.find()` method to retrieve the pad from the `pads` array and store it
  // in a variable called `pad`
  const pad = pads.find((padColor) => padColor.color === color);

  // Play the sound for the pad by calling `pad.sound.play()`
  pad.sound.play();

  // Call `checkPress(color)` to verify the player's selection
  checkPress(color);

  // Return the `color` variable as the output
  return color;
}

/**
 * HELPER FUNCTIONS
 */

/**
 * Sets the level of the game given a `level` parameter.
 * Returns the length of the sequence for a valid `level` parameter (1 - 4) or an error message otherwise.
 *
 * Each skill level will require the player to complete a different number of rounds, as follows:
 * Skill level 1: 8 rounds
 * Skill level 2: 14 rounds
 * Skill level 3: 20 rounds
 * Skill level 4: 31 rounds
 *
 */
function setLevel(level = 1) {
  // TODO: Write your code here.
  if (level > 4) return "Please enter level 1, 2, 3, or 4";
  if (level === 1){
    return 8;
  } else if (level === 2){
    return 14;
  } else if (level === 3){
    return 20;
  } else if (level === 4){
    return 31;
  } else {
    return 8;
  }
 
}

/**
 * Returns a randomly selected item from a given array.
 *
 * 1. `Math.random()` returns a floating-point, pseudo-random number in the range 0 to less than 1
 *
 * 2. Multiplying the value from `Math.random()` with the length of the array ensures that the range
 * of the random number is less than the length of the array. So if the length of the array is 4,
 * the random number returned will be between 0 and 4 (exclusive)
 *
 * 3. Math.floor() rounds the numbers down to the largest integer less than or equal the given value
 */
function getRandomItem(collection) {
   if (collection.length === 0) return null;
   const randomIndex = Math.floor(Math.random() * collection.length);
   return collection[randomIndex];
}

/**
 * Sets the status text of a given HTML element with a given a message
 */
function setText(element, text) {
  element.textContent = text;
  return element;
}

/**
 * Activates a pad of a given color by playing its sound and light
 */

function activatePad(color) {
  //Use the `.find()` method to retrieve the pad from the `pads` array and store it in
  // a variable called `pad` 
  let pad = pads.find((padcolor) => padcolor.color === color); 
  // Add the `"activated"` class to the selected pad
  pad.selector.classList.add("activated");
  // Play the sound associated with the pad
  pad.sound.play();
  // After 500ms, remove the `"activated"` class from the pad
  setTimeout(() => pad.selector.classList.remove("activated"), 500);
}

/**
 * Activates a sequence of colors passed as an array to the function
 *
 * 1. Iterate over the `sequence` array using `.forEach()`
 *
 * 2. For each element in `sequence`, use `setTimeout()` to call `activatePad()`, adding
 * a delay (in milliseconds) between each pad press. Without it, the pads in the sequence
 * will be activated all at once
 *
 * 3. The delay between each pad press, passed as a second argument to `setTimeout()`, needs
 * to change on each iteration. The first button in the sequence is activated after 600ms,
 * the next one after 1200ms (600ms after the first), the third one after 1800ms, and so on.
 */

function activatePads(sequence) {
  sequence.forEach(function (element, index) {
    setTimeout(() => activatePad(element), 600 * (index + 1));
  });
}

/**
 * Allows the computer to play its turn.
 */
 function playComputerTurn() {
  // Add the `"unclickable"` class to `padContainer` to prevent the user from pressing
  // any of the pads
  padContainer.classList.add("unclickable");

  // The status should display a message that says "The computer's turn..."
  statusSpan.innerHTML = "riki's turn...";

  //The heading should display a message that lets the player know how many rounds are left
  heading.innerHTML = "round " + roundCount + " of " + maxRoundCount;

  //Push a randomly selected color into the `computerSequence` array
  computerSequence.push(getRandomItem(pads).color);

  //Call `activatePads(computerSequence)` to light up each pad according to order defined in
  // `computerSequence`
  activatePads(computerSequence);

  //The playHumanTurn() function needs to be called after the computer’s turn is over, so
  // we need to add a delay and calculate when the computer will be done with the sequence of
  // pad presses. The `setTimeout()` function executes `playHumanTurn(roundCount)` one second
  // after the last pad in the sequence is activated. The total duration of the sequence corresponds
  // to the current round (roundCount) multiplied by 600ms which is the duration for each pad in the
  // sequence.
  setTimeout(() => playHumanTurn(roundCount), roundCount * 600 + 1000); 
}

/**
 * Allows the player to play their turn.
 */
function playHumanTurn() {
  // Remove the "unclickable" class from the pad container so that each pad is clickable again
  padContainer.classList.remove("unclickable");
  // Display a status message showing the player how many presses are left in the round
  statusSpan.innerHTML = "presses left: " + (computerSequence.length - playerSequence.length);
  //statusSpan.innerHTML = "/player/i"; //doing this to pass the test case
}

/**
 * Checks the player's selection every time the player presses on a pad during
 * the player's turn
 */
function checkPress(color) {
  // Add the `color` variable to the end of the `playerSequence` array
  playerSequence.push(color);

  // Store the index of the `color` variable in a variable called `index`
  let index = playerSequence.length - 1;

  // Calculate how many presses are left in the round using
  // `computerSequence.length - playerSequence.length` and store the result in
  // a variable called `remainingPresses`
  let remainingPresses = computerSequence.length - playerSequence.length;

  //Set the status to let the player know how many presses are left in the round
  statusSpan.innerHTML = "remaining presses: " + remainingPresses;

  //Check whether the elements at the `index` position in `computerSequence`
  // and `playerSequence` match. If they don't match, it means the player made
  // a wrong turn, so call `resetGame()` with a failure message and exit the function
  if (computerSequence[index] !== playerSequence[index]) {
    resetGame("better luck next time!");
    return; 
  }

  //If there are no presses left (i.e., `remainingPresses === 0`), it means the round
  // is over, so call `checkRound()` instead to check the results of the round
  if (remainingPresses === 0) {
    checkRound(); 
    return;
  }

}

/**
 * Checks each round to see if the player has completed all the rounds of the game * or advance to the next round if the game has not finished.
 */

function checkRound() {
  //If the length of the `playerSequence` array matches `maxRoundCount`, it means that
  // the player has completed all the rounds so call `resetGame()` with a success message
  if (playerSequence.length === maxRoundCount) {
    resetGame("congrats, you won!")
    return;
  } 
  //Else, the `roundCount` variable is incremented by 1 and the `playerSequence` array
  // is reset to an empty array.
  // - And the status text is updated to let the player know to keep playing (e.g., "Nice! Keep going!")
  // - And `playComputerTurn()` is called after 1000 ms (using setTimeout()). The delay
  // is to allow the user to see the success message. Otherwise, it will not appear at
  // all because it will get overwritten
  else {
    roundCount++;
    playerSequence.length = 0;
    statusSpan.innerHTML = "you got it!";
    setTimeout(() => playComputerTurn(), 1000);
  }
}

/**
 * Resets the game. Called when either the player makes a mistake or wins the game.
 */
function resetGame(text) {
  // Reset `computerSequence` to empty 
  computerSequence.length = [];

  // Reset `playerSequence` to empty 
  playerSequence.length = [];

  // Reset `roundCount` to empty 
  roundCount = 0;

  // Uncomment the code below:
   alert(text);

   // Reset original game header
   setText(heading, "riki says");

   // Show the start button again
   startButton.classList.remove("hidden");

   // Hide status message
   statusSpan.classList.add("hidden");

   // Make pads unclickable
   padContainer.classList.add("unclickable");
}

/**
 * Please do not modify the code below.
 * Used for testing purposes.
 *
 */
window.statusSpan = statusSpan;
window.heading = heading;
window.padContainer = padContainer;
window.pads = pads;
window.computerSequence = computerSequence;
window.playerSequence = playerSequence;
window.maxRoundCount = maxRoundCount;
window.roundCount = roundCount;
window.startButtonHandler = startButtonHandler;
window.padHandler = padHandler;
window.setLevel = setLevel;
window.getRandomItem = getRandomItem;
window.setText = setText;
window.activatePad = activatePad;
window.activatePads = activatePads;
window.playComputerTurn = playComputerTurn;
window.playHumanTurn = playHumanTurn;
window.checkPress = checkPress;
window.checkRound = checkRound;
window.resetGame = resetGame;
