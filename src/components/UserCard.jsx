import axios from "axios";
import { useDispatch } from "react-redux";

// Slices
import { removeUserFromFeed } from "../utils/feedSlice";

// Icons
import { IgnoredIcon, InterestedIcon } from "../utils/Icon";

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
      className="card bg-base-300 w-96 rounded-3xl shadow-lg/20 shadow-accent transition-transform duration-300"
      style={{
        transform: `rotate(${cardTilt}deg) scale(${
          cardTilt === 0 ? 1 : cardTilt > 0 ? 0.98 : 1.02
        })`,
        transformOrigin: "bottom center",
        filter: `blur(${cardTilt > 0 ? 1 : 0}px)`,
      }}
    >
      <figure>
        <img src={photoUrl} alt="Avatar" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {(age || gender) && (
          <p className="font-extralight capitalize mb-2">
            {age && age}
            {age && gender && ", "}
            {gender && gender}
          </p>
        )}
        <p className="line-clamp-2">{about}</p>

        <div className="card-actions justify-center gap-16 mt-4">
          <button
            className="btn btn-outline btn-secondary border-2 btn-circle size-14 hover:text-white shadow-lg/40 shadow-secondary"
            onMouseOver={() => setCardTilt(-2)}
            onMouseOut={() => setCardTilt(0)}
            onClick={() => {
              if (!restrict) handleSendRequest("interested");
            }}
          >
            <InterestedIcon />
          </button>
          <button
            className="btn btn-outline btn-warning border-2 btn-circle size-14 hover:text-white shadow-lg/40 shadow-warning"
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
