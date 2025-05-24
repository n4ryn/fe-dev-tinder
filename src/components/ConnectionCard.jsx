// Icons
import { AcceptIcon, RejectIcon } from "../utils/icons";

const ConnectionCard = ({ user, request, handleReviewRequest, requestId }) => {
  const { about, firstName, lastName, age, gender, photoUrl } = user;

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
            onClick={() => handleReviewRequest("accepted", requestId, user)}
          >
            <AcceptIcon />
          </button>
          <button
            className="btn btn-outline btn-error rounded-full h-14 w-14 hover:text-white"
            onClick={() => handleReviewRequest("rejected", requestId)}
          >
            <RejectIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectionCard;
