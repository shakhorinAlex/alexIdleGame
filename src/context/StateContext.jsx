import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [gameState, setGameState] = useState({
    damage: {
      lvl: 0,
      baseDamage: 20,
      attackSpeed: 1,
      lvlGold: 10,
      exp: 0,
      expToLvl: 40,
    },
    support: {
      lvl: 0,
      baseDamage: 2,
      attackSpeed: 1,
      lvlGold: 10,
      exp: 0,
      expToLvl: 40,
    },
    special: {
      lvl: 0,
      baseDamage: 2,
      attackSpeed: 1,
      lvlGold: 10,
      exp: 0,
      expToLvl: 40,
    },
    wave: 1,
    dmgMultiplier: 1,

    expForKill: 1,
    currentDamage: 0,
    gold: 0,
    gems: 0,
    gameSpeed: 100,
  });

  // different state for lvls
  const [lvlUp, setLvlUp] = useState({
    damageLevels: {
      baseDamage: {
        lvl: 0,
        cost: 30,
        increase: 1,
        maxLvl: 10,
      },
      dmgMultiplier: {
        lvl: 0,
        cost: 5,
        mult: 1,
        maxLvl: 25,
      },
    },
  });

  const { baseDamage, dmgMultiplier: dmgMult } = lvlUp.damageLevels;

  const [fight, setFight] = useState({
    fight: false,
    kill: false,
    killTime: 10000,
  });

  const [monster, setMonster] = useState({
    baseHp: 40,
    hp: 40,
    gold: 10,
    gems: 1,
    wave: 1,
  });

  const [heroClass, setHeroClass] = useState({
    damage: false,
    support: false,
    special: false,
  });

  const roundDown = (num) => {
    return Math.floor(num);
  };
  const roundUp = (num) => {
    return Math.ceil(num);
  };

  // choose class function

  const chooseHeroClass = (e) => {
    if (e.target.classList.contains("damage")) {
      setHeroClass({ damage: true });
    } else if (e.target.classList.contains("support")) {
      setHeroClass({ support: true });
    } else if (e.target.classList.contains("special")) {
      setHeroClass({ special: true });
    }
  };

  // set current damage to selected hero class damage
  useEffect(() => {
    if (heroClass.damage) {
      setGameState({
        ...gameState,
        currentDamage: roundDown(gameState.damage.baseDamage * dmgMult.mult),
        baseDamage: gameState.damage.baseDamage,
      });
    } else if (heroClass.support) {
      setGameState({
        ...gameState,
        currentDamage: roundDown(gameState.support.baseDamage * dmgMult.mult),
        baseDamage: gameState.support.baseDamage,
      });
    } else if (heroClass.special) {
      setGameState({
        ...gameState,
        currentDamage: roundDown(gameState.special.baseDamage * dmgMult.mult),
        baseDamage: gameState.special.baseDamage,
      });
    }
  }, [heroClass, lvlUp]);

  // start fight after choosing hero class
  useEffect(() => {
    if (
      heroClass.damage ||
      heroClass.support ||
      (heroClass.special && monster.hp > 0)
    ) {
      setFight({ ...fight, fight: true });
    }
  }, [heroClass]);

  // descrease time to kill by game speed

  // deal current damage to monster
  useEffect(() => {
    if (fight.fight) {
      const interval = setInterval(() => {
        setMonster({ ...monster, hp: monster.hp - gameState.currentDamage });
      }, gameState.gameSpeed * gameState.damage.attackSpeed);
      if (monster.hp <= 0) {
        clearInterval(interval);
        setFight({ ...fight, kill: true });
      }
      return () => clearInterval(interval);
    }
  }, [fight]);

  // dont stop fight if monster hp is less than 0

  useEffect(() => {
    if (monster.hp > 0) {
      setFight({ ...fight, fight: true });
    }
  }, [monster]);

  useEffect(() => {
    if (monster.hp === 0) {
      setFight({ ...fight, kill: true });
    } else {
      setFight({ ...fight, kill: false });
    }
  }, [monster]);

  // reset and increase wave and monster hp exponentially after kill
  useEffect(() => {
    if (fight.kill) {
      setMonster({
        ...monster,
        baseHp: monster.baseHp ** 1.012,
        hp: roundDown(monster.baseHp),
        wave: monster.wave + 1,
      });
    }
  }, [fight]);

  // useEffect(() => {
  //   if (fight.kill) {
  //     setMonster({
  //       ...monster,
  //       gold: roundDown(monster.gold * monster.goldMultiplier),
  //       hp: roundDown(monster.hp),
  //       baseHp: roundDown(monster.baseHp * (monster.wave + 1.5)),
  //       wave: monster.wave + 1,
  //     });
  //   }
  //   setFight({ ...fight, kill: false });
  // }, [fight.kill]);

  // add exp to game state class that killed monster and level up if exp is enough to level up

  useEffect(() => {
    if (fight.kill) {
      const newState = { ...gameState };

      // add exp to game state class that killed monster
      if (heroClass.damage) {
        newState.damage.exp += newState.expForKill;
      } else if (heroClass.support) {
        newState.support.exp += newState.expForKill;
      } else if (heroClass.special) {
        newState.special.exp += newState.expForKill;
      }

      // add gold and gems to game state after killing monster
      newState.gold += monster.gold;
      newState.gems += monster.gems;
      newState.wave += 1;

      // level up if exp is enough to level up
      if (newState.damage.exp >= newState.damage.expToLvl) {
        newState.damage.lvl += 1;
        newState.damage.exp = 0;
        newState.damage.expToLvl = roundDown(newState.damage.expToLvl * 1.35);
        newState.damage.lvlGold += 1;
      }
      if (newState.support.exp >= newState.support.expToLvl) {
        newState.support.lvl += 1;
        newState.support.exp = 0;
        newState.support.expToLvl += 10;
        newState.support.baseDamage += 1;
        newState.support.attackSpeed += 0.1;
        newState.support.lvlGold += 1;
      }

      if (newState.special.exp >= newState.special.expToLvl) {
        newState.special.lvl += 1;
        newState.special.exp = 0;
        newState.special.expToLvl += 10;
        newState.special.baseDamage += 1;
        newState.special.attackSpeed += 0.1;
        newState.special.lvlGold += 1;
      }

      setGameState(newState);
    }
  }, [fight.kill]);

  // level up damage class

  // function to level up damage class
  // const lvlUpDamage = () => {
  //   if (gameState.gold >= gameState.damage.cost) {
  //     setGameState({
  //       ...gameState,
  //       gold: gameState.gold - gameState.damage.cost,
  //       damage: {
  //         ...gameState.damage,
  //         lvl: gameState.damage.lvl + 1,
  //         damage: gameState.damage.damage + 1,
  //         cost: Math.floor(
  //           gameState.damage.cost * gameState.damage.costMultiplier
  //         ),
  //       },
  //     });
  //   }
  // };

  return (
    <Context.Provider
      value={{
        gameState,
        setGameState,
        fight,
        setFight,
        monster,
        setMonster,
        heroClass,
        setHeroClass,
        chooseHeroClass,
        roundDown,
        roundUp,
        lvlUp,
        setLvlUp,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
