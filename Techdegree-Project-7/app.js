/////////////////////
// Global variables//
/////////////////////


const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGame = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const phraseContainer = document.querySelector('#phrase ul');
const heart = document.getElementsByTagName('img');
const phrases = ['houston we have a problem', 'may the force be with you',
 'life is like a box of chocolates', 'theres no place like home',
 'where were going we dont need roads', 'say hello to my little friend'];
let missed = 0;


///////////////////////
// Declared functions//
///////////////////////


// Generate random phrase
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return randomPhrase.split('');
}

// Display random phrase
function addPhraseToDisplay(arr) {
  const splitPhrase = getRandomPhraseAsArray(arr);
  // Cycle through to add all letters and spaces from the array
  for (let i = 0; i < splitPhrase.length; i += 1) {
    let li = document.createElement('li');
    li.textContent = splitPhrase[i];
    if (li.textContent == ' ') {
      li.classList.add('space');
    } else {
      li.classList.add('letter');
    }
    phraseContainer.appendChild(li);
  }
}

// Check if guessed letter is correct
function checkLetter(letter) {
  let letterBank = document.getElementsByClassName('letter');
  let guess = null;
  for (let i = 0; i < letterBank.length; i += 1) {
    let letterChoice = letterBank[i];
    if (letter == letterChoice.textContent) {
      letterChoice.classList.add('show');
      guess = letterChoice.textContent;
    }
  }
  return guess;
}

// Check if player has won
function checkWin() {
  const shownLetters = document.getElementsByClassName('show');
  const guessableLetters = document.getElementsByClassName('letter');
  if (shownLetters.length == guessableLetters.length) {
    overlay.style.display = 'initial';
    overlay.classList = 'win';
  } else if (missed >= 5) {
    overlay.style.display = 'initial';
    overlay.classList = 'lose';
    missed = 0;
  }
}

// Reset game
function resetGame() {
  missed = 0;
  for (let i = 0; i < heart.length; i += 1) {
    heart[i].src = 'images/liveHeart.png';
  }
  while (phraseContainer.hasChildNodes()) {
    phraseContainer.removeChild(phraseContainer.lastChild);
  }
  const button = document.getElementsByTagName('button');
  for (let i = 0; i < button.length; i += 1) {
    if (button[i].hasAttribute('disabled')) {
      button[i].removeAttribute('disabled');
    }
  }
}


///////////////////
//Event Listeners//
///////////////////


// Remove overlay when start button is clicked
startGame.addEventListener('click', () => {
  overlay.style.display = 'none';
  if (overlay.classList == 'win' || overlay.classList == 'lose') {
    resetGame();
  }
  addPhraseToDisplay(phrases);
});

// Listen for clicks on keyboard
qwerty.addEventListener('click', (e) => {
  e.target.disabled = true;
  let letterFound = checkLetter(e.target.textContent);
  if (letterFound == null) {
    missed += 1;
    // Remove live heart image and replace with lost heart
    for (let i = 0; i < heart.length; i += 1) {
      if (missed == i) {
        heart[i - 1].src = 'images/lostHeart.png';
      }
    }
  }
  checkWin();
});
