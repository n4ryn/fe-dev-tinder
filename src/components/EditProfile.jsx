import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useToast } from "../context/ToastProvider";

import { CameraIcon } from "../utils/Icon";
import { addUser } from "../utils/userSlice";

import { ChipInput, Input, Select, TextArea } from "./ui";
import UploadFile from "./UploadFile";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const [updatedData, setUpdatedData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    about: user?.about || "",
    skills: user?.skills || [],
    age: user?.age || "",
    gender: user?.gender || "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Handle Edit Profile
  const handleEditProfile = async () => {
    setErrorMessage("");

    const updatedFields = {};

    // Filter out empty fields
    Object.keys(updatedData).forEach(key => {
      if (key === "skills") {
        const originalSkills = (user.skills || [])
          .map(skill => skill.trim())
          .filter(Boolean);
        const updatedSkills = (updatedData.skills || [])
          .map(skill => skill.trim())
          .filter(Boolean);

        const skillsChanged =
          originalSkills.length !== updatedSkills.length ||
          !updatedSkills.every((skill, i) => skill === originalSkills[i]);

        if (skillsChanged) {
          updatedFields.skills = updatedSkills;
        }
      } else if (key === "age" && updatedData.age !== user.age) {
        updatedFields.age = updatedData.age;
      } else if (
        updatedData[key] !== user[key] &&
        typeof updatedData[key] === "string" &&
        updatedData[key].trim()
      ) {
        updatedFields[key] = updatedData[key].trim();
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      showToast("Update at least one field", "error");
      return;
    }

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/profile/edit`,
        updatedFields,
        { withCredentials: true },
      );

      dispatch(addUser({ ...user, ...res?.data?.data }));
      showToast(res?.data?.message, "success");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-20 justify-center items-center">
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Edit</legend>

          <div className=" avatar w-full flex justify-center relative">
            <div className="w-24 rounded-full">
              <img src={user.photoUrl} alt="Avatar" />
            </div>
            <p
              className="absolute top-16 right-24 badge bg-base-100 shadow-md/30 shadow-accent rounded-full cursor-pointer size-10"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <CameraIcon />
            </p>
          </div>

          <Input
            type="text"
            label="First Name"
            value={updatedData.firstName}
            onChange={e =>
              setUpdatedData({
                ...updatedData,
                firstName: e.target.value,
              })
            }
          />

          <Input
            type="text"
            label="Last Name"
            value={updatedData.lastName}
            onChange={e =>
              setUpdatedData({
                ...updatedData,
                lastName: e.target.value,
              })
            }
          />

          <TextArea
            label="About"
            value={updatedData.about}
            onChange={e =>
              setUpdatedData({
                ...updatedData,
                about: e.target.value,
              })
            }
          />

          <Input
            type="number"
            label="Age"
            value={updatedData.age}
            onChange={e =>
              setUpdatedData({
                ...updatedData,
                age: Number(e.target.value),
              })
            }
          />

          <Select
            label="Gender"
            value={updatedData.gender}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Others", value: "others" },
            ]}
            onChange={e =>
              setUpdatedData({
                ...updatedData,
                gender: e.target.value,
              })
            }
          />

          <ChipInput
            label="Skills"
            value={updatedData.skills}
            onChange={e => setUpdatedData({ ...updatedData, skills: e })}
          />

          {errorMessage && (
            <p className="mt-3 text-red-300">Error: {errorMessage}</p>
          )}

          <button className="btn btn-primary mt-4" onClick={handleEditProfile}>
            Save
          </button>
        </fieldset>

        <UserCard
          data={{ ...updatedData, photoUrl: user.photoUrl }}
          restrict={true}
        />
      </div>

      <UploadFile user={user} setErrorMessage={setErrorMessage} />
    </>
  );
};

export default EditProfile;
