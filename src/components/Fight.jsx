import React from "react";
import { useStateContext } from "../context/StateContext";
import { useEffect } from "react";

const Fight = () => {
  const {
    heroClass,
    chooseHeroClass,
    monster,
    setMonster,
    gameState,
    setGameState,
    fight,
    nFormatter,
  } = useStateContext();

  // destructure gameState
  const {
    damage,
    support,
    special,
    gold,
    gems,
    exp,
    currentDamage,
    wave,
    killTime,
  } = gameState;

  // destructure heroClass
  const {
    damage: damageClass,
    support: supportClass,
    special: specialClass,
  } = heroClass;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-col items-center">
        <p className="text-xl font-semibold ">
          Wave {wave}{" "}
          <span className="text-sm font-semibold underline">
            {wave % 10 === 0 ? "Boss" : ""}
            {wave % 10 === 5 ? "mini-Boss" : ""}
          </span>{" "}
        </p>

        <p className="text-md">Monster HP: {nFormatter(monster.hp)}</p>
        <p className="text-md">Your Attack: {currentDamage}</p>
        {/* time to kill */}
        <p className="text-md">Time to kill: {killTime / 1000}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">Choose your Hero</p>
        <div className="flex gap-4 items-center justify-center mt-4">
          <button
            onClick={chooseHeroClass}
            name="damage"
            value="damage"
            className={`damage  p-2 rounded-md border-2 border-yellow-500 ${
              damageClass ? "bg-yellow-500" : "transparent"
            }`}
          >
            Damage
          </button>
          <button
            onClick={chooseHeroClass}
            name="support"
            value="support"
            className={`support  p-2 rounded-md border-2 border-yellow-500 ${
              supportClass ? "bg-yellow-500" : "transparent"
            }`}
          >
            Support
          </button>
          <button
            onClick={chooseHeroClass}
            name="special"
            value="special"
            className={`special  p-2 rounded-md border-2 border-yellow-500 ${
              specialClass ? "bg-yellow-500" : "transparent"
            }`}
          >
            Special
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fight;
