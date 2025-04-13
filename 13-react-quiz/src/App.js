
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import {useEffect, useReducer} from "react";
import {type} from "@testing-library/user-event/dist/type";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
const initialState = {
    questions :[],
    //loading ,error,ready,active,finished
    status : 'loading',
    index : 0,
    answer : null,
    points : null
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions : action.payload,
                status : "ready"
            }
            case 'dataFailed':
                return {
                    ...state,
                    status : 'error'
                }
        case 'start':
            return {...state,
            status : 'active'}
        case 'newAnswer':
            const question = state.questions[state.index];
            return {...state,answer: action.payload,points : action.payload===question.correctOption ? state.points +question.points : state.points}
        case 'nextQuestion':
            const newIndex = state.index + 1;
            return {...state,answer: null,index : newIndex}

            default:
                throw new Error("Unknown action type: ");

    }
}


export default function App() {
    const [{questions,status,index,answer},dispatch]=useReducer(reducer,initialState);
   const numberOfQuestions = questions.length;

    useEffect(function () {
        fetch("http://localhost:9000/questions")
            .then(res => res.json())
            .then((data) => dispatch({type : "dataReceived",payload : data}))
            .catch(err => dispatch({type : 'dataFailed'}));
    },[])

    return (
    <div className="app">
      <Header />
      <Main >
          {status === "loading" && <Loader/>}
          {status === "error" && <Error/>}
          {status === "ready" && <StartScreen numberOfQuestions={numberOfQuestions} dispatch={dispatch}/>}
          {status === "active" &&   <><Question question={questions[index]} dispatch={dispatch} answer={answer} />

              <NextButton dispatch={dispatch} answer={answer}>Next</NextButton></>}
          {/*{answer >0 && <h2>answered!!</h2>}*/}
      </Main>

    </div>
  );
}


