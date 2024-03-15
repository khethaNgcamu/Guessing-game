const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

let secretNumber;
let numAttempts;

function askLimit() {
    rl.question("Enter the number of attempts: ", (attemptsInput) => {
        numAttempts = parseInt(attemptsInput);
        if (isNaN(numAttempts) || numAttempts <= 0) {
            console.log("Invalid input. Please enter a valid number of attempts.");
            askLimit(); // Recursive call to ask for the number of attempts again
            return;
        }

        askRange();
    });
}

function askRange(){
    rl.question("Enter a minimun number: ", (min) => {


        rl.question('Enter a maximun number: ', (max) => {
            

            min = Number(min);
            max = Number(max);
            console.log(`I am thinking of number between ${min} and ${max}...`);

            secretNumber = randomInRange(min, max);
            // console.log("secret number: " + secretNumber);
            askGuess();

            // rl.close();
        });
    });
}


function askGuess(){
    rl.question("Enter a guess: ", (guess) => {
        numAttempts--;
        const result = checkGuess(Number(guess));
      
        if (!result) {
            if (numAttempts > 0) {
                console.log(`Too ${guess > secretNumber ? 'high' : 'low'}. You have ${numAttempts} attempts left.`);
                askGuess(); // Ask for another guess if the guess was incorrect and attempts remain
            } else {
                console.log("You lose! Out of attempts.");
                rl.close();
            }
        } else {
            console.log("Correct! You win!");
            rl.close();
        }
    });
}

const checkGuess = function(number){
    
    if(number > secretNumber){
            console.log("Too high");
            return false;
        }else if(number < secretNumber){
            console.log("Too low");
        }else{
            console.log("Correct");
            return true;
        }
    }


function randomInRange(min, max){
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }


askLimit();

