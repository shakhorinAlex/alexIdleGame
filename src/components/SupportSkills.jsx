import React from "react";

const DamageLvl = () => {
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

export default DamageLvl;
