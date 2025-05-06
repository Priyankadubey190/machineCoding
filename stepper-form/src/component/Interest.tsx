import React from "react";
import { AppProps } from "./Profile";
import styles from "./interest.module.scss";

export const Interest: React.FC<AppProps> = ({ data, error, setData }) => {
  const { interests } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setData((prev) => ({
        ...prev,
        interests: [...(prev.interests || []), name],
      }));
    } else {
      setData((prev) => ({
        ...prev,
        interests: prev.interests?.filter((interest) => interest !== name),
      }));
    }
  };

  return (
    <div className={styles.interest}>
      <div>
        <label htmlFor="coding">
          <input
            id="coding"
            type="checkbox"
            name="coding"
            value="coding"
            checked={interests?.includes("coding")}
            onChange={handleChange}
          />
          Coding
        </label>
      </div>
      <div>
        <label htmlFor="game">
          <input
            id="game"
            type="checkbox"
            name="game"
            checked={interests?.includes("game")}
            onChange={handleChange}
          />
          Game
        </label>
      </div>
      <div>
        <label htmlFor="reading">
          <input
            id="reading"
            type="checkbox"
            name="reading"
            checked={interests?.includes("reading")}
            onChange={handleChange}
          />
          Reading
        </label>
      </div>
      <div>
        <label htmlFor="traveling">
          <input
            id="traveling"
            type="checkbox"
            name="traveling"
            checked={interests?.includes("traveling")}
            onChange={handleChange}
          />
          Traveling
        </label>
        {error?.interests && <span>{error?.interests}</span>}
      </div>
    </div>
  );
};
