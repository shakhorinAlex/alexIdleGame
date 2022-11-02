import React from "react";
import { useStateContext } from "../../context/StateContext";
import DamageTree from "./DamageTree";
import SupportTree from "./SupportTree";
import SpecialTree from "./SpecialTree";

const SkillLvlUp = () => {
  const {
    heroClass,
    chooseHeroClass,
    gameState,
    setGameState,
    skillTab,
    changeSkillTab,
  } = useStateContext();

  const {
    damage,
    support,
    special,
    exp,
    damageSkillPoints,
    supportSkillPoints,
    specialSkillPoints,
    damageClassLvl,
    supportClassLvl,
    specialClassLvl,
  } = gameState;

  const skillName = skillTab
    ? skillTab[0].toUpperCase() + skillTab.slice(1)
    : "";

  const skillPoints = skillTab ? eval(skillTab + "SkillPoints") : 0;
  const skillLvl = skillTab ? eval(skillTab + "ClassLvl") : 0;

  return (
    <div className="skillPoints mt-4">
      <p className="text-2xl mb-4">Skill Points</p>
      {/* wrap text */}

      <p className="text-xs mb-6 mx-auto w-1/2">
        You can get skill points by lvling your Heroes. Bonuses from this
        section will greatly boost your progress and they don't reset.
      </p>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => changeSkillTab("damage")}
          className={`text-md p-2 px-6 border-solid border-2 border-veryLightPurple 
        ${skillTab === "damage" ? "bg-veryLightPurple" : "transparent"}`}
        >
          Damage
        </button>
        <button
          onClick={() => changeSkillTab("support")}
          className={`text-md p-2 px-6 border-solid border-2 border-veryLightPurple 
        ${skillTab === "support" ? "bg-veryLightPurple" : "transparent"}`}
        >
          Support
        </button>
        <button
          onClick={() => changeSkillTab("special")}
          className={`text-md p-2 px-6 border-solid border-2 border-veryLightPurple 
        ${skillTab === "special" ? "bg-veryLightPurple" : "transparent"}`}
        >
          Special
        </button>
      </div>
      {skillTab && (
        <div className="flex flex-col">
          <p>
            {skillName} class level: {skillLvl}
          </p>
          <p>You have {skillPoints} skill points left to spend</p>
        </div>
      )}
      {skillTab === "damage" && <DamageTree />}
      {skillTab === "support" && <SupportTree />}
      {skillTab === "special" && <SpecialTree />}

      {/* <DamageTree /> */}
    </div>
  );
};

export default SkillLvlUp;
