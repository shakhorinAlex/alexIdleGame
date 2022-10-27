import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [gameState, setGameState] = useState({
    damage: {
      lvl: 0,
      baseDamage: 5,
      dmgLvl: 1,
      attackSpeed: 1,
    },
    support: {
      lvl: 0,
      baseDamage: 2,
      dmgLvl: 1,
      attackSpeed: 1,
    },
    special: {
      lvl: 0,
      baseDamage: 2,
      dmgLvl: 1,
      attackSpeed: 1,
    },
    wave: 1,
    currentDamage: 0,
    gold: 0,
    gems: 0,
    exp: 0,
    gameSpeed: 200,
  });

  // create fight state
  const [fight, setFight] = useState({
    fight: false,
    kill: false,
    killTime: 10000,
  });

  const [monster, setMonster] = useState({
    hp: 100,
    gold: 10,
    gems: 1,
    wave: 1,
  });

  // state for choosing hero class
  const [heroClass, setHeroClass] = useState({
    damage: false,
    support: false,
    special: false,
  });

  // function to choose hero class by click on button

  const chooseHeroClass = (e) => {
    if (e.target.classList.contains("damage")) {
      setHeroClass({ damage: true });
    } else if (e.target.classList.contains("support")) {
      setHeroClass({ support: true });
    } else if (e.target.classList.contains("special")) {
      setHeroClass({ special: true });
    }
    console.log(heroClass);
  };

  // set current damage to selected hero class damage
  useEffect(() => {
    if (heroClass.damage) {
      setGameState({
        ...gameState,
        currentDamage: gameState.damage.baseDamage,
      });
    } else if (heroClass.support) {
      setGameState({
        ...gameState,
        currentDamage: gameState.support.baseDamage,
      });
    } else if (heroClass.special) {
      setGameState({
        ...gameState,
        currentDamage: gameState.special.baseDamage,
      });
    }
  }, [heroClass]);

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

  // deal current damage to monster hp and set monster hp to 0 if monster hp is less than 0 interval multiplied by attack speed
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

  useEffect(() => {
    if (fight.kill) {
      setGameState({
        ...gameState,
        gold: gameState.gold + monster.gold,
      });
      setMonster({
        ...monster,
        gold: monster.gold + 10,
        hp: monster.hp + 100 * (monster.wave + 1),
        wave: monster.wave + 1,
      });
      setGameState({ ...gameState, wave: gameState.wave + 1 });
    }
    setFight({ ...fight, kill: false });
    console.log(fight.kill);
  }, [fight.kill]);

  //

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
