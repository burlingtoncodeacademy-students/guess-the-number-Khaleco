const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
// const {reverse} = require("./reverse_game.js");

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

async function start() {
  let playAgain = "y";
  var cheated = false;
  while (playAgain.toLowerCase() == "y"){
    cheated = false;
    console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");
    let lowestNum = await ask("What is the lowest number in the range? ");
    let highestNum = await ask("What is the highest number in the range? ");
    let secretNumber = await ask("What is your secret number?\nWhole numbers only.\nI won't peek, I promise...\n");
    console.log('You entered: ' + secretNumber);

    lowestNum = Number(lowestNum);
    highestNum = Number(highestNum);
    secretNumber = Number(secretNumber);
    
    if (secretNumber > highestNum || secretNumber < lowestNum){
      console.log("No fair! Your trying to Cheat!");
      cheated = true;
    } else if (isNaN(secretNumber)) {
      console.log("That's not a number.");
      cheated = true;
    } else {
      console.log("Lets begin!");
      let numGuessed = "n";
      var tries = 1;
      tries = 1;
      while (numGuessed.toLowerCase() != "y" && cheated == false) {
        numGuessed = await ask(`Is your Number ${Math.floor((highestNum + lowestNum) / 2)}? (Y/N)? `);
        if (numGuessed.toLowerCase() == "n") {
          tries++;
          if (prevGuess != (Math.floor((highestNum + lowestNum) / 2))){
            var prevGuess = 0;
            let isNum = await ask("Is your Number higher or lower? (H/L)? ");
            if (isNum.toLowerCase() == "h"){
              lowestNum = Math.floor((highestNum + lowestNum) / 2);
              prevGuess = lowestNum;
            } else if (isNum.toLowerCase() == "l") {
              highestNum = Math.floor((highestNum + lowestNum) / 2);
              prevGuess = highestNum;
            }
          } else {
            console.log(`Your number can only be ${prevGuess} baised on what you told me. You have lied, thou art a villan and cur.`);
            numGuessed = "y";
            cheated = true;
          }
        } else if (cheated == false && numGuessed.toLowerCase() == "y"){
          console.log(`Hurray, I got it in ${tries} tries! Your number was ${Math.floor((highestNum + lowestNum) / 2)}.`);
        }
      }
    }

    playAgain = await ask("Would you like to play again? (Y/N) ");
}
process.exit();
}

start();

// ? Bugged (displays double input in terminal but reads singular has to do with readline running in both)
// async function games(){
// let game = await ask("Would you like to play regular or reverse? ");
//   if (game.toLowerCase() == "regular") {
//     start();
//   } else if (game.toLowerCase() == "reverse"){
//     reverse();
//   } else {
//     process.exit();
//   }
// }

// games();