// change class on click function

import React from "react";
import { useState } from "react";

const ChangeClassOnClick = () => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div>
      <button
        className={` text-white rounded-md px-2 py-1 w-36 h-12 ${
          active ? "bg-yellow-500" : "transparent"
        }`}
        onClick={handleClick}
      >
        Lvl Up (10)
      </button>
    </div>
  );
};

export default ChangeClassOnClick;
