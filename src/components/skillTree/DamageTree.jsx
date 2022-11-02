import React, { useEffect } from "react";
import { useStateContext } from "../../context/StateContext";

const DamageTree = () => {
  const { heroClass, gameState, setGameState, lvlUp, setLvlUp, round } =
    useStateContext();

  // destructure gameState
  const {
    damage,
    support,
    special,
    gold,
    currentDamage,
    dmgLvl,
    dmgLvlCost,
    dmgMultiplier,
    damageSkillPoints,
    damageClassLvl,
    wave,
  } = gameState;

  // destructure heroClass
  const {
    damage: damageClass,
    support: supportClass,
    special: specialClass,
  } = heroClass;

  // destructure lvlUp.skillTree.damageClassSkills.damage1 || 2 || 3
  const {
    damage1: damage1Skill,
    damage2: damage2Skill,
    damage3: damage3Skill,
  } = lvlUp.skillTree.damageClassSkills;

  const dmgSkillsArray = [damage1Skill, damage2Skill, damage3Skill];

  // function to change choosen value of a skill on click in map function
  const changeChoosen = (skill) => {
    const newSkillsArray = dmgSkillsArray.map((dmgSkill) => {
      if (dmgSkill.id === skill.id) {
        return { ...dmgSkill, choosen: true };
      } else {
        return { ...dmgSkill, choosen: false };
      }
    });
    setLvlUp({
      ...lvlUp,
      skillTree: {
        ...lvlUp.skillTree,
        damageClassSkills: {
          ...lvlUp.skillTree.damageClassSkills,
          damage1: newSkillsArray[0],
          damage2: newSkillsArray[1],
          damage3: newSkillsArray[2],
        },
      },
    });
    // console.log(newDmgSkillsArray.filter((skill) => skill.choosen === true));
  };

  const choosenSkill = dmgSkillsArray.filter((skill) => skill.choosen === true);
  // destructured choosenSkill
  const {
    id,
    name,
    description,
    lvl,
    cost,
    mult,
    maxLvl,
    unlocked,
    prevMaxed,
    waveUnlock,
  } = choosenSkill[0];

  // disabled button
  const disabled = !unlocked || lvl === maxLvl || damageSkillPoints < cost;
  const disabledButton = "bg-gray-500 text-gray-200 cursor-not-allowed";
  const enabledButton = "bg-red-500";

  // function to level up skill on click with skillpoints from gameState
  const levelUpSkill = () => {
    if (damageSkillPoints >= cost && lvl < maxLvl) {
      // create copy of lvlUp
      const newLvlUp = { ...lvlUp };

      // create copy of game state
      const newGameState = { ...gameState };

      // set new lvlUp
      newLvlUp.skillTree.damageClassSkills[id].lvl = lvl + 1;
      // newLvlUp.skillTree.damageClassSkills.dmgSkillMult =
      // newLvlUp.skillTree.damageClassSkills.dmgSkillMult + mult;
      // increse dmgSkillMult from skilltree by mult
      newLvlUp.skillTree.dmgSkillMult = newLvlUp.skillTree.dmgSkillMult + mult;

      // set new game state
      newGameState.damageSkillPoints = damageSkillPoints - cost;
      // increase damage class level by 1
      newGameState.damageClassLvl = damageClassLvl + 1;

      // next skill unlocked to true

      // if (lvl === maxLvl) {
      //   newLvlUp.skillTree.damageClassSkills[id + 1].prevMaxed = true;
      // }

      // set new lvlUp and new game state
      setLvlUp(newLvlUp);
      setGameState(newGameState);
    }
  };

  useEffect(() => {
    dmgSkillsArray.forEach((skill) => {
      if (wave > skill.waveUnlock) {
        skill.unlocked = true;
      }
    });

    // set to state
    setLvlUp({
      ...lvlUp,
      skillTree: {
        ...lvlUp.skillTree,
        damageClassSkills: {
          ...lvlUp.skillTree.damageClassSkills,
          damage1: dmgSkillsArray[0],
          damage2: dmgSkillsArray[1],
          damage3: dmgSkillsArray[2],
        },
      },
    });
  }, [wave]);

  // set next skill unlocked to true previous skill is maxed out

  const skills = dmgSkillsArray.map((skill, id) => {
    const { shortName, unlocked, choosen } = skill;

    const unlockedStyle = unlocked ? "bg-red-500" : "bg-gray-800";
    const choosenStyle = choosen ? "border-2 border-gray-400" : " ";

    return (
      <div
        key={id}
        className={`flex flex-col items-center justify-center w-20 h-20 p-6 mb-4 rounded ${unlockedStyle} ${choosenStyle} text-gray-100 font-semibold cursor-pointer`}
        onClick={() => changeChoosen(skill)}
      >
        <p>{shortName}</p>
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center mt-6 gap-4 h-full">
      {/* map array dmgSkillsArray */}
      <div className="flex gap-2">{skills}</div>

      {/* <span className="font-light text-xs">+10% all damage</span> */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center bg-gray-900 w-full py-8 px-8">
        <div className="flex flex-col col-span-2 md:flex-col md:text-left md:w-1/4">
          <h2 className="font-semibold text-center md:text-left">{name}</h2>
          <div className="flex gap-2 items-center justify-start md:items-start md:flex-col md:text-left">
            <p className="text-sm order-first">Level {lvl}</p>
            <span className="text-xs font-thin">max lvl: {maxLvl}</span>
            <span className="text-xs font-thin">
              {lvl === maxLvl ? "bonus:" : "next lvl:"} (
              {lvl !== maxLvl
                ? round((lvl + 1) * (mult * 100))
                : round(lvl * (mult * 100))}
              %)
            </span>
          </div>
        </div>
        <div className="description description px-6 flex flex-col gap-2">
          <p className="text-sm">{description}</p>
          {!unlocked && (
            <div className="">
              <p className="text-xs font-bold">
                This skill is not unlocked yet
              </p>
              <p
                className={`text-xs ${
                  wave > waveUnlock
                    ? "text-emerald-600 font-normal"
                    : "text-gray-500 font-thin"
                }`}
              >
                wave {waveUnlock}
              </p>
              <p
                className={`text-xs ${
                  wave > waveUnlock
                    ? "text-emerald-600 font-normal"
                    : "text-gray-500 font-thin"
                }`}
              >
                max previous skill
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm mb-2">Cost: {cost}</p>
          <button
            // lvl on click
            onClick={levelUpSkill}
            // disabled if not unlocked

            disabled={disabled}
            className={`${
              disabled ? disabledButton : enabledButton
            } text-white rounded-md px-2 py-1 w-28 h-12`}
          >
            <p className="font-bold text-sm">Lvl Up</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DamageTree;
