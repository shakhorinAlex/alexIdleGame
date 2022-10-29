import { useState } from "react";
import "./App.css";
import Fight from "./components/Fight";
import LvlUp from "./components/LvlUp";
import { useStateContext } from "./context/StateContext";

function App() {
  const { heroClass, chooseHeroClass, monster, gameState, nFormatter } =
    useStateContext();

  const [activeTab, setActiveTab] = useState("fight");
  const handleClick = (tab) => {
    setActiveTab(tab);
    console.log(activeTab);
  };

  // destructure gameState

  const { damage, support, special, gold, gems, exp, currentDamage, wave } =
    gameState;

  return (
    <div className="App">
      <div className="flex  content-between mx-auto h-screen w-10/12 bg-lightPurple ">
        <div className="resource-info flex gap-2 flex-col pt-4 w-1/4 border-2 border-veryLightPurple">
          <p className="text-2xl">Wave {wave}</p>
          <p className="text-sm">Hp: {nFormatter(monster.hp)}</p>
          <p className="text-sm text-yellow-500">Gold: {gold}</p>
          <p className="text-sm">Gems: {gems}</p>
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
        </div>
        <div className="px-10 main-content py-10 border-2 border-veryLightPurple w-full">
          <div className="flex flex-row mb-8 justify-center">
            <p
              onClick={() => handleClick("fight")}
              className={`text-md p-2 px-6 border-solid border-2 border-veryLightPurple cursor-pointer 
               ${activeTab === "fight" ? "bg-veryLightPurple" : "transparent"}`}
            >
              Attack
            </p>

            <p
              onClick={() => handleClick("lvlUp")}
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
