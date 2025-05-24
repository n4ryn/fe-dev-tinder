// Icons
import { IgnoreIcon, InterestedIcon } from "../utils/icons";

const UserCard = ({ data }) => {
  const { about, firstName, lastName, age, gender, photoUrl } = data;

  return (
    <div className="card bg-base-300 w-96 shadow-xl rounded-4xl">
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
          <button className="btn btn-outline btn-secondary rounded-full h-14 w-14 hover:text-white">
            <InterestedIcon />
          </button>
          <button className="btn btn-outline btn-warning rounded-full h-14 w-14 hover:text-white">
            <IgnoreIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
