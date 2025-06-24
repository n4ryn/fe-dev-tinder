import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router";

import { useToast } from "../context/ToastProvider";

import { updateConnection } from "../utils/connectionSlice";
import { AcceptIcon, RejectIcon } from "../utils/Icon";
import { removeRequest } from "../utils/requestSlice";

const ConnectionCard = ({ user, request, requestId }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const [cardTilt, setCardTilt] = useState(0);
  const { about, firstName, lastName, age, gender, photoUrl, _id } = user;

  // Handle Review Request
  const handleReviewRequest = async status => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(requestId));
      showToast(res?.data?.message, "success");
      if (user) dispatch(updateConnection(user));
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  return (
    <div
      className="card md:card-side md:items-center bg-base-300 md:w-2xl shadow-md/30 shadow-accent transition-transform duration-300 rounded-xl px-8 py-4 gap-4 md:gap-0 justify-between items-center mb-4"
      style={{
        filter: `blur(${cardTilt > 0 ? 1 : 0}px)`,
        transform: `scale(${cardTilt === 0 ? 1 : cardTilt > 0 ? 0.98 : 1.02})`,
      }}
    >
      <div className="flex gap-4 items-center">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full">
            <img src={photoUrl} alt="Avatar" />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <h2 className="text-xl font-bold">{firstName + " " + lastName}</h2>
          {(age || gender) && (
            <p className="font-extralight capitalize mb-2">
              {age && age}
              {age && gender && ", "}
              {gender && gender}
            </p>
          )}
          <p className="text-start">{about}</p>
        </div>
      </div>

      {request && (
        <div className="card-actions gap-0 md:gap-4 md:flex-col mt-6 md:mt-0 w-full md:w-auto justify-evenly md:justify-center">
          <button
            className="btn btn-outline btn-success border-2 btn-circle size-14 hover:text-white shadow-md shadow-success"
            onClick={() => handleReviewRequest("accepted")}
            onMouseOver={() => setCardTilt(-2)}
            onMouseOut={() => setCardTilt(0)}
          >
            <AcceptIcon />
          </button>
          <button
            className="btn btn-outline btn-error border-2 btn-circle size-14 hover:text-white shadow-md shadow-error"
            onMouseOver={() => setCardTilt(2)}
            onMouseOut={() => setCardTilt(0)}
            onClick={() => handleReviewRequest("rejected")}
          >
            <RejectIcon />
          </button>
        </div>
      )}

      {!request && (
        <NavLink
          to={`/chat`}
          className="btn btn-outline btn-accent hover:text-white shadow-md/30 shadow-primary"
        >
          Chat
        </NavLink>
      )}
    </div>
  );
};

export default ConnectionCard;
