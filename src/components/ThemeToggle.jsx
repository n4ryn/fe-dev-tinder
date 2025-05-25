// ThemeToggle.jsx
import { useEffect, useState } from "react";
import { DarkModeIcon, LightModeIcon } from "../utils/Icon";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "sunset");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "sunset" : "light");
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        value="sunset"
        onChange={handleToggle}
        checked={theme === "sunset"}
      />

      <LightModeIcon />
      <DarkModeIcon />
    </label>
  );
};

export default ThemeToggle;
