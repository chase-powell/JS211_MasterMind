'use strict';

const assert = require('assert');
const readline = require('readline');
const { checkServerIdentity } = require('tls');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let correctLetters = 0
  let correctLetterLocations = 0
  let solutionArray = solution.split('')
  let guessArray = guess.split('')
  guessArray.forEach((item, index) => {
    if (item === solutionArray[index]){
      correctLetterLocations += 1 
      solutionArray[index] = null
      guessArray[index] = null
    }
  })
  guessArray.forEach((item, index) => {
    if (item === null){
      let findIndex = solutionArray.indexOf(item)
      if (findIndex > -1){
        correctLetters += 1 
        solutionArray[findIndex] = null
        guessArray[index] = null
      }
  }
  
  })
  return `${correctLetterLocations}-${correctLetters}`
}
const mastermind = (guess) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  let hint = generateHint(guess) 
    if (board.length >= 10) {
      return hint
    } 
  

  board.push(guess)
  if (guess === solution){
    return "You guessed it!"
  }else "Not quite!"
 

}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}