import React from "react";
import useGameState from "../hooks/useGameState";
import utils from "../shared/math-utils";

import GameStatus from "./GameStatus";
import PlayableNumber from "./PlayableNumber";

const StarMatch = ({ startNewGame }) => {
  const {
    stars,
    availableNumbers,
    candidates,
    secondsLeft,
    setGameState,
  } = useGameState();

  const candidateIsWrong = utils.sum(candidates) > stars;
  const gameStatus =
    availableNumbers.length === 0
      ? "won"
      : secondsLeft === 0
      ? "lost"
      : "active";

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
    if (gameStatus !== "active" || status === "used") {
      return;
    }

    setGameState(status, number);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <GameStatus
            gameStatus={gameStatus}
            playAgainClicked={startNewGame}
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
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default StarMatch;
