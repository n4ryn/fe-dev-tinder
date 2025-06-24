import { useEffect, useState } from "react";

// Icons
import { DarkModeIcon, LightModeIcon } from "../utils/Icon";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "sunset");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = e => {
    setTheme(e.target.checked ? "sunset" : "light");
  };

  return (
    <label className="swap swap-rotate hover:scale-110 transition-transform duration-300">
      <input
        type="checkbox"
        className="theme-controller"
        value="sunset"
        onChange={handleToggle}
        checked={theme === "sunset"}
      />

      <DarkModeIcon />
      <LightModeIcon />
    </label>
  );
};

export default ThemeToggle;
