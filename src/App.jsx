import React, { useState } from "react";
import "./App.css";

import utils from "./shared/math-utils";

const NumberItem = ({ number, status, clicked }) => {
  return (
    <button
      className="number"
      style={{ backgroundColor: colors[status] }}
      onClick={() => clicked(number, status)}
    >
      {number}
    </button>
  );
};

const PlayAgain = ({ clicked }) => {
  return (
    <div className="game-done">
      <button onClick={clicked}>Play Again</button>
    </div>
  );
};

const StarDisplay = ({ count }) => {
  return utils
    .range(1, count)
    .map((star) => <div key={star} className="star" />);
};

const StarMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidates, setCandidates] = useState([]);

  const candidateIsWrong = utils.sum(candidates) > stars;
  const gameIsWon = availableNumbers.length === 0;

  const getStatus = (number) => {
    if (!availableNumbers.includes(number)) {
      return "used";
    }

    if (candidates.includes(number)) {
      return candidateIsWrong ? "wrong" : "candidate";
    }

    return "available";
  };

  const onNumberClickHandler = (number, status) => {
    if (status === "used") {
      return;
    }

    const newCandidates =
      status === "available"
        ? [...candidates, number]
        : candidates.filter((cn) => cn !== number);

    if (utils.sum(newCandidates) !== stars) {
      setCandidates(newCandidates);
    } else {
      const newAvailableNumbers = availableNumbers.filter(
        (an) => !newCandidates.includes(an)
      );

      setStars(utils.randomSumIn(newAvailableNumbers, 9));
      setAvailableNumbers(newAvailableNumbers);
      setCandidates([]);
    }
  };

  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNumbers(utils.range(1, 9));
    setCandidates([]);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameIsWon ? (
            <PlayAgain clicked={resetGame} />
          ) : (
            <StarDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((num) => (
            <NumberItem
              key={num}
              number={num}
              status={getStatus(num)}
              clicked={onNumberClickHandler}
            >
              {num}
            </NumberItem>
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

// Color Theme
const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

const App = () => {
  return (
    <div className="App">
      <StarMatch />
    </div>
  );
};

export default App;
