const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");
  let lowestNum = await ask("What is the lowest number in the range? ");
  let highestNum = await ask("What is the highest number in the range? ");
  let secretNumber = await ask("What is your secret number?\n Whole numbers only.\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);

  lowestNum = Number(lowestNum);
  highestNum = Number(highestNum);
  secretNumber = Number(secretNumber);
  
  if (secretNumber > highestNum || secretNumber < lowestNum){
    process.stdout.write("No fair! Your trying to Cheat!");
    rl.close();
  } else if (isNaN(secretNumber)) {
    process.stdout.write("That's not a number.");
    rl.close();
  } else {
    process.stdout.write("Lets begin!");
    let numGuessed = "n";
    let tries = 1;
    while (numGuessed.toLowerCase() != "y") {
      numGuessed = await ask(`Is your Number ${Math.floor((highestNum + lowestNum) / 2)}? (Y/N)? `);
      if (numGuessed.toLowerCase() == "n") {
        tries++;
        let isNum = await ask("Is your Number higher or lower? (H/L)? ");
        if (isNum.toLowerCase() == "h"){
          lowestNum = Math.floor((highestNum + lowestNum) / 2);
        } else if (isNum.toLowerCase() == "l") {
          highestNum = Math.floor((highestNum + lowestNum) / 2);
        }
      } else {
        process.stdout.write(`Hurray, I got it in ${tries} tries! Your number was ${Math.floor((highestNum + lowestNum) / 2)}.`);
      }
    }
  }

  process.exit();
}
