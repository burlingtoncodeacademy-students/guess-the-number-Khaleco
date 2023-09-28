// const readline = require('readline');
// const rl = readline.createInterface(process.stdin, process.stdout);
const {reverse, rl, ask} = require('./reverse_game.js')

// function ask(questionText) {
//   return new Promise((resolve, reject) => {
//     rl.question(questionText, resolve);
//   });
// }

async function start() {
  let playAgain = "y";
  var cheated = false;
  // while loop of the game until playAgain is set to !"y"
  while (playAgain.toLowerCase().trim() == "y"){
    cheated = false;
    // Asks for the range and secretNumber
    console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");
    let lowestNum = await ask("What is the lowest number in the range? ");
    let highestNum = await ask("What is the highest number in the range? ");
    let secretNumber = await ask("What is your secret number?\nWhole numbers only.\nI won't peek, I promise...\n");
    console.log('You entered: ' + secretNumber);

    lowestNum = Number(lowestNum.trim());
    highestNum = Number(highestNum.trim());
    secretNumber = Number(secretNumber.trim());
    
    // Checks weither or not the player is cheating with setting range and secretNumber
    if (secretNumber > highestNum || secretNumber < lowestNum){
      console.log("No fair! Your trying to Cheat!");
      cheated = true;
    } else if (isNaN(secretNumber)) {
      console.log("That's not a number.");
      cheated = true;
    } else {
      // game begins
      console.log("Lets begin!");
      let numGuessed = "n";
      var tries = 1;
      tries = 1;
      // while loop continues until the player answers that the numGuessed is = to secretNumber
      while (numGuessed.toLowerCase().trim() != "y" && cheated == false) {
        numGuessed = await ask(`Is your Number ${Math.floor((highestNum + lowestNum) / 2)}? (Y/N)? `);
        // if numGuessed is not secretNumber then ask if the secretNumber is higher or lower then numGuessed
        if (numGuessed.toLowerCase().trim() == "n") {
          tries++;
          // Checks that the prevGuess is not the current guess
          if (prevGuess != (Math.floor((highestNum + lowestNum) / 2))){
            var prevGuess = 0;
            let isNum = await ask("Is your Number higher or lower? (H/L)? ");
            // Changes the min and max range of the algorithem to correctly change the guess
            if (isNum.toLowerCase().trim() == "h"){
              lowestNum = Math.floor((highestNum + lowestNum) / 2);
              prevGuess = lowestNum;
            } else if (isNum.toLowerCase().trim() == "l") {
              highestNum = Math.floor((highestNum + lowestNum) / 2);
              prevGuess = highestNum;
            }
          } else {
            // If the player doesn't answer yes after the algorithem has reached a point where it can only give one number, end the game and accuse the player of cheating
            console.log(`Your number can only be ${prevGuess} baised on what you told me. You have lied, thou art a villan and cur.`);
            numGuessed = "y";
            cheated = true;
          }
          // If player is untruthful of their secretNumber and tells the computer that another number is theirs display a message and set cheated to true
        } else if (Math.floor((highestNum + lowestNum) / 2) !== secretNumber && numGuessed.toLowerCase().trim() == "y"){
          console.log(`You lie! ${Math.floor((highestNum + lowestNum) / 2)} isn't your number, ${secretNumber} is. I know I said I wouldn't peak but I couldn't help it.`);
          cheated = true;
        } else if (cheated == false && numGuessed.toLowerCase().trim() == "y"){
          // If the player has not been delared a cheater, end the game displaying the number of tries it took and the secretNumber 
          console.log(`Hurray, I got it in ${tries} tries! Your number was ${Math.floor((highestNum + lowestNum) / 2)}.`);
        }
      }
    }
    // If player cheated display a message 
    if (cheated){
      console.log("You are a cheater >:( But ... ")
    }
    // Ask player if they wish to play again
    playAgain = await ask("Would you like to play again? (Y/N) ");
}
process.exit();
}

// start();

// function to chose which game the user wants to play
async function games(){
let game = await ask("Would you like to play regular(1) or reverse(2)? (1/2) ");
  if (game.toLowerCase().trim() == "1") {
    start();
  } else if (game.toLowerCase().trim() == "2"){
    reverse();
  } else {
    process.exit();
  }
}

games();