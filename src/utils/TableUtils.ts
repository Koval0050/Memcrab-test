import { Cell } from "@/types/cell";
import { nanoid } from "nanoid";

export const calculateRowSum = (row: Cell[]) =>
  row.reduce((sum, cell) => sum + cell.amount, 0);

export const calculatePercentage = (value: number, rowSum: number) =>
  rowSum ? ((value / rowSum) * 100).toFixed(2) : "0.00";

export const getClosestCells = (
  rowIdx: number,
  colIdx: number,
  data: Cell[][],
  highlightedCellsCount: number
) => {
  const targetValue = data[rowIdx][colIdx].amount;
  const allCells: { rowIdx: number; colIdx: number; value: number }[] = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (i !== rowIdx || j !== colIdx) {
        allCells.push({ rowIdx: i, colIdx: j, value: data[i][j].amount });
      }
    }
  }

  allCells.sort(
    (a, b) => Math.abs(a.value - targetValue) - Math.abs(b.value - targetValue)
  );

  return allCells
    .slice(0, highlightedCellsCount)
    .map((cell) => ({ rowIdx: cell.rowIdx, colIdx: cell.colIdx }));
};

export const handleCellClick = (
  rowIdx: number,
  colIdx: number,
  data: Cell[][],
  setData: React.Dispatch<
    React.SetStateAction<Cell[][]>
  >
) => {
  const newData = data.map((row, rIdx) =>
    row.map((cell, cIdx) =>
      rIdx === rowIdx && cIdx === colIdx
        ? { ...cell, amount: cell.amount + 1 }
        : cell
    )
  );
  setData(newData);
};

export const handleRowDelete = (
  rowIdx: number,
  data: Cell[][],
  setData: React.Dispatch<
    React.SetStateAction<Cell[][]>
  >
) => {
  setData(data.filter((_, idx) => idx !== rowIdx));
};

export const handleAddRow = (
  cols: number,
  data: Cell[][],
  setData: React.Dispatch<
    React.SetStateAction<Cell[][]>
  >
) => {
  const newRow = Array.from({ length: cols }, () => ({
    id: nanoid(),
    amount: Math.floor(Math.random() * 10) + 1,
  }));
  setData([newRow, ...data]);
};
