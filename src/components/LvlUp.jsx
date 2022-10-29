import React from "react";
import DamageLvl from "./DamageLvl";
import SkillLvlUp from "./skillTree/SkillLvlUp";
import { useStateContext } from "../context/StateContext";

const LvlUp = () => {
  const {
    heroClass,
    chooseHeroClass,
    monster,
    setMonster,
    gameState,
    setGameState,
    fight,
    skillTab,
    changeSkillTab,
  } = useStateContext();

  // destructure gameState
  const {
    damage,
    support,
    special,
    gems,
    exp,
    damageSkillPoints,
    supportSkillPoints,
    specialSkillPoints,
    damageClassLvl,
    supportClassLvl,
    specialClassLvl,
  } = gameState;

  // destructure heroClass
  const {
    damage: damageClass,
    support: supportClass,
    special: specialClass,
  } = heroClass;

  const firstLevel =
    damageClassLvl >= 0 || supportClassLvl >= 0 || specialClassLvl >= 0;

  return (
    <div className="flex flex-col gap-4 ">
      <DamageLvl />
      {firstLevel && <SkillLvlUp />}
    </div>
  );
};

export default LvlUp;
