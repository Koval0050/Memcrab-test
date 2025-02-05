import { useState } from "react";

import { useTableContext } from "@/context/TableContext";

import { Button } from "@/components/ui/Button";

import {
  calculateRowSum,
  calculatePercentage,
  getClosestCells,
  handleCellClick,
  handleRowDelete,
  handleAddRow,
} from "@/utils/TableUtils";

export const TableBody = () => {
  const { data, setData, rows, cols } = useTableContext();
  const [highlightedCells, setHighlightedCells] = useState<
    {
      rowIdx: number;
      colIdx: number;
    }[]
  >([]);
  const [hoveredSumIdx, setHoveredSumIdx] = useState<number | null>(null);
  const highlightedCellsCount = Math.floor((rows + cols) / 2);

  const handleCellHover = (rowIdx: number, colIdx: number) => {
    const closestCells = getClosestCells(
      rowIdx,
      colIdx,
      data,
      highlightedCellsCount
    );
    setHighlightedCells(closestCells);
  };

  const handleCellLeave = () => {
    setHighlightedCells([]);
    setHoveredSumIdx(null);
  };

  const handleSumHover = (rowIdx: number) => setHoveredSumIdx(rowIdx);

  return (
    <tbody>
      {data.map((row, rowIdx) => {
        const rowSum = calculateRowSum(row);
        return (
          <tr
            key={rowIdx}
            className="table-view__row"
            onMouseLeave={handleCellLeave}
          >
            <td className="table-view__cell"></td>
            {row.map((cell, colIdx) => {
              const percentage = calculatePercentage(cell, rowSum);
              const cellStyle =
                hoveredSumIdx === rowIdx
                  ? {
                      background: `rgba(0, 255, 0, ${cell / Math.max(...row)})`,
                    }
                  : {};

              return (
                <td
                  key={colIdx}
                  className={`table-view__cell table-view__cell--clickable ${
                    highlightedCells.some(
                      (highlightedCell) =>
                        highlightedCell.rowIdx === rowIdx &&
                        highlightedCell.colIdx === colIdx
                    )
                      ? "highlighted"
                      : ""
                  }`}
                  onClick={() => handleCellClick(rowIdx, colIdx, data, setData)}
                  onMouseEnter={() => {
                    if (colIdx === row.length) {
                      handleSumHover(rowIdx);
                    } else {
                      handleCellHover(rowIdx, colIdx);
                    }
                  }}
                  onMouseLeave={handleCellLeave}
                  style={cellStyle}
                >
                  {hoveredSumIdx === rowIdx ? `${percentage}%` : cell}
                </td>
              );
            })}
            <td
              className="table-view__cell table-view__cell--sum"
              onMouseEnter={() => handleSumHover(rowIdx)}
              onMouseLeave={handleCellLeave}
            >
              {rowSum}
            </td>
            <td className="table-view__cell">
              <Button onClick={() => handleRowDelete(rowIdx, data, setData)}>
                Delete Row
              </Button>
            </td>
          </tr>
        );
      })}

      <tr className="table-view__row">
        <td className="table-view__cell">
          <Button onClick={() => handleAddRow(cols, data, setData)}>
            Add New Row
          </Button>
        </td>
        {data[0].map((_, colIdx) => (
          <td key={colIdx} className="table-view__cell"></td>
        ))}
        <td className="table-view__cell"></td>
      </tr>
    </tbody>
  );
};
