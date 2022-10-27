// create global context

import React from "react";

const GameContext = React.createContext();

// create provider

const GameProvider = ({ children }) => {
  const [gameState, setGameState] = React.useState({
    damage: {
      lvl: 0,
      damage: 1,
      cost: 10,
      costMultiplier: 1.5,
      effect: 1,
      effectMultiplier: 1.5,
    },
    support: {
      lvl: 0,
      cost: 10,
      costMultiplier: 1.5,
      effect: 1,
      effectMultiplier: 1.5,
    },
    special: {
      lvl: 0,
      cost: 10,
      costMultiplier: 1.5,
      effect: 1,
      effectMultiplier: 1.5,
    },
    gold: 0,
    gems: 0,
    exp: 0,
    gameSpeed: 1000,
  });
};

export default GameContext;
