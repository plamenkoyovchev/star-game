import React from "react";

import PlayAgain from "./PlayAgain";
import StarDisplay from "./StarDisplay";

const GameStatus = ({ gameIsWon, playAgainClicked, starsCount }) => {
  return gameIsWon ? (
    <PlayAgain clicked={playAgainClicked} />
  ) : (
    <StarDisplay count={starsCount} />
  );
};

export default GameStatus;
