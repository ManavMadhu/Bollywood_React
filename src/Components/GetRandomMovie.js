import React from "react";
import { stockData } from "./MovieDatabase";
export default class GetRandomMovie extends React.Component {
  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  render() {
    const accessIndex = this.getRandomInt(0, stockData.length - 1);
    return stockData[accessIndex].title;
  }
}
