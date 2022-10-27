import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";

const DamageLvl = () => {
  // round down 2 decimals
  const roundDown = (num) => {
    return Math.floor(num * 100) / 100;
  };

  const { heroClass, gameState, setGameState, lvlUp, setLvlUp } =
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
    baseDamageLvl,
    baseDamageCost,
    baseDamageMaxLvl,
  } = gameState;

  // destructure heroClass
  const {
    damage: damageClass,
    support: supportClass,
    special: specialClass,
  } = heroClass;

  // const [lvlUp, setLvlUp] = useState({
  //   damageLevels: {
  //     baseDamage: {
  //       lvl: 0,
  //       cost: 10,
  //     },
  //     dmgMultiplier: {
  //       lvl: 0,
  //       lvlCost: 5,
  //       mult: 1,
  //     },
  //   },
  // });

  // destructure lvlUp

  const { damageLevels } = lvlUp;

  // destructure damageLevels
  const { baseDamage, dmgMultiplier: dmgMult } = lvlUp.damageLevels;

  // destructure baseDamage

  // level up base damage and dmg multiplier
  const levelUpBaseDamage = () => {
    const newGameState = { ...gameState };
    const newLvlUp = { ...lvlUp };

    if (gold >= baseDamage.cost && baseDamage.lvl < baseDamage.maxLvl) {
      newGameState.damage.baseDamage += baseDamage.increase;
      newGameState.support.baseDamage += baseDamage.increase;
      newGameState.special.baseDamage += baseDamage.increase;

      newGameState.baseDamageLvl += 1;
      newGameState.baseDamage += baseDamage.increase;
      newGameState.gold -= baseDamage.cost;
      // increase cost if cost is less than max cost
      if (baseDamage.cost < baseDamage.maxCost) {
        newLvlUp.damageLevels.baseDamage.cost += 5;
      }

      newLvlUp.damageLevels.baseDamage.lvl += 1;

      setGameState(newGameState);
      setLvlUp(newLvlUp);
    }

    // if (gold >= baseDamage.cost && baseDamage.lvl < baseDamageMaxLvl) {
    //   setGameState({
    //     ...gameState,
    //     damage: {
    //       ...damage,
    //       baseDamage: damage.baseDamage + 1,
    //     },
    //     support: {
    //       ...support,
    //       baseDamage: support.baseDamage + 1,
    //     },
    //     special: {
    //       ...special,
    //       baseDamage: special.baseDamage + 1,
    //     },
    //     gold: gold - baseDamage.cost,
    //   });
    //   setLvlUp({
    //     ...lvlUp,
    //     damageLevels: {
    //       ...damageLevels,
    //       baseDamage: {
    //         ...baseDamage,
    //         lvl: baseDamage.lvl + 1,
    //       },
    //     },
    //   });
    // }
  };

  // level up dmg multiplier
  const levelUpDmgMultiplier = () => {
    if (gold >= dmgMult.cost && dmgMult.lvl < dmgMult.maxLvl) {
      setGameState({
        ...gameState,
        gold: gold - dmgMult.cost,
      });
      setLvlUp({
        ...lvlUp,
        damageLevels: {
          ...damageLevels,
          dmgMultiplier: {
            ...dmgMult,
            lvl: dmgMult.lvl + 1,
            mult: dmgMult.mult + 0.1,
            cost: Math.ceil(dmgMult.cost ** 1.1),
          },
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <p className="text-2xl mb-4">Damage</p>
      <div className="flex flex-row gap-2 justify-between items-center">
        <div className="flex-col align-start justify-start text-left">
          <p className="text-md">Base Damage: +{baseDamage.lvl}</p>
        </div>
        <p className="text-xs">max level: {baseDamage.maxLvl}</p>
        <button
          onClick={levelUpBaseDamage}
          className="bg-yellow-500 text-white rounded-md px-2 py-1 w-28 h-12"
        >
          <p className="font-bold text-sm">Lvl Up</p>
          <p className="text-sm"> ({baseDamage.cost} gold)</p>
        </button>
      </div>

      {gameState.wave > 2 && (
        <div className="flex flex-row gap-2 justify-between items-center">
          <div className="flex-col align-start justify-start text-left">
            <p className="text-md">Damage lvl: {dmgMult.lvl}</p>
            <p className="text-md">
              Damage Multiplier: {roundDown(dmgMult.mult)}
            </p>
          </div>
          <button
            onClick={levelUpDmgMultiplier}
            className="bg-yellow-500 text-white rounded-md px-2 py-1 w-28 h-12"
          >
            <p className="font-bold text-sm">Lvl Up</p>
            <p className="text-sm"> ({dmgMult.cost} gold)</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default DamageLvl;
