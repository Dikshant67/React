import { useState } from "react";
import Beauty from "./Beauty.css";

function App() {
  const currentDate = new Date();
  const [count, setCount] = useState(0);
  // const d = currentDate.getDate();
  const [text, setText] = useState(new Date().toDateString());
  const [step, setStep] = useState(1);
  console.log(currentDate);
  function addCount() {
    setCount(count + step);
  }
  function reduceCount() {
    setCount(count - step);
  }
  function addStep() {
    setStep(step + 1);
  }
  function reduceStep() {
    setStep(step - 1);
  }
  return (
    <div class="counter-container">
      <div className="animated-text">Demo Date Increment React Project</div>
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
      <span class="counter-value">{count}</span>
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
    </div>
  );
}

export default App;
