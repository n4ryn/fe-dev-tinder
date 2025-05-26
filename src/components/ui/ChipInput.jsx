import { useState } from "react";

// Icons
import { CancelIcon } from "../../utils/Icon";

const ChipInput = (props) => {
  const { label, value = [], onChange = () => {} } = props;

  const [inputValue, setInputValue] = useState("");

  // Handle Chip addition
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    }

    if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      onChange(value.slice(0, value.length - 1));
    }
  };

  // Handle Chip removal
  const handleRemove = (indexToRemove) => {
    const updated = value.filter((_, index) => index !== indexToRemove);
    onChange(updated);
  };

  return (
    <>
      <label className="label">{label}</label>
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-base-100 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-gray-200">
        {value.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-full text-sm"
          >
            <span className="text-black">{item}</span>
            <span
              onClick={() => handleRemove(index)}
              className="text-black hover:text-error cursor-pointer"
            >
              <CancelIcon fontSize="small" />
            </span>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          className="flex-grow min-w-[100px] outline-none border-none focus:ring-0 text-sm bg-transparent"
          placeholder="Type and press Enter"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
};

export default ChipInput;
