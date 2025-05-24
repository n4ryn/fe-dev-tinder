import { useSelector } from "react-redux";

const Feed = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      {user && (
        <h1 className="text-2xl font-light">
          Welcome <span className="font-bold">{user.firstName}</span>
        </h1>
      )}
    </div>
  );
};

export default Feed;
