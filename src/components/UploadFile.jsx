import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

// Slices
import { updateUser } from "../utils/userSlice";

// Utils
import { useToast } from "../utils/ToastProvider";
import { Input } from "./ui";

const UploadFile = ({ user, setErrorMessage }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const fileInputRef = useRef(null);
  const [tempImage, setTempImage] = useState(null);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

  // Handle Modal Close
  const onModalClose = () => {
    setImage(null);
    setTempImage(null);
    setLoader(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle File Upload
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("photo", image);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/profile/photo`,
        formData,
        { withCredentials: true }
      );

      dispatch(updateUser({ ...user, photoUrl: res?.data?.data?.secureUrl }));
      showToast(res?.data?.message, "success");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }

    document.getElementById("my_modal_5").close();
    onModalClose();
  };

  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Photo</h3>
          <div className="flex flex-col gap-4 items-center">
            <div className="avatar w-full flex justify-center relative">
              <div
                className={`w-50 rounded-full bg-gray-200 ${
                  loader && "animate-pulse"
                } ${tempImage && "shadow-lg/30 shadow-success"}`}
              >
                <img src={tempImage ? tempImage : user.photoUrl} alt="Avatar" />
              </div>
            </div>

            <Input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                setImage(e.target.files[0]);
                setTempImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
          <div className="modal-action">
            <form method={"dialog"}>
              <button className="btn btn-soft" onClick={onModalClose}>
                Close
              </button>
              <button
                disabled={!image || loader}
                className="btn btn-primary ml-4"
                onClick={() => {
                  setLoader(true);
                  handleFileUpload();
                }}
              >
                {loader && <span className="loading loading-spinner"></span>}
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UploadFile;
