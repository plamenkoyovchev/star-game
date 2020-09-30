import React, { useState } from "react";
import utils from "../shared/math-utils";

import GameStatus from "./GameStatus";
import PlayableNumber from "./PlayableNumber";

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
          <GameStatus
            gameIsWon={gameIsWon}
            playAgainClicked={resetGame}
            starsCount={stars}
          />
        </div>
        <div className="right">
          {utils.range(1, 9).map((num) => (
            <PlayableNumber
              key={num}
              number={num}
              status={getStatus(num)}
              clicked={onNumberClickHandler}
            >
              {num}
            </PlayableNumber>
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

export default StarMatch;
