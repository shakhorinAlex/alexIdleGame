import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [gameState, setGameState] = useState({
    damage: {
      lvl: 0,
      baseDamage: 5,
      damage: 5,
      attackSpeed: 1,
      lvlGold: 10,
      exp: 0,
      expToLvl: 40,
    },
    support: {
      lvl: 0,
      baseDamage: 2,
      damage: 2,
      attackSpeed: 1,
      lvlGold: 10,
      exp: 0,
      expToLvl: 40,
    },
    special: {
      lvl: 0,
      baseDamage: 2,
      damage: 2,
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
    gameSpeed: 1000,
  });

  // different state for lvls
  const [lvlUp, setLvlUp] = useState({
    damageLevels: {
      goldDamage: {
        lvl: 1,
        baseCost: 5,
        cost: 5,
        bonusLvl: 25,
      },
      baseDamage: {
        lvl: 0,
        cost: 5,
        increase: 1,
        maxLvl: 10,
        maxCost: 30,
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
    baseHp: 10,
    hp: 10,
    gold: 1000,
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

  // round number
  const round = (num) => {
    return Math.round(num);
  };

  // Number to string with commas

  function nFormatter(num) {
    const si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(2).replace(rx, "$1") + si[i].symbol;
  }

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
        currentDamage: roundDown(gameState.damage.damage * dmgMult.mult),
        baseDamage: gameState.damage.baseDamage,
      });
    } else if (heroClass.support) {
      setGameState({
        ...gameState,
        currentDamage: roundDown(gameState.support.damage * dmgMult.mult),
        baseDamage: gameState.support.baseDamage,
      });
    } else if (heroClass.special) {
      setGameState({
        ...gameState,
        currentDamage: roundDown(gameState.special.damage * dmgMult.mult),
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
      let baseMultiplier = 1.05;
      let mult = 0;

      const bossWave = monster.wave % 10;

      if (monster.wave % 50 == 0) {
        baseMultiplier = 1.25;
      } else if (bossWave == 5) {
        baseMultiplier = 1.075;
      } else if (bossWave == 0) {
        baseMultiplier = 1.1;
      }

      if (monster.wave > 5000) {
        mult = 0.048;
      } else if (monster.wave > 3500) {
        mult = 0.045;
      } else if (monster.wave > 2500) {
        mult = 0.0375;
      } else if (monster.wave > 1000) {
        mult = 0.0425;
      } else if (monster.wave > 600) {
        mult = 0.035;
      } else if (monster.wave > 300) {
        mult = 0.03;
      } else if (monster.wave > 180) {
        mult = 0.025;
      } else if (monster.wave > 120) {
        mult = 0.01;
      }

      if (monster.wave > 50) {
        monster.baseHp *= baseMultiplier - mult;
      } else if (monster.wave > 40) {
        monster.baseHp += 10;
      } else if (monster.wave > 30) {
        monster.baseHp += 8;
      } else if (monster.wave > 20) {
        monster.baseHp += 6;
      } else if (monster.wave > 10) {
        monster.baseHp += 4;
      } else {
        monster.baseHp += 2;
      }

      setMonster({
        ...monster,
        hp: round(monster.baseHp),
        wave: monster.wave + 1,
      });
    }
  }, [fight.kill]);

  function getWaveHPNew(wave) {
    hp = 10;
    for (i = 2; i <= wave; i++) {
      let is10 = i % 10;

      base_multi = 1.05;
      if (i % 50 == 0) {
        base_multi = 1.25;
      } else if (is10 == 5) {
        base_multi = 1.075;
      } else if (is10 == 0) {
        base_multi = 1.1;
      }

      multi = 0;
      if (i > 5000) {
        multi = 0.048;
      } else if (i > 3500) {
        multi = 0.045;
      } else if (i > 2500) {
        multi = 0.0375;
      } else if (i > 1000) {
        multi = 0.0425;
      } else if (i > 600) {
        multi = 0.035;
      } else if (i > 300) {
        multi = 0.03;
      } else if (i > 180) {
        multi = 0.025;
      } else if (i > 120) {
        multi = 0.01;
      }

      if (i > 50) {
        hp *= base_multi - multi;
      } else if (i > 40) {
        hp += 10;
      } else if (i > 30) {
        hp += 8;
      } else if (i > 20) {
        hp += 6;
      } else if (i > 10) {
        hp += 4;
      } else {
        hp += 2;
      }
      if (hp == NaN || hp == Infinity) {
        break;
      }
      hp = Math.round(hp, 0);
    }
    if (hp == NaN || hp == Infinity) {
      hp = 1.5 * Math.pow(10, 308);
    }

    return hp;
  }

  // increase gold and gems after kill
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
        nFormatter,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
