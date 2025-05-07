// Mines Game - Basic Site with $100 Starting Balance
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const GRID_SIZE = 5;
const MINE_COUNT = 5;
const START_BALANCE = 100;

const generateGrid = () => {
  const totalCells = GRID_SIZE * GRID_SIZE;
  const minePositions = new Set();
  while (minePositions.size < MINE_COUNT) {
    minePositions.add(Math.floor(Math.random() * totalCells));
  }
  const grid = Array(totalCells).fill("safe");
  for (let pos of minePositions) grid[pos] = "mine";
  return grid;
};

export default function MinesGame() {
  const [grid, setGrid] = useState(generateGrid());
  const [revealed, setRevealed] = useState(Array(GRID_SIZE * GRID_SIZE).fill(false));
  const [balance, setBalance] = useState(START_BALANCE);
  const [status, setStatus] = useState("Game in progress");

  const handleClick = (index) => {
    if (revealed[index] || status !== "Game in progress") return;

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);

    if (grid[index] === "mine") {
      setStatus("You hit a mine! You lose.");
      setBalance(balance - 10);
    } else {
      setStatus("Safe tile! Keep going.");
      setBalance(balance + 5);
    }
  };

  const resetGame = () => {
    setGrid(generateGrid());
    setRevealed(Array(GRID_SIZE * GRID_SIZE).fill(false));
    setStatus("Game in progress");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Mines Game</h1>
      <div className="text-lg">Balance: ${balance.toFixed(2)}</div>
      <div className="grid grid-cols-5 gap-2">
        {grid.map((cell, index) => (
          <Button
            key={index}
            onClick={() => handleClick(index)}
            className="w-16 h-16 text-center"
            variant={revealed[index] ? (cell === "mine" ? "destructive" : "secondary") : "default"}
          >
            {revealed[index] ? (cell === "mine" ? "💣" : "💎") : ""}
          </Button>
        ))}
      </div>
      <div className="text-md mt-2">{status}</div>
      <Button onClick={resetGame} className="mt-2">Reset Game</Button>
    </div>
  );
}
