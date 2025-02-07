import { useState } from "react";
import Bill from "./Bill";
import InputFriendService from "./InputFriendService";
import InputService from "./InputService";
export default function App() {
  const [amount, setAmount] = useState(0);
  const [service, setService] = useState(5);
  const [fservice, setFServie] = useState(5);
  function clearAllFields() {
    setAmount(0);
    setService(5);
    setFServie(5);
  }
  function handleAmountChange(x) {
    setAmount(x);
  }
  function handleServiceAmountChange(service) {
    setService(Number(service));
  }

  function handleFServiedAmountChange(amount) {
    setFServie(Number(amount));
  }
  function FinalStatement() {
    const tip = (amount * (service / 100) + amount * (fservice / 100)) / 2;
    const total = amount + tip;
    return (
      <div>
        {amount !== 0
          ? `You Pay ${
              Number(amount) + Number(tip)
            } (amount ${amount}+ tip ${tip})  
      
      `
          : ``}
        <button onClick={() => clearAllFields()}>Reset</button>
      </div>
    );
  }
  return (
    <div className="App">
      <strong>
        <Bill amount={amount} onChangeAmount={handleAmountChange} />
        <InputService
          service={service}
          onChangeServicd={handleServiceAmountChange}
        />
        <InputFriendService
          fservice={fservice}
          onChangeFService={handleFServiedAmountChange}
        />
        {amount > 0 && <FinalStatement />}
      </strong>
    </div>
  );
}
