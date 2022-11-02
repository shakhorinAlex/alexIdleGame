import React, { useEffect } from "react";
import { useStateContext } from "../../context/StateContext";

const SupportTree = () => {
  const { heroClass, gameState, setGameState, lvlUp, setLvlUp, round } =
    useStateContext();

  // destructure gameState
  const {
    damage,
    support,
    special,
    gold,
    currentDamage,
    supportSkillPoints,
    attackSpeedMult,
    skipChance,
    wave,
  } = gameState;

  // destructure heroClass
  const {
    damage: damageClass,
    support: supportClass,
    special: specialClass,
  } = heroClass;

  // destructure lvlUp.skillTree.supportClassSkill.damage1 || 2 || 3
  const {
    atkSpd1: atkSpd1Skill,
    waveSkip1: waveSkip1Skill,
    atkSpd2: atkSpd2Skill,
  } = lvlUp.skillTree.supportClassSkill;

  const supportSkillArray = [atkSpd1Skill, waveSkip1Skill, atkSpd2Skill];

  // function to change choosen value of a skill on click in map function
  const changeChoosen = (skill) => {
    const newSkillsArray = supportSkillArray.map((supSkill) => {
      if (supSkill.id === skill.id) {
        return { ...supSkill, choosen: true };
      } else {
        return { ...supSkill, choosen: false };
      }
    });
    setLvlUp({
      ...lvlUp,
      skillTree: {
        ...lvlUp.skillTree,
        supportClassSkill: {
          ...lvlUp.skillTree.supportClassSkill,
          atkSpd1: newSkillsArray[0],
          waveSkip1: newSkillsArray[1],
          atkSpd2: newSkillsArray[2],
        },
      },
    });
    // console.log(newsupportSkillArray.filter((skill) => skill.choosen === true));
  };

  const choosenSkill = supportSkillArray.filter(
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
    waveUnlock,
  } = choosenSkill[0];

  // disabled button
  const disabled = !unlocked || lvl === maxLvl || supportSkillPoints < cost;
  const disabledButton = "bg-gray-500 text-gray-200 cursor-not-allowed";
  const enabledButton = "bg-sky-500";

  // function to level up skill on click with skillpoints from gameState
  const levelUpSkill = () => {
    if (supportSkillPoints >= cost && lvl < maxLvl) {
      // create copy of lvlUp
      const newLvlUp = { ...lvlUp };

      // create copy of game state
      const newGameState = { ...gameState };

      // set new lvlUp
      newLvlUp.skillTree.supportClassSkill[id].lvl = lvl + 1;
      if (id === "waveSkip1") {
        newGameState.skipChance += mult * 100;
      } else {
        newGameState.attackSpeedMult = attackSpeedMult - mult;
      }

      // if choosen skill is waveSkip1

      // newLvlUp.skillTree.dmgSkillMult = newLvlUp.skillTree.dmgSkillMult + mult;

      // set new game state
      newGameState.supportSkillPoints = supportSkillPoints - cost;
      // increase damage class level by 1

      // log skill attackSpeedMult
      console.log(newGameState.attackSpeedMult);
      console.log(newGameState.skipChance);
      console.log(newLvlUp.skillTree.supportClassSkill[id].mult);
      setLvlUp(newLvlUp);
      setGameState(newGameState);
    }
  };

  // random number generator from 1 to 100

  useEffect(() => {
    supportSkillArray.forEach((skill) => {
      if (wave > skill.waveUnlock) {
        skill.unlocked = true;
      }
    });

    // set to state
    setLvlUp({
      ...lvlUp,
      skillTree: {
        ...lvlUp.skillTree,
        supportClassSkill: {
          ...lvlUp.skillTree.supportClassSkill,
          damage1: supportSkillArray[0],
          damage2: supportSkillArray[1],
          damage3: supportSkillArray[2],
        },
      },
    });
  }, [wave]);

  // set next skill unlocked to true previous skill is maxed out

  return (
    <div className="flex flex-col items-center mt-6 gap-4 h-full">
      {/* map array supportSkillArray */}
      <div className="flex gap-2">
        {supportSkillArray.map((skill, id) => {
          const { shortName, unlocked, choosen } = skill;

          const unlockedStyle = unlocked ? "bg-sky-500" : "bg-gray-800";
          const choosenStyle = choosen ? "border-2 border-gray-400" : " ";

          return (
            <div
              key={id}
              className={`flex flex-col items-center justify-center p-1 rounded ${unlockedStyle} ${choosenStyle} w-20 h-20 text-gray-100 font-semibold cursor-pointer`}
              onClick={() => changeChoosen(skill)}
            >
              <p>{shortName}</p>
            </div>
          );
        })}
      </div>

      {/* <span className="font-light text-xs">+10% all damage</span> */}
      <div className="flex justify-between mx-auto gap-4 items-center bg-gray-900 w-full mt-auto py-8 px-8">
        <div className="flex-col text-left w-1/4">
          <h2 className="font-semibold">{name}</h2>
          <span className="text-xs font-thin">max lvl: {maxLvl}</span>
          <p className="text-sm">Level {lvl}</p>
          <span className="text-xs font-thin">
            {lvl === maxLvl ? "bonus:" : "next lvl:"} (
            {lvl !== maxLvl
              ? round((lvl + 1) * (mult * 100))
              : round(lvl * (mult * 100))}
            %)
          </span>
        </div>
        <div className="description w-2/4 text-left pr-8">
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

export default SupportTree;
