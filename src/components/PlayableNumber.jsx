import React from "react";

const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

const PlayableNumber = ({ number, status, clicked }) => {
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

export default PlayableNumber;
