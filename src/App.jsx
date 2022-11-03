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
      <div className="container flex-col items-center justify-center lg:mt-16 ">
        <div className="flex flex-col  content-between lg:flex-row bg-lightPurple ">
          <div className="resource-info text-left flex gap-2 flex-col pt-4 border-2 border-veryLightPurple p-8 lg:w-1/4 ">
            <p className="text-2xl">Wave {wave}</p>
            <div className="flex items-center gap-2 ">
              <p className="text-sm">Hp:</p>
              <span className="">{nFormatter(monster.hp)}</span>
            </div>
            <div className="flex gap-4 mb-2 ">
              <p className="text-sm text-yellow-500">Gold: {gold}</p>
              <p className="text-sm">Shards: {shards}</p>
            </div>
            <div className="border-solid bg-lightPurple flex flex-row lg:flex-col items-center justify-between py-4 gap-4 mb-2">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold">Damage lvl: {damage.lvl}</p>
                <p className="text-xs">
                  Exp: {damage.exp}/{damage.expToLvl}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold">Support lvl: {support.lvl}</p>
                <p className="text-xs">
                  Exp: {support.exp}/{support.expToLvl}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold">Special lvl: {special.lvl}</p>
                <p className="text-xs">
                  Exp: {special.exp}/{special.expToLvl}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center justify-center mb-2">
              <button
                onClick={switchSpeed}
                className="text-sm bg-veryLightPurple p-2 rounded-md"
              >
                Change speed
              </button>
            </div>
          </div>
          <div className="main-content  flex flex-col gap-6 content-between py-8 px-6 md:px-24 border-2 border-veryLightPurple w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex flex-row justify-center">
              <p
                onClick={() => changeMainTab("fight")}
                className={`flex-grow text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer 
               ${activeTab === "fight" ? "bg-veryLightPurple" : "transparent"}`}
              >
                Attack
              </p>

              <p
                onClick={() => changeMainTab("lvlUp")}
                className={`flex-grow text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer 
               ${activeTab === "lvlUp" ? "bg-veryLightPurple" : "transparent"}`}
              >
                Levels
              </p>

              <p className="flex-grow text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer">
                Heroes
              </p>
              <p className="flex-grow text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer">
                Pets
              </p>
              <p className="flex-grow text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer">
                Summon
              </p>
              <p className="flex-grow text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer">
                Shop
              </p>
            </div>
            {activeTab === "fight" && <Fight />}
            {activeTab === "lvlUp" && <LvlUp />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
