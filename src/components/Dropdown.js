import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (event) => {
      // Checks whether or not, the element which was clicked on (i.e., event.target) is inside of our component (i.e., ref.current)
      if (ref.current.contains(event.target)) {
        return;
      }

      // Close it if the above condition is false (it means the event was outside the dropdown parent div)
      setOpen(false);
    });
  }, []);

  const renderedOptions = options.map((option) => {
    // Dont show the selected value again in the list as duplicate.
    if (option.value == selected.value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">Select a Color</label>
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
