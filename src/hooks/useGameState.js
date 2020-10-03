import { useEffect, useState } from "react";
import utils from "../shared/math-utils";

const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidates, setCandidates] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNumbers.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (status, number) => {
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

  return {
    stars,
    availableNumbers,
    candidates,
    secondsLeft,
    setGameState,
  };
};

export default useGameState;
