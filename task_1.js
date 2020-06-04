var readlineSync = require("readline-sync");

const size = 4;
const rounds = 12;
let code = "";

for (let i = 0; i < size; i++) {
  code += Math.floor(Math.random() * (7 - 0 + 1)) + 0;
}
console.log(code);

function checkCode(code, input) {
  let rC = 0;
  let rP = 0;
  let won = false;
  if (input === code) {
    rC = 0;
    rP = 4;
    won = true;

    return [rC, rP, won];
  } else {
    // check for right positions
    for (let i = 0; i < input.length; i++) {
      if (input[i] === code[i]) {
        rP += 1;
        input = input.slice(0, i) + input.slice(i + 1);
        code = code.slice(0, i) + code.slice(i + 1);
      }
    }
    for (let i = 0; i < input.length; i++) {
      if (code.includes(input[i])) {
        rC += 1;
      }
    }
  }
  return [rC, rP, won];
}

function askUser() {
  var input = readlineSync.questionInt("What is your guess: ");
  // add validation
  return input;
}

console.log(
  "Welcome to Mastermind. \nI have already choose a number so we can start right away. \nThe length of the code is: " +
    size +
    "\n"
);

async function main(code, rounds) {
  if (rounds !== 0) {
    let input = String(await askUser());
    let result = checkCode(code, input);
    if (result[2]) {
      console.log("you have won the code was " + input + "!");
    } else {
      console.log(
        result[0] +
          " of you guesses have the right color\n" +
          result[1] +
          " of your guesses are in the right spot and have the right color"
      );
      rounds--;
      main(code, rounds);
    }
  } else {
    console.log(
      "The game is over, as you run out of rounds. The code I created was: " +
        code
    );
  }
}

main(code, rounds);
