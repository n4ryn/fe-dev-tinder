import { useSelector } from "react-redux";

import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector(state => state.user);

  return user && <EditProfile user={user} />;
};

export default Profile;
