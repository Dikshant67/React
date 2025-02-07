import { useState } from "react";
import "./index.css";
const message = [
  "hello world",
  "Welcome to React",
  "This is a step-by-step tutorial",
  "We will build a simple React application",
];
export default function App() {
  return (
    <div>
      <Step />
      <Step />
      <Step />
    </div>
  );
}
function Step() {
  const [step, setStep] = useState(1);
  const [isOpen, setisOpen] = useState(true);
  // console.log(arr);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    if (step <= 3) setStep((s) => s + 1);
    else setStep(1);
  }
  function changeStep() {
    setStep(1);
  }
  const handleDoubleClick = (s) => {
    setStep(s);
  };

  return (
    <>
      <button className="close" onClick={() => setisOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div
              onDoubleClick={() => handleDoubleClick(1)}
              className={step == 1 ? "active" : ""}
            >
              1
            </div>
            <div
              onDoubleClick={() => handleDoubleClick(2)}
              className={`${step == 2 ? "active" : ""}`}
            >
              2
            </div>
            <div
              onDoubleClick={() => handleDoubleClick(3)}
              className={`${step == 3 ? "active" : ""}`}
            >
              3
            </div>
            <div
              onDoubleClick={() => handleDoubleClick(4)}
              className={`${step == 4 ? "active" : ""}`}
            >
              4
            </div>
          </div>

          <p className="message">
            Step {step}: {message[step - 1]}
          </p>
          <div className="buttons">
            <button
              onClick={handlePrevious}
              // onMouseEnter={() => alert("test")}
              style={{ backgroundColor: "#7950f2", color: "ffffff" }}
            >
              prev
            </button>
            <button
              onClick={handleNext}
              // onMouseEnter={() => alert("test")}
              style={{ backgroundColor: "#7950f2", color: "ffffff" }}
            >
              next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
