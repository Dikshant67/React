import { useState } from "react";
import Beauty from "./Beauty.css";

function App() {
  const currentDate = new Date();
  const [count, setCount] = useState(0);
  // const d = currentDate.getDate();
  const [text, setText] = useState(new Date().toDateString());
  const [step, setStep] = useState(1);
  // console.log(currentDate);
  function adjustSteps(a) {
    // a.preventDefault();
    setStep(a);
  }
  function handleReset() {
    setCount(0);
    setStep(1);
  }
  function changeDate(a) {
    const date = new Date();
    date.setDate(date.getDate() + a);
    console.log(date);

    setText(date.toDateString());
  }
  function addCount() {
    setCount(count + step);
    changeDate(count + 1);
  }
  function reduceCount() {
    setCount(count - step);
    changeDate(count - 1);
  }
  function addStep() {
    setStep(step + 1);
  }
  function reduceStep() {
    setStep(step - 1);
  }
  return (
    <>
      {/* <div className="animated-text">Demo Date Increment React Project</div> */}
      <div class="counter-container">
        <input
          type="range"
          max="10"
          min="0"
          value={Number(step)}
          onChange={(e) => adjustSteps(Number(e.target.value))}
        />
        <button class="counter-btn decrement" onClick={() => reduceStep()}>
          -
        </button>
        <span class="counter-value"> {step} </span>
        <button class="counter-btn increment" onClick={() => addStep()}>
          +
        </button>
        <button class="counter-btn decrement" onClick={() => reduceCount()}>
          -
        </button>
        <input
          type="text"
          value={count}
          class="counter-value"
          onChange={(e) => setCount(Number(e.target.value))}
        ></input>
        <button class="counter-btn increment" onClick={() => addCount()}>
          +
        </button>
        <p class="date-paragraph">
          {count !== 0
            ? count > 0
              ? `${count} days from today is ${text} `
              : `${count} ago it was ${text} `
            : `Today is ${text} `}
        </p>

        {count !== 0 || step !== 1 ? (
          <button onClick={() => handleReset()}>Reset</button>
        ) : null}
      </div>
    </>
  );
}

export default App;
