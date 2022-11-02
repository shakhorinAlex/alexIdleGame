import { useState } from "react";
import "./App.css";
import Fight from "././components/Fight";
// import { Fight, LvlUp } from "./components";
import LvlUp from "././components/LvlUp";
import { useStateContext } from "./context/StateContext";

function App() {
  const {
    heroClass,
    chooseHeroClass,
    monster,
    gameState,
    setGameState,
    nFormatter,
    activeTab,
    changeMainTab,
  } = useStateContext();

  const { damage, support, special, gold, shards, exp, currentDamage, wave } =
    gameState;

  // function to switch gamespeed betwee 100 and 1000 in game state
  const switchSpeed = () => {
    // create a copy of gameState
    const copyGameState = { ...gameState };
    // switch speed
    copyGameState.gameSpeed = copyGameState.gameSpeed === 100 ? 1000 : 100;
    // set gameState to copyGameState
    setGameState(copyGameState);
  };

  return (
    <div className="App">
      <div className="flex  content-between mx-auto h-screen w-10/12 bg-lightPurple ">
        <div className="resource-info flex gap-2 flex-col pt-4 w-1/4 border-2 border-veryLightPurple">
          <p className="text-2xl">Wave {wave}</p>
          <p className="text-sm">Hp: {nFormatter(monster.hp)}</p>
          <p className="text-sm text-yellow-500">Gold: {gold}</p>
          <p className="text-sm">Shards: {shards}</p>
          <div className="border-solid bg-lightPurple flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-xs">Damage lvl: {damage.lvl}</p>
              <p className="text-xs">
                Exp: {damage.exp}/{damage.expToLvl}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs">Support lvl: {support.lvl}</p>
              <p className="text-xs">
                Exp: {support.exp}/{support.expToLvl}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs">Special lvl: {special.lvl}</p>
              <p className="text-xs">
                Exp: {special.exp}/{special.expToLvl}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={switchSpeed}
              className="text-sm bg-veryLightPurple p-2 rounded-md"
            >
              Change speed
            </button>
          </div>
        </div>
        <div className="px-10 main-content py-10 border-2 border-veryLightPurple w-full">
          <div className="flex flex-row mb-8 justify-center">
            <p
              onClick={() => changeMainTab("fight")}
              className={`text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer 
               ${activeTab === "fight" ? "bg-veryLightPurple" : "transparent"}`}
            >
              Attack
            </p>

            <p
              onClick={() => changeMainTab("lvlUp")}
              className={`text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer 
               ${activeTab === "lvlUp" ? "bg-veryLightPurple" : "transparent"}`}
            >
              Levels
            </p>

            <p className="text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer">
              Heroes
            </p>
            <p className="text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer">
              Pets
            </p>
            <p className="text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer">
              Summon
            </p>
          </div>
          {activeTab === "fight" && <Fight />}
          {activeTab === "lvlUp" && <LvlUp />}
        </div>
      </div>
    </div>
  );
}

export default App;
