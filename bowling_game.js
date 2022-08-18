let input = '165/251/X2/71XX1/7';
let acc = 0;
let strikeValue = 10;

function calculateScore(input) {
  for (let i = 0; i < input.length; i++) {
    let scoreType = getScoreType(input[i]);
    let currentScoreValue = Number(input[i]);
    let previousThrowType = input[i - 1];
    let previousThrowValue = Number(input[i - 1]);
    let nextThrowType = input[i + 1];
    let nextThrowValue = Number(input[i + 1]);
    let nextSecondThrowType = input[i + 2];
    let nextSecondThrowValue = Number(input[i + 2]);

    if (isTenthRound(i)) {
      // assumindo que o ultimo round sempre possui 3 jogadas
      processTenthRound(
        scoreType,
        previousThrowType,
        currentScoreValue,
        previousThrowValue
      );
    } else {
      processRoundsOneToNine(
        scoreType,
        currentScoreValue,
        nextThrowType,
        previousThrowValue,
        nextThrowValue,
        nextSecondThrowType,
        nextSecondThrowValue
      );
    }
  }
  console.log(acc);
}

function processRoundsOneToNine(
  scoreType,
  currentScoreValue,
  nextThrowType,
  previousThrowValue,
  nextThrowValue,
  nextSecondThrowType,
  nextSecondThrowValue
) {
  switch (scoreType) {
    case 'number':
      acc += currentScoreValue;
      break;
    case 'spare':
      if (isNextValueStrike(nextThrowType)) {
        acc += strikeValue * 2 - previousThrowValue;
      } else {
        acc += strikeValue - previousThrowValue + nextThrowValue;
      }
      break;
    case 'strike':
      if (isNextValueSpare(nextSecondThrowType)) {
        let spare = strikeValue - nextThrowValue;
        acc += strikeValue + nextThrowValue + spare;
      } else if (isNextValueStrike(nextThrowType)) {
        acc += strikeValue * 2;
      } else {
        acc += strikeValue + nextThrowValue + nextSecondThrowValue;
      }
      break;
    default:
      break;
  }
}

function processTenthRound(
  scoreType,
  previousThrowType,
  currentScoreValue,
  previousThrowValue
) {
  switch (scoreType) {
    case 'number':
      if (previousThrowType === 'X') {
        acc += 2 * currentScoreValue;
      } else {
        acc += currentScoreValue;
      }
      break;
    case 'spare':
      acc += 10 - previousThrowValue;
      break;
    case 'strike':
      acc += 10;
      break;

    default:
      break;
  }
}

function isTenthRound(index) {
  return index >= 15 ? true : false;
}

function isNextValueSpare(score) {
  return score === '/' ? true : false;
}

function isNextValueStrike(score) {
  return score === 'X' ? true : false;
}

function getScoreType(score) {
  if (score === '/') {
    return 'spare';
  }
  if (score === 'X') {
    return 'strike';
  }
  return 'number';
}

calculateScore(input);
