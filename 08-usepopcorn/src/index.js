import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// import StarsRating from "./StarsRating";
// function Test() {
//   const [ratedStars, setRatedStars] = useState("");
//   return (
//     <div>
//       <StarsRating maxRating={10} onRateGiven={(x) => setRatedStars(x)} />
//       <p> This movie has rated {ratedStars} stars.</p>
//     </div>
//   );
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />

    {/* <StarsRating size={15} maxRating={5} color="red" />
    <StarsRating size={20} maxRating={"5"} color="blue" />
    <StarsRating
      size={30}
      color="#d38"
      messeges={["Terrible", "Bad", "Satisfactory", "Good", "Excellent"]}
      className="test"
      defaultRating={4}
    /> */}
    {/* <Test maxRating={"10"} /> */}
  </React.StrictMode>
);
