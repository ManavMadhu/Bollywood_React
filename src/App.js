import React, { Component } from "react";
import "./styles.css";
import { stockData } from "./Components/MovieDatabase";
import { consonants , bollywoodHeader} from "./Components/consonants";
import "bootstrap/dist/css/bootstrap.min.css";
import { Jumbotron, Button, Container } from "reactstrap";
import TypeWriterEffect from "react-typewriter-effect";

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
    if (this.state.movieComplete) {
      return;
    }
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
          <Jumbotron>
            <h1 className="display-3">BOLLYWOOD!</h1>
            {/* *************typewriter****************** */}
            <TypeWriterEffect
              textStyle={{
                fontFamily: "Work Sans",
                color: "#3F3D56",
                fontWeight: 500,
                fontSize: "1.5em"
              }}
              startDelay={1000}
              cursorColor="#3F3D56"
              multiText={[
                "This is a web version of the simple fill-in-the-blanks game that everyone used to play in the back of their school notebooks."
              ]}
              multiTextDelay={1000}
              typeSpeed={50}
            />
            {/* ****************typewriter Ends**************** */}
            <hr className="my-2" />
            <p>This is made almost entirely with REACT JS</p>
            <p className="lead">
              <Button color="primary" onClick={this.handleGameStart}>
                Play
              </Button>
            </p>
          </Jumbotron>
        </div>
      );
    }
    if (this.state.gameOver) {
      return (
        <div>
          <Jumbotron>
            <h1 className="display-3">Game Over</h1>
            <hr className="my-2" />
            <p>The film was- {this.state.movieName}</p>
            <p className="lead">
              <Button color="primary" onClick={this.handleGameStart}>
                Play Again
              </Button>
            </p>
          </Jumbotron>
        </div>
      );
    }
    return (
      <div className="PlayScreen">
        <div>
          {/* <div className="bollywoodHeader"><h1>
            BOLLYWOOD:{this.state.lives}
            </h1></div> */}
            <thead className="bollywoodHeader">{bollywoodHeader.map((keyboard, i) =>
              (
                <th className="bollywoodLetter">
                  {keyboard}
                </th>
              )
            )}</thead>
            <hr/>
          <h2 className="guessName">{this.state.visibleName}</h2>
          <div className="buttonSet">
            {consonants.map((keyboard, i) =>
              this.state.pressed.includes(keyboard) ? (
                <Button
                  className="alphabetButton"
                  color="danger"
                  onClick={() => this.handleClickChar({ keyboard })}
                >
                  {keyboard}
                </Button>
              ) : (
                <Button
                  className="alphabetButton"
                  color="primary"
                  size="lg"
                  onClick={() => this.handleClickChar({ keyboard })}
                >
                  {keyboard}
                </Button>
              )
            )}
          </div>
          <div className="ErrorMessage">{this.state.alreadyPressed}</div>
          <div>
            {this.state.movieComplete ? (
              <Button color="success" onClick={() => this.handleNextMovie()}>
                Next Movie
              </Button>
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
