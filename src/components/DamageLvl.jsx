import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";

const DamageLvl = () => {
  // round down 2 decimals
  const roundDown = (num) => {
    return Math.floor(num * 100) / 100;
  };

  // round up
  const roundUp = (num) => {
    return Math.ceil(num);
  };

  // round number
  const round = (num) => {
    return Math.round(num);
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
  const { baseDamage, dmgMultiplier: dmgMult, goldDamage } = lvlUp.damageLevels;

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
  };

  const levelUpGoldDamage = () => {
    const newGameState = { ...gameState };
    const newLvlUp = { ...lvlUp };
    // let prevDamage = newGameState.damage.damage;
    // let prevSupport = newGameState.support.damage;
    // let prevSpecial = newGameState.special.damage;
    // const prevBaseDamage = newGameState.damage.baseDamage;
    // const prevBaseSupport = newGameState.support.baseDamage;
    // const prevBaseSpecial = newGameState.special.baseDamage;
    // let goldCost = newLvlUp.damageLevels.goldDamage.cost;
    // const baseGoldCost = newLvlUp.damageLevels.goldDamage.baseCost;
    // let goldLvl = newLvlUp.damageLevels.goldDamage.lvl;
    // const goldBonusLvl = newLvlUp.damageLevels.goldDamage.bonusLvl;

    if (gold >= newLvlUp.damageLevels.goldDamage.cost) {
      newGameState.gold -= newLvlUp.damageLevels.goldDamage.cost;
      newGameState.damage.damage = round(
        (newGameState.damage.damage + newGameState.damage.baseDamage) * 1.05
      );
      newGameState.support.damage = round(
        (newGameState.support.damage + newGameState.support.baseDamage) * 1.05
      );
      newGameState.special.damage = round(
        (newGameState.special.damage + newGameState.special.baseDamage) * 1.05
      );

      if (newLvlUp.damageLevels.goldDamage.lvl % 25 === 0) {
        newGameState.damage.damage * 1.5;
        newGameState.support.damage * 2;
        newGameState.special.damage * 1.5;
        newLvlUp.damageLevels.goldDamage.bonusLvl += 25;
      }

      newLvlUp.damageLevels.goldDamage.lvl += 1;
      newLvlUp.damageLevels.goldDamage.cost = round(
        (newLvlUp.damageLevels.goldDamage.cost +
          newLvlUp.damageLevels.goldDamage.baseCost) *
          1.08
      );

      console.log(newGameState.damage.damage - newGameState.damage.baseDamage);

      setGameState(newGameState);
      setLvlUp(newLvlUp);

      // setGameState(...newGameState, {
      //   damage: {
      //     ...newGameState.damage,
      //     damage: prevDamage + prevBaseDamage,
      //   },
      //   support: {
      //     ...newGameState.support,
      //     damage: prevSupport + prevBaseSupport,
      //   },
      //   special: {
      //     ...newGameState.special,
      //     damage: prevSpecial + prevBaseSpecial,
      //   },
      // });

      // setLvlUp(...lvlUp, {
      //   damageLevels: {
      //     goldDamage: {
      //       lvl: goldLvl,
      //       cost: goldCost,
      //       bonusLvl: goldBonusLvl,
      //     },
      //   },
      // });
    }
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

  // level up gold damage lvl increase damage by 5% for each lvl up
  const levelUpDmgLvl = () => {
    if (gold >= dmgLvlCost) {
      setGameState({
        ...gameState,
        gold: gold - dmgLvlCost,
        damage: {
          ...damage,
          damageLvl: damage.damageLvl + 1,
          damage: roundDown(damage.damage * 1.05),
        },
        support: {
          ...support,
          damageLvl: support.damageLvl + 1,
          damage: roundDown(support.damage * 1.05),
        },
        special: {
          ...special,
          damageLvl: special.damageLvl + 1,
          damage: roundDown(special.damage * 1.05),
        },
        dmgLvl: dmgLvl + 1,
        dmgLvlCost: Math.ceil(dmgLvlCost * 1.1),
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <p className="text-2xl mb-4">Damage</p>
      {/* Gold damage */}
      <div className="flex flex-row gap-2 justify-between items-center">
        <div className="flex-col align-start justify-start text-left">
          <p className="text-md">Gold Lvl: {goldDamage.lvl}</p>
          <p className="text-md">Current Damage: {currentDamage}</p>
        </div>
        <p className="text-xs">bonus at level: {goldDamage.bonusLvl}</p>
        <button
          onClick={levelUpGoldDamage}
          className="bg-yellow-500 text-white rounded-md px-2 py-1 w-28 h-12"
        >
          <p className="font-bold text-sm">Lvl Up</p>
          <p className="text-sm"> ({goldDamage.cost} gold)</p>
        </button>
      </div>
      {/* Base Damage */}
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
      {/* Multiplier */}
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
