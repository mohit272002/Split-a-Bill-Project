import { useState } from "react";
import FriendList from "./Components/FriendList";
import FormAddFriend from "./Components/FormAddFriend";
import Button from "./Components/Button";
import FormAddSplitBill from "./Components/FormAddSplitBill";

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
];

function App() {
  const [onAddFriend, setOnAddFriend] = useState(initialFriends);
  const [showFriend, setShowFriend] = useState(false);
  const [onselectedFriend, setonselectedFriend] = useState(null);

  function handleAddnewFriend(friend) {
    setOnAddFriend((prev) => [...prev, friend]);
    setShowFriend(false);
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
        {onselectedFriend && (
          <FormAddSplitBill
            selectedFriend={onselectedFriend}
            onSplitBill={handletotalBill}
          />
        )}
      </div>
    </>
  );
}

export default App;
