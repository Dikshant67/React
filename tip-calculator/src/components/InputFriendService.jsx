export default function InputFriendService({ fservice, onChangeFService }) {
  return (
    <div>
      <span>How did you like the Service?</span>
      <select
        value={fservice}
        onChange={(e) => onChangeFService(e.target.value)}
      >
        <option value="5">it was satisfactory (5%)</option>
        <option value="10">it was good (10%)</option>
        <option value="20">it was better (20%)</option>
        <option value="30">it was Awesome (30%)</option>
      </select>
    </div>
  );
}
