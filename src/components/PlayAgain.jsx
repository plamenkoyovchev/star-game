import React from "react";

const PlayAgain = ({ clicked }) => {
  return (
    <div className="game-done">
      <button onClick={clicked}>Play Again</button>
    </div>
  );
};

export default PlayAgain;
