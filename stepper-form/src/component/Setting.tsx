import React from "react";
import { AppProps } from "./Profile";

export const Setting: React.FC<AppProps> = ({ data, setData }) => {
  const { theme } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      theme: e.target.value,
    }));
  };

  return (
    <div>
      <div>
        <label style={{ cursor: "pointer" }} htmlFor="dark">
          <input
            id="dark"
            type="radio"
            name="theme"
            value="dark"
            checked={theme === "dark"}
            onChange={handleChange}
          />
          Dark
        </label>
      </div>
      <div>
        <label style={{ cursor: "pointer" }} htmlFor="light">
          <input
            id="light"
            type="radio"
            name="theme"
            value="light"
            checked={theme === "light"}
            onChange={handleChange}
          />
          Light
        </label>
      </div>
    </div>
  );
};
