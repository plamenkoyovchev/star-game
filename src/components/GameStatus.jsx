import React from "react";

import PlayAgain from "./PlayAgain";
import StarDisplay from "./StarDisplay";

const GameStatus = ({ gameStatus, playAgainClicked, starsCount }) => {
  return gameStatus !== "active" ? (
    <PlayAgain clicked={playAgainClicked} status={gameStatus} />
  ) : (
    <StarDisplay count={starsCount} />
  );
};

export default GameStatus;
