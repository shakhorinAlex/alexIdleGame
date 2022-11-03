import React, { useEffect } from "react";
import { useStateContext } from "../../context/StateContext";

const SpecialTree = () => {
  const { heroClass, gameState, setGameState, lvlUp, setLvlUp, round } =
    useStateContext();

  // destructure gameState
  const {
    damage,
    support,
    special,
    gold,
    currentDamage,
    specialSkillPoints,
    expMult,
    goldMult,
    wave,
  } = gameState;

  // destructure heroClass
  const {
    damage: damageClass,
    support: supportClass,
    special: specialClass,
  } = heroClass;

  // destructure lvlUp.skillTree.specialClassSkill.damage1 || 2 || 3
  const {
    baseGold1: baseGold1Skill,
    baseExp1: baseExp1Skill,
    goldGainMult1: goldGainMult1Skill,
    expGainMult1: exGainMult1Skill,
  } = lvlUp.skillTree.specialClassSkill;

  const specialSkillArray = [
    baseGold1Skill,
    baseExp1Skill,
    goldGainMult1Skill,
    exGainMult1Skill,
  ];

  // function to change choosen value of a skill on click in map function
  const changeChoosen = (skill) => {
    const newSkillsArray = specialSkillArray.map((specSkill) => {
      if (specSkill.id === skill.id) {
        return { ...specSkill, choosen: true };
      } else {
        return { ...specSkill, choosen: false };
      }
    });
    setLvlUp({
      ...lvlUp,
      skillTree: {
        ...lvlUp.skillTree,
        specialClassSkill: {
          ...lvlUp.skillTree.specialClassSkill,
          baseGold1: newSkillsArray[0],
          baseExp1: newSkillsArray[1],
          goldGainMult1: newSkillsArray[2],
          expGainMult1: newSkillsArray[3],
        },
      },
    });
  };

  const choosenSkill = specialSkillArray.filter(
    (skill) => skill.choosen === true
  );
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
    type,
    increase,
    waveUnlock,
  } = choosenSkill[0];

  // disabled button
  const disabled = !unlocked || lvl === maxLvl || specialSkillPoints < cost;
  const disabledButton = "bg-gray-500 text-gray-200 cursor-not-allowed";
  const enabledButton = "bg-emerald-500";

  // function to level up skill on click with skillpoints from gameState
  const levelUpSkill = () => {
    if (specialSkillPoints >= cost && lvl < maxLvl) {
      // create copy of lvlUp
      const newLvlUp = { ...lvlUp };

      // create copy of game state
      const newGameState = { ...gameState };

      newLvlUp.skillTree.specialClassSkill[id].lvl = lvl + 1;

      if (type === "goldBase") {
        newGameState.goldBaseGain = newGameState.goldBaseGain + increase;
      } else if (type === "expBase") {
        newGameState.expBaseGain = newGameState.expBaseGain + increase;
      } else if (type === "goldMult") {
        newGameState.goldMult = newGameState.goldMult + mult;
      } else if (type === "expMult") {
        newGameState.expMult = newGameState.expMult + mult;
      }

      // if choosen skill is waveSkip1

      // newLvlUp.skillTree.dmgSkillMult = newLvlUp.skillTree.dmgSkillMult + mult;

      // set new game state
      newGameState.specialSkillPoints = specialSkillPoints - cost;
      // increase damage class level by 1

      setLvlUp(newLvlUp);
      setGameState(newGameState);
    }
  };

  // random number generator from 1 to 100

  useEffect(() => {
    specialSkillArray.forEach((skill) => {
      if (wave > skill.waveUnlock) {
        skill.unlocked = true;
      }
    });

    // // set to state
    // setLvlUp({
    //   ...lvlUp,
    //   skillTree: {
    //     ...lvlUp.skillTree,
    //     specialClassSkill: {
    //       ...lvlUp.skillTree.specialClassSkill,
    //       damage1: specialSkillArray[0],
    //       damage2: specialSkillArray[1],
    //       damage3: specialSkillArray[2],
    //     },
    //   },
    // });
  }, [wave]);

  // if choosen skill dont have mult then show increase instead
  const nextLvl = lvl < maxLvl ? lvl + 1 : lvl;
  const showMult = mult
    ? nextLvl * round(mult * 100) + "%"
    : nextLvl * increase;

  const skills = specialSkillArray.map((skill, id) => {
    const { shortName, unlocked, choosen } = skill;

    const unlockedStyle = unlocked ? "bg-emerald-500" : "bg-gray-800";
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
    <div className="flex flex-col items-center mt-6 gap-4 h-full ">
      <div className="flex gap-2 items-start justify-start overflow-x-auto w-full md:items-center md:justify-center">
        {skills}
      </div>

      {/* <span className="font-light text-xs">+10% all damage</span> */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center bg-gray-900 w-full py-8 px-8">
        <div className="flex flex-col col-span-2 md:flex-col md:text-left md:w-1/4">
          <h2 className="font-semibold text-center md:text-left">{name}</h2>
          <div className="flex gap-2 items-center justify-start md:items-start md:flex-col md:text-left">
            <p className="text-sm order-first">Level {lvl}</p>
            <span className="text-xs font-thin">max lvl: {maxLvl}</span>
            <span className="text-xs font-thin">
              {lvl === maxLvl ? "bonus:" : "next lvl:"} ({showMult})
            </span>
          </div>
        </div>
        <div className="description px-6 flex flex-col gap-2">
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
        <div className="flex flex-col items-center justify-center w-1/4 ">
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

export default SpecialTree;
