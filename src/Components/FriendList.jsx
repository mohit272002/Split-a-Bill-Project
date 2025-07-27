import Friend from "./Friend";

export default function FriendList({
  friend,
  onselectedFriend,
  handleSelection,
}) {
  return (
    <ul>
      {friend.map((friends) => (
        <Friend
          friend={friends}
          key={friends.id}
          onselectedFriend={onselectedFriend}
          handleSelection={handleSelection}
        />
      ))}
    </ul>
  );
}
