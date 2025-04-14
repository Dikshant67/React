export default function NextButton({
  dispatch,
  answer,
  numberOfQuestions,
  index,
}) {
  if (answer === null) {
    return null;
  }

  if (index < numberOfQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  if (index === numberOfQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </div>
    );
}
