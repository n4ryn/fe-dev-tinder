import { useState } from "react";

// Icons
import { EyeOnIcon, EyeOffIcon } from "../../utils/Icon";

const Input = (props) => {
  const { label, value, type, ...other } = props;

  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";
  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="relative">
      <label className="label">{label}</label>
      <input
        type={inputType}
        value={value}
        className={type === "file" ? "file-input" : "input focus:border-none"}
        placeholder="Type here"
        {...other}
      />
      {isPasswordType && (
        <span
          className="absolute right-3 top-1/2 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOffIcon /> : <EyeOnIcon />}
        </span>
      )}
    </div>
  );
};

export default Input;
