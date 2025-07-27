import { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ setAddFriend }) {
  const [name, setName] = useState("");
  const [pic, setPic] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !pic) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: pic,
      balance: 0,
    };
    setAddFriend(newFriend);

    setName("");
    setPic("https://i.pravatar.cc/48");
  }

  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label> Add new Friend</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Add Pic</label>
        <input
          type="text"
          value={pic}
          onChange={(e) => setPic(e.target.name)}
        />
        <Button>Add Friend</Button>
      </form>
    </>
  );
}
