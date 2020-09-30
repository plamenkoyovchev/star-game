import React from "react";
import utils from "../shared/math-utils";

const StarDisplay = ({ count }) => {
  return utils
    .range(1, count)
    .map((star) => <div key={star} className="star" />);
};

export default StarDisplay;
