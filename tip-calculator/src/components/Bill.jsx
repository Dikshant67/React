export default function Bill({ amount, onChangeAmount }) {
  return (
    <>
      <sp>Bill Amount</sp>
      <input
        type="number"
        value={amount}
        onChange={(e) => onChangeAmount(e.target.value)}
      />
    </>
  );
}
