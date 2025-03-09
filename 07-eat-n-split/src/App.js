import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
]; //Array defining the names of the friends
export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddfriend, setShowAddfriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShowAddfriendForm() {
    setShowAddfriend((show) => !show);
  }
  function handleAddfriendForm(friend) {
    // Add friend logic here
    setFriends((friends) => [...friends, friend]);
    setShowAddfriend(false);
  }
  function handleSelectFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  }
  function updateBalance(balance) {
    // Update friend balance logic here
    balance = balance + selectedFriend.balance;
    const updatedFriends = friends.map((f) =>
      f.id === selectedFriend.id ? { ...f, balance } : f
    );
    setFriends(updatedFriends);
  }
  function handleSplitBill(value) {
    // Split bill logic here
    // Update friend balances
    console.log(value);
    updateBalance(value);
    setSelectedFriend(null);
  }
  function handleCloseBill() {
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          selectedFriend={selectedFriend}
          friends={friends}
          onSelection={handleSelectFriend}
        />

        {showAddfriend && <FormAddFriend onAddFriend={handleAddfriendForm} />}

        <Button className="button" onClick={handleShowAddfriendForm}>
          {showAddfriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          onCloseBill={handleCloseBill}
          key={Math.random()}
        />
      )}
    </div>
  );
}
function FormSplitBill({ selectedFriend, onSplitBill, onCloseBill, key }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const friendShare = bill ? bill - paidByUser : "";
  function handleSubmit(e) {
    e.preventDefault();
    // Add payment logic here
    if (bill === "" || paidByUser === "") {
      alert("Please fill out all fields.");
      return;
    }

    if (isNaN(bill) || isNaN(paidByUser)) {
      alert("Please enter valid numbers.");
      return;
    }
    onSplitBill(whoIsPaying === "user" ? friendShare : -paidByUser);
    // Reset form fields
    setBill("");
    setPaidByUser("");
    setWhoIsPaying("user");
  }
  return (
    <div>
      <form className="form-split-bill" onSubmit={handleSubmit} key={key}>
        <Button onClick={onCloseBill}>X</Button>
        <h2>Split a bill with {selectedFriend.name}</h2>

        <label>💰 Bill value</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^\d*$/.test(inputValue)) {
              const numericValue = Number(inputValue);

              setBill(numericValue);
            }
          }}
        />

        <label>🧍‍♀️ Your expense</label>
        <input
          type="text"
          value={paidByUser}
          onChange={(e) => {
            const inputValue = e.target.value;

            // Check if the input is a valid number (including empty string)
            if (/^\d*$/.test(inputValue)) {
              const numericValue = Number(inputValue);

              // Ensure the value does not exceed the bill amount
              if (numericValue <= bill) {
                setPaidByUser(numericValue);
              } else {
                // If the value exceeds the bill, keep the previous value
                setPaidByUser(paidByUser);
              }
            }
          }}
        />

        <label>👫 {selectedFriend.name}'s expense</label>
        <input type="text" disabled value={friendShare} />

        <label>🤑 Who is paying the bill</label>
        <select
          onChange={(e) => setWhoIsPaying(e.target.value)}
          value={whoIsPaying}
        >
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>

        <Button type="submit">Split bill</Button>
      </form>
    </div>
  );
}
function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        ></Friend>
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li className={isSelected && "selected"}>
      <img src={friend.image} alt={friend.name} />

      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) {
      alert("Please enter a name");
      return;
    }
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    console.log(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter friend's name"
      />

      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Enter image url"
      />
      <Button className="button" type="submit">
        Add Friend
      </Button>
    </form>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
