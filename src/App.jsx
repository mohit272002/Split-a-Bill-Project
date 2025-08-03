import { useState, useEffect } from "react";
import FriendList from "./Components/FriendList";
import FormAddFriend from "./Components/FormAddFriend";
import Button from "./Components/Button";
import FormAddSplitBill from "./Components/FormAddSplitBill";

// const initialFriends = [
//   {
//     id: 118836,
//     name: "Clark",
//     image: "https://i.pravatar.cc/48?u=118836",
//     balance: -7,
//   },
//   {
//     id: 933372,
//     name: "Sarah",
//     image: "https://i.pravatar.cc/48?u=933372",
//     balance: 20,
//   },
//   {
//     id: 499476,
//     name: "Anthony",
//     image: "https://i.pravatar.cc/48?u=499476",
//     balance: 0,
//   },
// ];

function App() {
  const [onAddFriend, setOnAddFriend] = useState([]);
  const [showFriend, setShowFriend] = useState(false);
  const [onselectedFriend, setonselectedFriend] = useState(null);
  const [error, setError] = useState(null);

  // Fetch friends from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/friends")
      .then((res) => res.json())
      .then((data) => setOnAddFriend(data))
      .catch((err) => console.error("Failed to fetch friends:", err));
  }, []);

  async function handleAddnewFriend(friend) {
    try {
      const res = await fetch("http://localhost:5000/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(friend),
      });
      if (res.status === 429) {
        setError("You’re sending too many messages. Rate limiter reached.");
      }
      if (!res.ok) throw new Error("Failed to add friend");
      const newFriend = await res.json();
      setOnAddFriend((prev) => [...prev, newFriend]);
      setShowFriend(false);
    } catch (err) {
      console.error(err);
    }
  }

  function handleSelection(friend) {
    setonselectedFriend((prev) => (prev?.id === friend.id ? null : friend));
  }

  function handletotalBill(value) {
    setOnAddFriend((friends) =>
      friends.map((friend) =>
        friend.id === onselectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setonselectedFriend(null);
  }

  return (
    <>
      <div className="app">
        {!error && (
          <div className="sidebar">
            <FriendList
              friend={onAddFriend}
              onselectedFriend={onselectedFriend}
              handleSelection={handleSelection}
            ></FriendList>
            {showFriend && <FormAddFriend setAddFriend={handleAddnewFriend} />}

            <Button onClick={() => setShowFriend((prev) => !prev)}>
              {showFriend ? "Close" : "Add Friend"}
            </Button>
          </div>
        )}
        {onselectedFriend && (
          <FormAddSplitBill
            selectedFriend={onselectedFriend}
            onSplitBill={handletotalBill}
          />
        )}
        {error && <div>{error}</div>}
      </div>
    </>
  );
}

export default App;
