import React from "react";

function FinishScreen({ points, maxPossiblePoints, dispatch, highscore }) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "⭐";
  if (percentage >= 60 && percentage < 80) emoji = "☺️";
  if (percentage >= 0 && percentage < 60) emoji = "🤦🏻‍♀️";

  return (
    <div>
      <p className="result">
        {emoji} You Scored <strong>{points}</strong>
        &nbsp;out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore {highscore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart the Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
