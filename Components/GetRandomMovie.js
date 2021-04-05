import React from "react";
import { stockData } from "./GetRandomMovie";
export default class GetRandomMovie extends React.Component {
  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  render() {
    const accessIndex = getRandomInt(0, stockData.size() - 1);
    return accessIndex;
  }
}
