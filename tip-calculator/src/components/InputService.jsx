export default function InputService({ service, onChangeServicd }) {
  return (
    <div>
      <span>How did you like the service</span>
      <select value={service} onChange={(e) => onChangeServicd(e.target.value)}>
        <option value="5">1(5%)</option>
        <option value="10">2(10%)</option>
        <option value="15">3(15%)</option>
      </select>
    </div>
  );
}
