import { useState } from "react";
import Stats from "./Stats";
import PackingList from "./PackingList";
import Form from "./Form";
import Logo from "./Logo";

const initialItemsitems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItemsitems);
  // const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleTogglePacking(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleClearList() {
    const confirm = window.confirm(
      "Are you sure you want to delete all the items?"
    );
    if (confirm) {
      // Delete all items
      setItems([]);
    }
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleTogglePacking}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
export default App;
