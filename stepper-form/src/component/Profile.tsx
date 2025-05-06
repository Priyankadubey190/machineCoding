import React from "react";
import { DataType } from "./TabForm";
import styles from "./profile.module.scss";

export interface AppProps {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  error?: { [key in keyof DataType]?: string };
}

export const Profile: React.FC<AppProps> = ({ data, error, setData }) => {
  const { name, age, email } = data;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.profileForm}>
      <div>
        <div>
          {" "}
          <label htmlFor="">Name : </label>
        </div>
        <div>
          {" "}
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {error?.name && <span>{error?.name}</span>}
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="">Age : </label>
        </div>
        <div>
          <input
            type="number"
            value={age}
            name="age"
            onChange={(e) => handleChange(e)}
          />
          {error?.age && <span>{error?.age}</span>}
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="">Email : </label>
        </div>
        <div>
          <input
            type="text"
            value={email}
            name="email"
            onChange={(e) => handleChange(e)}
          />
          {error?.email && <span>{error?.email}</span>}
        </div>
      </div>
    </div>
  );
};
