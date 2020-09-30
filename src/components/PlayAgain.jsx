import React from "react";

const PlayAgain = ({ clicked, status }) => {
  return (
    <div className="game-done">
      <h3>{status === "won" ? "You won!" : "You lost!"}</h3>
      <button onClick={clicked}>Play Again</button>
    </div>
  );
};

export default PlayAgain;
