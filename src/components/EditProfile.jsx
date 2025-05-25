import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

// Components
import UserCard from "./UserCard";

// Slices
import { addUser } from "../utils/userSlice";

// Icons
import { CancelIcon } from "../utils/Icon";

// Utils
import { useToast } from "../utils/ToastProvider";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputChip, setInputChip] = useState("");

  // Handle Chip addition
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputChip.trim()) {
      e.preventDefault();
      if (!skills.includes(inputChip.trim())) {
        setSkills([...skills, inputChip.trim()]);
      }
      setInputChip("");
    }

    if (e.key === "Backspace" && inputChip === "" && skills.length > 0) {
      setSkills(skills.slice(0, skills.length - 1));
    }
  };

  // Handle Chip removal
  const removeSkill = (indexToRemove) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  // Handle Edit Profile
  const handleEditProfile = async () => {
    setErrorMessage("");

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/profile/edit`,
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          about: about.trim(),
          skills: skills.filter((skill) => skill.trim() !== ""),
          age: age,
          gender: gender.trim(),
          photoUrl: photoUrl.trim(),
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      showToast(res?.data?.message, "success");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <>
      <div className="flex gap-20 justify-center items-center">
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Edit</legend>

          {/* TODO: Add avatar upload modal */}
          {/* <div className="avatar w-full flex justify-center relative">
          <div className="w-24 rounded-full bg-gray-200">
            <img src={photoUrl} alt="Avatar" />
          </div>
          <p className="badge badge-xs absolute bottom-0 right-24 bg-gray-600 cursor-pointer rounded-full w-8 h-8">
            <CameraIcon />
          </p>
        </div> */}

          <label className="label">First Name</label>
          <input
            type="text"
            value={firstName}
            required
            className="input focus:border-none"
            placeholder="Type here"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            value={lastName}
            required
            className="input focus:border-none"
            placeholder="Type here"
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">About</label>
          <textarea
            value={about}
            required
            placeholder="Type here"
            className="textarea textarea-bordered w-full max-w-xs focus:border-none"
            onChange={(e) => setAbout(e.target.value)}
          />

          <label className="label">Age</label>
          <input
            type="number"
            value={age}
            required
            className="input focus:border-none"
            placeholder="Type here"
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Photo Url</label>
          <input
            type="text"
            value={photoUrl}
            required
            className="input focus:border-none"
            placeholder="Type here"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <label className="label">Gender</label>
          <select
            value={gender}
            className="select focus:border-none"
            onChange={(e) => setGender(e.target.value)}
          >
            <option disabled={true}>Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <label className="label">Skills</label>
          <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-base-100 border-double border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-gray-200">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-full text-sm"
              >
                <p className="text-black">{skill}</p>
                <p
                  onClick={() => removeSkill(index)}
                  className="text-black hover:text-error cursor-pointer"
                >
                  <CancelIcon />
                </p>
              </div>
            ))}
            <input
              type="text"
              value={inputChip}
              className="flex-grow min-w-[100px] outline-none border-none focus:ring-0 text-sm"
              placeholder="Type and press Enter"
              onChange={(e) => setInputChip(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {errorMessage && (
            <p className="mt-3 text-red-300">Error: {errorMessage}</p>
          )}

          <button className="btn btn-primary mt-4" onClick={handleEditProfile}>
            Save
          </button>
        </fieldset>

        <UserCard
          data={{ firstName, lastName, about, photoUrl, age, gender }}
          restrict={true}
        />
      </div>
    </>
  );
};

export default EditProfile;
