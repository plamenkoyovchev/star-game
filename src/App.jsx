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

const StarMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidates, setCandidates] = useState([2, 3]);

  const candidateIsWrong = () => utils.sum(candidates) > stars;
  const getStatus = (number) => {
    if (!availableNumbers.includes(number)) {
      return "used";
    }

    if (candidates.includes(number)) {
      return candidateIsWrong() ? "wrong" : "candidate";
    }

    return "available";
  };

  const onNumberClickHandler = (number, status) => {
    if (status === "used") {
      return;
    }
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {utils.range(1, stars).map((star) => (
            <div key={star} className="star" />
          ))}
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
