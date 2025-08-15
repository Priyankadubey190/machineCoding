import React from "react";
import { data } from "../constant";
import type { AccordionData } from "../constant";
import "./accordian.scss";

const Accordian = () => {
  const [activeId, setActiveId] = React.useState<number | null>(null);

  const handleToggle = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };
  return (
    <div className="accordion">
      {data &&
        data.map((item: AccordionData) => (
          <div key={item.id} className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                onClick={() => handleToggle(item.id)}
              >
                {item.title}
              </button>
              <button onClick={() => handleToggle(item.id)}>
                {activeId === item.id ? "-" : "+"}
              </button>
            </h2>
            {activeId === item.id && (
              <div
                className={`{accordion-content ${
                  activeId === item.id ? "active" : ""
                }`}
              >
                {item.content}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Accordian;
