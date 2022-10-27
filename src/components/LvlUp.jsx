import React from "react";
import DamageLvl from "./DamageLvl";

const LvlUp = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl">Level Up</p>
      <div className="flex justify-center ">
        <p className="text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer">
          Damage
        </p>
        <p className="text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer">
          Support
        </p>
        <p className="text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer">
          Special
        </p>
      </div>
      <div className="flex flex-col">
        <p>Level: 0</p>
        <p>Skill points aviable: 0</p>
      </div>
      <DamageLvl />
    </div>
  );
};

export default LvlUp;
