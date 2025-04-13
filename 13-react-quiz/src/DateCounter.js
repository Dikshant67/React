import {useReducer} from "react";


function DateCounter() {

        const initialState={count : 0,step :1}
        const [state ,dispatch]=useReducer(reducer,initialState);
        const {count ,step}=state;
    function reducer(state, action) {
        // if (action.type === "INCREMENT") {return state + action.payload;}
        // if (action.type === "DECREAMENT") {return state + action.payload;}
        // if (action.type === "SETCOUNT") {return  action.payload;}
        switch (action.type) {
            case "INCREMENT" : return {...state,count : state.count + state.step};
            case "DECREAMENT" : return {...state,count : state.count - state.step};
            case "SETCOUNT" : return {...state,count : action.payload };
            case "SETSTEP" : return {...state,step : action.payload };
            case "RESET" : return  initialState;
                // return {count : 0 ,step : 1};
            default: throw new Error("Unknown action type: " + action.type);
        }
    }
  // const [count, setCount] = useState(0);


  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({type : "DECREAMENT"});
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({type : "INCREMENT"});
  };


  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({type : "SETCOUNT",payload : Number(e.target.value)
  });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
      dispatch({type : "SETSTEP",payload :  Number(e.target.value)
          });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
      dispatch({type : "RESET",payload :  Number(0)
          });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
