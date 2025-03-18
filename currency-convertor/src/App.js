import { useEffect, useState } from "react";

function App() {
  return (
    <div className="App">
      <CurrencyConvertor />
    </div>
  );
}
function CurrencyConvertor() {
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setTOcurr] = useState("INR");
  const [inputValue, setInputValue] = useState();
  const [rate, setRate] = useState();
  const convertedValue = inputValue ? (inputValue * rate).toFixed(2) : "";
  useEffect(
    function () {
      async function getRates() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?from=${fromCurr}&to=${toCurr}`
          );
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const data = await res.json();
          const rates = data.rates;
          setRate(rates[toCurr]);
        } catch (error) {
          console.error(error);
        }
      }
      getRates();
    },
    [inputValue, fromCurr, toCurr]
  );
  return (
    <>
      <input type="textbox" onChange={(e) => setInputValue(e.target.value)} />
      <select value={fromCurr} onChange={(e) => setFromCurr(e.target.value)}>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
      </select>
      <select value={toCurr} onChange={(e) => setTOcurr(e.target.value)}>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
      </select>
      <div>
        {fromCurr === toCurr ? (
          <label>
            {inputValue} {fromCurr} = {inputValue} {fromCurr}
          </label>
        ) : (
          <label>
            {inputValue} {fromCurr} = {convertedValue} {toCurr}
          </label>
        )}
      </div>
    </>
  );
}
export default App;
