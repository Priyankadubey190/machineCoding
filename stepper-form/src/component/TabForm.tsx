import { Profile } from "./Profile";
import { Interest } from "./Interest";
import { Setting } from "./Setting";
import styles from "./TabForm.module.scss";
import { useState } from "react";

export interface DataType {
  name?: string;
  age?: number;
  email?: string;
  interests?: string[];
  theme?: string;
}

export interface ErrorType {
  name?: string;
  age?: string;
  email?: string;
  interests?: string;
  theme?: string;
}

export const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState<DataType>({
    name: "Riya",
    age: 20,
    email: "riya@gmail.com",
    interests: ["reading", "coding", "traveling"],
    theme: "dark",
  });

  const [error, setError] = useState<ErrorType>({});
  const tab = [
    {
      label: "Profile",
      component: Profile,
      validate: (data: DataType) => {
        const { name, age, email } = data;
        const errors: ErrorType = {};

        if (!name || name.trim().length < 2) {
          errors.name = "Name is required";
        }
        if (!age || age < 18) {
          errors.age = "Age is required";
        }
        if (!email) {
          errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = "Email is invalid";
        }

        setError(errors);
        return Object.keys(errors).length === 0;
      },
    },
    {
      label: "Interest",
      component: Interest,
      validate: (data: DataType) => {
        const { interests } = data;
        const errors: ErrorType = {};

        if (!interests || interests.length === 0) {
          errors.interests = "At least one interest is required";
        }

        setError(errors);
        return Object.keys(errors).length === 0;
      },
    },
    {
      label: "Setting",
      component: Setting,
      validate: (data: DataType) => {
        const { theme } = data;
        const errors: ErrorType = {};

        if (!theme) {
          errors.theme = "Theme is required";
        }

        setError(errors);
        return Object.keys(errors).length === 0;
      },
    },
  ];

  const ActiveTabContent = tab[activeTab].component;
  const handlePrevClick = () => {
    if (tab[activeTab].validate(data)) {
      setActiveTab((prev) => prev - 1);
    }
  };
  const handleNextClick = () => {
    if (tab[activeTab].validate(data)) {
      setActiveTab((prev) => prev + 1);
    }
  };
  const handleSubmitClick = () => {
    if (tab[activeTab].validate(data)) console.log("Data submitted:", data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        {tab.map((item, index) => {
          return (
            <div
              className={styles.tab}
              key={index}
              onClick={() => {
                if (tab[activeTab].validate(data)) setActiveTab(index);
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
      <div className={styles.tabContent}>
        <ActiveTabContent data={data} setData={setData} error={error} />
      </div>

      <div
        style={{
          width: "200px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {activeTab > 0 && <button onClick={handlePrevClick}>Prev</button>}
        {activeTab < tab.length - 1 && (
          <button onClick={handleNextClick}>Next</button>
        )}
        {activeTab === tab.length - 1 && (
          <button onClick={handleSubmitClick}>Submit</button>
        )}
      </div>
    </div>
  );
};
