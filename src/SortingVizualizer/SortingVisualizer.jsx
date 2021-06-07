import { Component } from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../SortingAlgorithms/SortingAlgorithms";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = "crimson";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "lightgreen";

// This is the final color of the array bars.
const FINAL_COLOR = "darkorchid";

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(50, 500));
    }
    this.setState({ array });
    // reset color
    let arrayBars = document.querySelectorAll("div.array-bar");
    arrayBars.forEach((e) => (e.style.backgroundColor = PRIMARY_COLOR));
  }

  mergesort() {
    let animations = getMergeSortAnimations(this.state.array);
    // console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName("array-bar");
      const changeColor = i % 3 !== 2;
      if (changeColor) {
        const [one, two] = animations[i];
        const oneStyle = bars[one].style;
        const twoStyle = bars[two].style;
        const color =
          i <= animations.length - NUMBER_OF_ARRAY_BARS * 3
            ? i % 3 === 0
              ? SECONDARY_COLOR
              : PRIMARY_COLOR
            : FINAL_COLOR;
        setTimeout(() => {
          oneStyle.backgroundColor = color;
          twoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [one, newHeight] = animations[i];
          const oneStyle = bars[one].style;
          oneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  changeType(normal) {
    const graph = document.querySelector(".array-container");
    if (normal && graph.classList.contains("audio")) {
      graph.classList.remove("audio");
    } else if (!normal && !graph.classList.contains("audio")) {
      graph.classList.add("audio");
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div>
        <div className="array-container">
          {array.map((val, i) => (
            <div
              className="array-bar"
              key={i}
              style={{ height: `${val}px` }}
            ></div>
          ))}
        </div>
        <div className="menu">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergesort()}>Merge Sort</button>
          <button disabled="disabled" className="disabled">Quick Sort</button>
          <button disabled="disabled" className="disabled">Heap Sort</button>
          <button disabled="disabled" className="disabled">Bubble Sort</button>
        </div>
        <div className="type">
          <img
            className="btn"
            onClick={() => this.changeType(true)}
            height="25px"
            src={"https://image.flaticon.com/icons/png/512/900/900784.png"}
            alt="graph"
          />
          <img
            className="btn"
            onClick={() => this.changeType(false)}
            height="25px"
            src={"https://image.flaticon.com/icons/png/512/709/709559.png"}
            alt="graph"
          />
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
