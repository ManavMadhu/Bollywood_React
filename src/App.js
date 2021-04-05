import React, { Component } from "react";
import "./styles.css";
import { stockData } from "./Components/MovieDatabase";
import { consonants } from "./Components/consonants";
//program for if button already pressed
class App extends Component {
  state = {
    movieName: null,
    hidden: true,
    lives: 9,
    visibleName: null,
    movieComplete: false,
    gameOver: false,
    pressed: [],
    alreadyPressed: false
  };

  isCharacterALetter = (char) => {
    return /[a-zA-Z]/.test(char);
  };

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  getRandomMovie = () => {
    return stockData[this.getRandomInt(0, stockData.length - 1)].title;
  };

  isVowel = (isCharVowel) => {
    return ["a", "e", "i", "o", "u"].indexOf(isCharVowel.toLowerCase()) !== -1;
  };

  handleGameStart = () => {
    this.setState(
      {
        movieName: this.getRandomMovie(),
        hidden: false,
        lives: 9,
        gameOver: false,
        movieComplete: false,
        pressed: [],
        alreadyPressed: false
      },
      () => {
        let visibleName = JSON.stringify(this.state.movieName);
        for (let x = 0; x < visibleName.length; x++) {
          if (
            this.isCharacterALetter(visibleName[x]) &&
            !this.isVowel(visibleName[x])
          ) {
            visibleName = visibleName.replace(visibleName[x], "_");
          }
        }
        this.setState({ visibleName: JSON.parse(visibleName) });
      }
    );
  };

  handleClickChar = (clickedChar) => {
    clickedChar = clickedChar.keyboard;
    console.log(clickedChar);

    if (this.state.pressed.includes(clickedChar)) {
      this.setState({ alreadyPressed: "Button already Pressed" });
      return;
    }
    this.setState({ alreadyPressed: null });
    let newPressed = this.state.pressed;
    newPressed.push(clickedChar);
    this.setState({ pressed: newPressed });
    let visibleName = JSON.stringify(this.state.visibleName);
    let movieName = JSON.stringify(this.state.movieName);
    let newVisibleName = "";
    let wrongChoice = true;
    for (let x = 0; x < visibleName.length; x++) {
      if (
        visibleName[x] === "_" &&
        movieName[x].toUpperCase() === clickedChar
      ) {
        newVisibleName = newVisibleName.concat(movieName[x]);
        wrongChoice = false;
      } else {
        newVisibleName = newVisibleName.concat(visibleName[x]);
      }
    }

    if (wrongChoice) {
      this.setState({ lives: this.state.lives - 1 }, () => {
        if (this.state.lives === 0) {
          this.setState({ gameOver: true });
        }
      });
    } else {
      this.setState({ visibleName: JSON.parse(newVisibleName) });
    }
    this.setState({ movieComplete: !newVisibleName.includes("_") });
  };

  handleNextMovie = () => {
    this.setState(
      {
        movieName: this.getRandomMovie(),
        movieComplete: false,
        pressed: [],
        alreadyPressed: false
      },
      () => {
        let visibleName = JSON.stringify(this.state.movieName);
        for (let x = 0; x < visibleName.length; x++) {
          if (
            this.isCharacterALetter(visibleName[x]) &&
            !this.isVowel(visibleName[x])
          ) {
            visibleName = visibleName.replace(visibleName[x], "_");
          }
        }
        this.setState({ visibleName: JSON.parse(visibleName) });
      }
    );
    return;
  };

  render() {
    if (this.state.hidden) {
      return (
        <div>
          <div className="PlayButtonScreen">
            <button onClick={this.handleGameStart}>play</button>
          </div>
        </div>
      );
    }
    if (this.state.gameOver) {
      return (
        <div className="EndScreen">
          <div>Game Over</div>
          <div>The film was- {this.state.movieName}</div>
          <div>
            <div className="PlayButtonScreen">
              <button onClick={this.handleGameStart}>play</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="PlayScreen">
        <div>
          <div>Lives:{this.state.lives}</div>
          <div>{this.state.visibleName}</div>
          <div>
            {consonants.map((keyboard, i) => (
              <button onClick={() => this.handleClickChar({ keyboard })}>
                {keyboard}
              </button>
            ))}
          </div>
          <div className="ErrorMessage">{this.state.alreadyPressed}</div>
          <div>
            {this.state.movieComplete ? (
              <button onClick={() => this.handleNextMovie()}>next movie</button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
