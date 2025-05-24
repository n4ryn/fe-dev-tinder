import axios from "axios";
import { useDispatch } from "react-redux";

// Slices
import { removeUserFromFeed } from "../utils/feedSlice";

// Icons
import { IgnoredIcon, InterestedIcon } from "../utils/Icons";

// Utils
import { useToast } from "../utils/ToastProvider";
import { useState } from "react";

const UserCard = ({ data, restrict }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [cardTilt, setCardTilt] = useState(0);

  const { _id, about, firstName, lastName, age, gender, photoUrl } = data;

  // Handle Send Request
  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(_id));
      // showToast(res?.data?.message, "success");
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div
      className="card bg-base-300 w-96 shadow-xl rounded-4xl transition-transform duration-300"
      style={{
        transform: `rotate(${cardTilt}deg)`,
        transformOrigin: "bottom center",
      }}
    >
      <figure>
        <img src={photoUrl} alt="Avatar" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && (
          <p className="font-extralight capitalize mb-2">
            {age + ", " + gender}
          </p>
        )}
        <p className="line-clamp-2">{about}</p>

        <div className="card-actions justify-center gap-16 mt-4">
          <button
            className="btn btn-outline btn-secondary rounded-full h-14 w-14 hover:text-white"
            onMouseOver={() => setCardTilt(-2)}
            onMouseOut={() => setCardTilt(0)}
            onClick={() => {
              if (!restrict) handleSendRequest("interested");
            }}
          >
            <InterestedIcon />
          </button>
          <button
            className="btn btn-outline btn-warning rounded-full h-14 w-14 hover:text-white"
            onMouseOver={() => setCardTilt(2)}
            onMouseOut={() => setCardTilt(0)}
            onClick={() => {
              if (!restrict) handleSendRequest("ignored");
            }}
          >
            <IgnoredIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
