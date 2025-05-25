import axios from "axios";
import { useDispatch } from "react-redux";

// Slices
import { removeRequest } from "../utils/requestSlice";
import { updateConnection } from "../utils/connectionSlice";

// Icons
import { AcceptIcon, RejectIcon } from "../utils/Icon";

// Utils
import { useToast } from "../utils/ToastProvider";

const ConnectionCard = ({ user, request, requestId }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { about, firstName, lastName, age, gender, photoUrl } = user;

  // Handle Review Request
  const handleReviewRequest = async (status) => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(requestId));
      showToast(res?.data?.message, "success");
      if (user) dispatch(updateConnection(user));
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="card card-side bg-base-300 w-2xl shadow-xl rounded-xl px-8 py-4 justify-between items-center mb-4">
      <div className="flex gap-4 items-center">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full">
            <img src={photoUrl} alt="Avatar" />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <h2 className="text-xl font-bold">{firstName + " " + lastName}</h2>
          {age && gender && (
            <p className="font-extralight capitalize mb-2">
              {age + ", " + gender}
            </p>
          )}
          <p className="text-start">{about}</p>
        </div>
      </div>

      {request && (
        <div className="card-actions flex-col justify-center">
          <button
            className="btn btn-outline btn-success rounded-full h-14 w-14 hover:text-white"
            onClick={() => handleReviewRequest("accepted")}
          >
            <AcceptIcon />
          </button>
          <button
            className="btn btn-outline btn-error rounded-full h-14 w-14 hover:text-white"
            onClick={() => handleReviewRequest("rejected")}
          >
            <RejectIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectionCard;
