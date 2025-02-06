import { useState } from "react";
import { useTableContext } from "@/context/TableContext";
import { Button } from "@/components/ui/Button";
import { getClosestCells, handleAddRow } from "@/utils/tableUtils";
import { TableRow } from "./TableRow";

export const TableBody = () => {
  const { data, setData, rows, cols } = useTableContext();
  const [highlightedCells, setHighlightedCells] = useState<
    { rowIdx: number; colIdx: number }[]
  >([]);
  const [hoveredSumIdx, setHoveredSumIdx] = useState<number | null>(null);
  const highlightedCellsCount = Math.floor((rows + cols) / 2);

  const handleCellHover = (rowIdx: number, colIdx: number) => {
    setHighlightedCells(
      getClosestCells(rowIdx, colIdx, data, highlightedCellsCount)
    );
  };

  const handleCellLeave = () => {
    setHighlightedCells([]);
    setHoveredSumIdx(null);
  };

  const handleSumHover = (rowIdx: number) => setHoveredSumIdx(rowIdx);

  return (
    <tbody>
      {data.map((row, rowIdx) => (
        <TableRow
          key={row[0].id} 
          row={row}
          rowIdx={rowIdx}
          highlightedCells={highlightedCells}
          hoveredSumIdx={hoveredSumIdx}
          onCellHover={handleCellHover}
          onCellLeave={handleCellLeave}
          onSumHover={handleSumHover}
        />
      ))}

      <tr className="table-view__row">
        <td className="table-view__cell">
          <Button onClick={() => handleAddRow(cols, data, setData)}>
            Add New Row
          </Button>
        </td>
        {data[0]?.map((cell) => (
          <td key={cell.id} className="table-view__cell"></td>
        ))}
        
        <td className="table-view__cell"></td>
      </tr>
    </tbody>
  );
};
