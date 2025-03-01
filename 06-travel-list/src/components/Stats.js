export default function Stats({ items }) {
  const noOfItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedItemsPercentage = Math.round((packedItems / items.length) * 100);

  return (
    <foooter className="stats">
      {noOfItems === 0 ? (
        <em>No items on your list yet, add some now 🛑</em>
      ) : noOfItems === packedItems ? (
        <em>You are Good to GO,Everything Packed✈️</em>
      ) : (
        <em>
          🔥You have {noOfItems} items on your list, and you have already
          packed&nbsp;
          {packedItemsPercentage}%
        </em>
      )}
    </foooter>
  );
}
