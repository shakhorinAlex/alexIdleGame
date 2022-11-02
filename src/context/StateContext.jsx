import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { toast } from "react-hot-toast";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [gameState, setGameState] = useState({
    damage: {
      heroName: "Warrior",
      lvl: 0,
      baseDamage: 5,
      damage: 10,
      attackSpeed: 1,
      lvlGold: 10,
      exp: 0,
      expToLvl: 40,
      lvlUp: false,
    },
    support: {
      heroName: "Rogue",
      lvl: 0,
      baseDamage: 2,
      damage: 2,
      attackSpeed: 1,
      lvlGold: 10,
      exp: 0,
      expToLvl: 40,
      lvlUp: false,
    },
    special: {
      heroName: "Mage",
      id: 0,
      lvl: 0,
      baseDamage: 2,
      damage: 2,
      attackSpeed: 1,
      lvlGold: 10,
      exp: 0,
      expToLvl: 40,
      lvlUp: false,
    },
    wave: 1,
    skipChance: 0,
    damageSkillPoints: 20,
    damageClassLvl: 0,
    supportSkillPoints: 50,
    supportClassLvl: 0,
    specialSkillPoints: 50,
    specialClassLvl: 0,
    expForKill: 1,
    expBaseGain: 1,
    expMult: 1,
    currentDamage: 0,
    dmgMultiplier: 1,
    attackSpeedMult: 1,
    attackSpeed: 1,
    gold: 0,
    goldForKill: 10,
    goldBaseGain: 10,
    goldMult: 1,
    shards: 0,
    shardsPerBoss: 1,
    gameSpeed: 100,
  });

  // state for lvls
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
      // dmgMultiplier: {
      //   lvl: 0,
      //   cost: 5,
      //   mult: 1,
      //   maxLvl: 25,
      // },
    },
    skillTree: {
      dmgSkillMult: 0,
      damageClassSkills: {
        damage1: {
          id: "damage1",
          name: "Damage I",
          shortName: "Dmg I",
          description:
            "Increase all damage dealt by your heroes by 10% for each level of this skill.",
          lvl: 0,
          cost: 1,
          mult: 0.1,
          maxLvl: 10,
          unlocked: true,
          prevMaxed: false,
          choosen: true,
        },
        damage2: {
          id: "damage2",
          name: "Damage II",
          shortName: "Dmg II",
          description:
            "Increase all damage dealt by your heroes by 25% for each level of this skill.",
          lvl: 0,
          cost: 2,
          mult: 0.25,
          maxLvl: 10,
          unlocked: false,
          waveUnlock: 40,
          choosen: false,
        },
        damage3: {
          id: "damage3",
          name: "Damage III",
          shortName: "Dmg III",
          description:
            "Increase all damage dealt by your heroes by 50% for each level of this skill.",
          lvl: 0,
          cost: 5,
          mult: 0.5,
          maxLvl: 10,
          unlocked: false,
          waveUnlock: 400,
          choosen: false,
        },
      },
      supportClassSkill: {
        atkSpd1: {
          id: "atkSpd1",
          name: "Attack Speed",
          shortName: "ASPD",
          description:
            "Increase attack speed of your heroes by 1% for each level of this skill.",
          lvl: 0,
          cost: 1,
          mult: 0.01,
          maxLvl: 5,
          unlocked: true,
          prevMaxed: false,
          choosen: true,
        },
        waveSkip1: {
          id: "waveSkip1",
          name: "Wave skip",
          shortName: "Wave Skip",
          description:
            "Increase chance to skip wave by 2% for each level of this skill. Skiping wave gives you 50% of exp/gold from the skipped wave. Don't skip boss waves.",
          lvl: 0,
          cost: 2,
          mult: 0.02,
          maxLvl: 5,
          unlocked: false,
          waveUnlock: 40,
          choosen: false,
        },
        atkSpd2: {
          id: "atkSpd2",
          name: "Attack Speed II",
          shortName: "ASPD",
          description:
            "Increase attack speed of your heroes by 2% for each level of this skill.",
          lvl: 0,
          cost: 5,
          mult: 0.02,
          maxLvl: 5,
          unlocked: false,
          prevMaxed: false,
          choosen: false,
          waveUnlock: 200,
        },
      },
      specialClassSkill: {
        baseGold1: {
          id: "baseGold1",
          name: "Gold Gain",
          shortName: "Gold+",
          description:
            "Increase gold for kill by 1 for each level of this skill.",
          lvl: 0,
          cost: 1,
          type: "goldBase",
          increase: 1,
          maxLvl: 10,
          unlocked: true,
          prevMaxed: false,
          choosen: true,
        },
        baseExp1: {
          id: "baseExp1",
          name: "Exp Gain",
          shortName: "Exp+",
          description:
            "Increase exp for kill by 1 for each level of this skill.",
          lvl: 0,
          cost: 1,
          type: "expBase",
          increase: 1,
          maxLvl: 10,
          unlocked: false,
          prevMaxed: false,
          choosen: false,
          waveUnlock: 40,
        },
        goldGainMult1: {
          id: "goldGainMult1",
          name: "Gold Gain %",
          shortName: "Gold%",
          description: "Increase gold gain by 5% for each level of this skill.",
          lvl: 0,
          cost: 3,
          type: "goldMult",
          mult: 0.05,
          maxLvl: 10,
          unlocked: false,
          prevMaxed: false,
          choosen: false,
          waveUnlock: 150,
        },
        expGainMult1: {
          id: "expGainMult1",
          name: "Exp Gain %",
          shortName: "Exp%",
          description: "Increase exp gain by 5% for each level of this skill.",
          lvl: 0,
          cost: 5,
          type: "expMult",
          mult: 0.05,
          maxLvl: 10,
          unlocked: false,
          prevMaxed: false,
          choosen: false,
          waveUnlock: 350,
        },
      },
    },
  });

  const [fight, setFight] = useState({
    fight: false,
    kill: false,
    killTime: 10000,
  });

  const [monster, setMonster] = useState({
    baseHp: 10,
    hp: 10,
    gold: 10,
    shards: 1,
    wave: 1,
  });

  const [heroClass, setHeroClass] = useState({
    damage: false,
    support: false,
    special: false,
  });

  const [activeTab, setActiveTab] = useState("fight");
  const changeMainTab = (tab) => {
    setActiveTab(tab);
  };
  const [skillTab, setSkillTab] = useState("");
  const changeSkillTab = (tab) => {
    setSkillTab(tab);
  };

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

  // toast with text
  const toastText = (text) => {
    toast(text, {
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  const toastBtn = (text, callBack) => {
    toast(() => (
      <span className="flex">
        <span className="text-emerald-500 mr-2">
          <BsFillArrowUpSquareFill onClick={callBack} />
        </span>
        {text}
        <button className=" ml-2 p-1 text-xs underline" onClick={callBack}>
          open
        </button>
      </span>
    ));
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
    // const dmgMultiplier from state
    const stateMult = gameState.dmgMultiplier;
    const damageClassLvlMult = lvlUp.skillTree.dmgSkillMult;

    const dmgMult = stateMult + damageClassLvlMult;

    const aspeedMult = gameState.attackSpeedMult;

    if (heroClass.damage) {
      setGameState({
        ...gameState,
        currentDamage: roundDown(gameState.damage.damage * dmgMult),
        baseDamage: gameState.damage.baseDamage,
        attackSpeed: gameState.damage.attackSpeed * aspeedMult,
      });
    } else if (heroClass.support) {
      setGameState({
        ...gameState,
        currentDamage: roundDown(gameState.support.damage * dmgMult),
        baseDamage: gameState.support.baseDamage,
        attackSpeed: gameState.support.attackSpeed * aspeedMult,
      });
    } else if (heroClass.special) {
      setGameState({
        ...gameState,
        currentDamage: roundDown(gameState.special.damage * dmgMult),
        baseDamage: gameState.special.baseDamage,
        attackSpeed: gameState.special.attackSpeed * aspeedMult,
      });
    }
  }, [heroClass, lvlUp]);

  // use effect to show toast when class is chosen

  useEffect(() => {
    if (heroClass.damage) {
      toastText("You have chosen the damage class");
    } else if (heroClass.support) {
      toastText("You have chosen the support class");
    } else if (heroClass.special) {
      toastText("You have chosen the special class");
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

  // descrease time to kill by game speed

  // deal current damage to monster
  useEffect(() => {
    if (fight.fight) {
      const interval = setInterval(() => {
        setMonster({ ...monster, hp: monster.hp - gameState.currentDamage });
      }, gameState.gameSpeed * gameState.attackSpeed);
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

      const nextWave = gameState.wave + 1;

      if (nextWave % 50 === 0) {
        baseMultiplier = 1.25;
      } else if (nextWave % 10 === 5) {
        baseMultiplier = 1.075;
      } else if (nextWave % 10 === 0) {
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

  const random = Math.random() * 100;

  // increase resources after kill
  useEffect(() => {
    if (fight.kill) {
      const newState = { ...gameState };
      let kills = 1;
      const nextWave = newState.wave + 1;
      const not10 = nextWave % 10;

      const goldGain = round(newState.goldBaseGain * newState.goldMult);
      // set goldGain to state goldForKill
      newState.goldForKill = goldGain;
      const expGain = round(newState.expBaseGain * newState.expMult * kills);
      // set expGain to state expForKill
      newState.expForKill = expGain;

      if (nextWave % 10 === 5) {
        newState.expMult *= 5;
        newState.shards += monster.shards;
      } else if (nextWave % 10 === 0) {
        newState.expMult *= 10;
        newState.shards += monster.shards;
      } else {
        newState.expMult = 1;
      }

      if (
        random < newState.skipChance &&
        not10 % 10 !== 0 &&
        not10 % 10 !== 5
      ) {
        newState.gold += goldGain * 1.5;
        newState.wave += 2;
        kills = 1.5;
      } else {
        newState.gold += goldGain;
        newState.wave += 1;
      }

      // add exp to game state class that killed monster
      if (heroClass.damage) {
        newState.damage.exp += expGain;
      } else if (heroClass.support) {
        newState.support.exp += expGain;
      } else if (heroClass.special) {
        newState.special.exp += expGain;
      }

      // add gold and shards to game state after killing monster

      // level up if exp is enough to level up
      if (newState.damage.exp >= newState.damage.expToLvl) {
        newState.damage.lvl += 1;
        newState.damageClassLvl += 1;
        newState.damage.exp = 0;
        newState.damage.expToLvl = roundDown(newState.damage.expToLvl * 1.35);
        newState.damage.lvlUp = true;
        newState.damageSkillPoints += 1;
        // newState.damage.lvlGold += 1;
      } else {
        newState.damage.lvlUp = false;
      }
      if (newState.support.exp >= newState.support.expToLvl) {
        newState.support.lvl += 1;
        newState.supportClassLvl += 1;
        newState.support.exp = 0;
        newState.support.expToLvl = roundDown(newState.support.expToLvl * 1.35);
        newState.support.lvlUp = true;
        newState.supportSkillPoints += 1;
        // newState.support.lvlGold += 1;
      } else {
        newState.support.lvlUp = false;
      }

      if (newState.special.exp >= newState.special.expToLvl) {
        newState.special.lvl += 1;
        newState.specialClassLvl += 1;
        newState.special.exp = 0;
        newState.special.expToLvl = roundDown(newState.special.expToLvl * 1.35);
        newState.special.lvlUp = true;
        newState.specialSkillPoints += 1;
        // newState.special.lvlGold += 1;
      } else {
        newState.special.lvlUp = false;
      }

      // console log how much gold and exp was gained
      // console.log(
      //   `You gained ${goldGain} gold and ${expGain} exp. For wave ${
      //     newState.wave - 1
      //   }`
      // );

      setGameState(newState);
    }
  }, [fight.kill]);

  useEffect(() => {
    if (gameState.damage.lvlUp) {
      toastBtn(
        `${gameState.damage.heroName} has leveled up`,
        () => changeMainTab("lvlUp")
        // changeSkillTab("damage")
      );
    } else if (gameState.support.lvlUp) {
      toastBtn(
        `${gameState.support.heroName} has leveled up`,
        () => changeMainTab("lvlUp")
        // changeSkillTab("support")
      );
    } else if (gameState.special.lvlUp) {
      toastBtn(
        `${gameState.special.heroName} has leveled up`,
        () => changeMainTab("lvlUp")
        // changeSkillTab("special")
      );
    }
  }, [gameState.damage.lvl, gameState.support.lvl, gameState.special.lvl]);

  return (
    <Context.Provider
      value={{
        activeTab,
        changeMainTab,
        skillTab,
        changeSkillTab,
        gameState,
        setGameState,
        round,
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
