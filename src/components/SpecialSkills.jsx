import React from "react";

const SpecialSkills = () => {
  specialsSkills = [
    {
      name: "Exp Gain",
      lvl: 0,
      maxLvl: 10,
      description: "Increace exp gain by 5%",
      cost: 1,
      costMultiplier: 2.25,
      effect: 0.05,
      effectMultiplier: 1.5,
    },
    {
      name: "Gold Gain",
      lvl: 0,
      maxLvl: 9999,
      description: "Increace gold gain by 10%",
      cost: 1,
      costMultiplier: 1.5,
      effect: 0.1,
      effectMultiplier: 1.5,
    },

    {
      name: "Gems Gain",
      lvl: 0,
      maxLvl: 100,
      description: "Increace gems gain per Boss by 5",
      cost: 5,
      costMultiplier: 1.25,
      effect: 5,
      effectMultiplier: 1.5,
    },

    {
      name: "Game Speed",
      lvl: 0,
      description: "Increace game speed by 5%",
      cost: 10,
      costMultiplier: 1.5,
      effect: 0.05,
      effectMultiplier: 1.5,
    },
  ];

  return (
    <div className="flex flex-col gap-4 ">
      <p className="text-2xl mb-4">Damage</p>
      <div className="flex flex-row gap-2 justify-between items-center">
        <div className="flex-col align-start justify-start text-left">
          <p className="text-md">Damage lvl: 0</p>
          <p className="text-md">Damage: 1</p>
        </div>
        <button className="bg-yellow-500 text-white rounded-md px-2 py-1 w-36 h-12">
          Lvl Up (10)
        </button>
      </div>
    </div>
  );
};

export default SpecialSkills;
