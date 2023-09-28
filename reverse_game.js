const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

async function reverse(){
    let playAgain = "y";
    // while loop of the game until playAgain is set to !"y"
    while (playAgain.toLowerCase().trim() == "y") {
        var tries = 0;
        tries = 0;
        // displays the rules of the game
        console.log("Let's play a game where I (computer) make up a number,\n1 - 100,\nand you (human) try to guess it.");
        // creates a random number from 0-100 and assigns it to num
        var num = Math.floor(Math.random()*100);
        // while loop until guess is correct
        while (guess != num) {
            var guess = await ask("What is your guess? ");
            guess = Number(guess.trim());
            tries++;
            // If input is invalid tell the player that it is so
            if (isNaN(guess)) {
                console.log("That is not a number");
            // checks if guess is higher or lower than num and displays a message conveying so.
            } else if (guess > num) {
                console.log("That number is to high.");
            } else if (guess < num) {
                console.log("That guess is to low.");
            // prints victory message
            } else {
                console.log(`Congrats you guessed it in ${tries}!`);
            }
        }
        // Ask player if they wish to play again
        playAgain = await ask("Would you like to play again? (Y/N) ");
    }
    process.exit();
}

// reverse();

module.exports = {reverse, rl, ask};
