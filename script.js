//Select the game div element
const gameContainer = document.getElementById("game");
// Variables for holding the presently clicked cards, initialized to null
// Javascript for Web Developers states: "When defining a variable that is meant to later hold an object, it is advisable to initialize the variable to null as opposed to anything else. That way, you can explicitly check for the value null to determine if the variable has been filled with an object reference at a later time."
var clickedCard1 = null;
var clickedCard2 = null;
//counter for number of cards clicked
var cardsClickedCount = 0;

//how many pairs have been matched
var matchedPairs = 0;

// This is our array of 5 colors
// where each color appears twice
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// Fisher Yates array  shuffle function
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// Shuffle the colors
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function flipFirstCard(event){
  //set color equal to class name
  
  //assign current card to clickedCard1
  clickedCard1 = event.target;
  //Change cardsClickedCount to 1
  cardsClickedCount = 1;
  //change color of card to match it's class
  cardColor = clickedCard1.getAttribute("class");
  console.log(cardColor, cardsClickedCount);
  clickedCard1.style.backgroundColor = cardColor;
}
function flipSecondCard(event){
  // like flipFirstCard function we do this:
  clickedCard2 = event.target;
  //Change cardsClickedCount
  cardsClickedCount = 2;
  //change color of card to match it's class
  cardColor = clickedCard2.getAttribute("class");
  console.log(cardColor, cardsClickedCount);
  clickedCard2.style.backgroundColor = cardColor;
  //Check for a match
  if (clickedCard2.getAttribute("class") == clickedCard1.getAttribute("class")) {
  //if there is a match, skip turning the cards back over and set the cardsClickedCount to 0
  matchedPairs = matchedPairs + 1;

    console.log(matchedPairs);
      //if there are 5 matches announce the game is over
      if (matchedPairs == 5) {
        setTimeout(function(){
          alert("Good Job! Reload the page to play again!");
        }, 1000);
      }
    cardsClickedCount = 0;
    //Also remove the event listener from the clicked cards
    clickedCard1.removeEventListener("click", handleCardClick);
    clickedCard2.removeEventListener("click", handleCardClick);
  }
  //if no match, wait one second. then turn cards over and set the cardsClickedCount to 0 and set the clickedCards 1 and 2 
  else {
    setTimeout(function(){
    clickedCard1.style.backgroundColor = '';
    clickedCard2.style.backgroundColor = '';
    clickedCard1 = null;
    clickedCard2 = null;
    cardsClickedCount = 0;
    }, 1000);

  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  //change color of clicked card to match class name if 0 or 1 cards have been clicked. if two
  //cards have been clicked return
  if (cardsClickedCount == 2) {
    return;
  }
  else if ((cardsClickedCount == 1) && (event.target != clickedCard1)) {
    flipSecondCard(event);
  }
  else if (cardsClickedCount == 0){
    flipFirstCard(event);
  }
  // else if (condition) {
    
  // }    
  

}

// when the DOM loads
createDivsForColors(shuffledColors);
