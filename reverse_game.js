const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

async function reverse(){
    let playAgain = "y";
    while (playAgain.toLowerCase() == "y") {
        var tries = 0;
        tries = 0;
        console.log("Let's play a game where I (computer) make up a number,\n1 - 100,\nand you (human) try to guess it.");
        var num = Math.floor(Math.random()*100);
        while (guess != num) {
            var guess = await ask("What is your guess? ");
            guess = Number(guess);
            tries++;
            if (isNaN(guess)) {
                console.log("That is not a number");
            } else if (guess > num) {
                console.log("That number is to high.");
            } else if (guess < num) {
                console.log("That guess is to low.");
            } else {
                console.log(`Congrats you guessed it in ${tries}!`);
            }
        }
        playAgain = await ask("Would you like to play again? (Y/N) ");
    }
    process.exit();
}

reverse();

// module.exports = {reverse};
