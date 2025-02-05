export const calculateRowSum = (row: number[]) =>
  row.reduce((a, b) => a + b, 0);

export const calculatePercentage = (value: number, rowSum: number) =>
  ((value / rowSum) * 100).toFixed(2);

export const getClosestCells = (
  rowIdx: number,
  colIdx: number,
  data: number[][],
  highlightedCellsCount: number
) => {
  const targetValue = data[rowIdx][colIdx];
  const allCells: { rowIdx: number; colIdx: number; value: number }[] = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (i !== rowIdx || j !== colIdx) {
        allCells.push({ rowIdx: i, colIdx: j, value: data[i][j] });
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
  data: number[][],
  setData: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  const newData = [...data];
  newData[rowIdx][colIdx] += 1;
  setData(newData);
};

export const handleRowDelete = (
  rowIdx: number,
  data: number[][],
  setData: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  const newData = data.filter((_, idx) => idx !== rowIdx);
  setData(newData);
};

export const handleAddRow = (
  cols: number,
  data: number[][],
  setData: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  const newRow = Array.from(
    { length: cols },
    () => Math.floor(Math.random() * 10) + 1
  );
  setData([newRow, ...data]);
};
