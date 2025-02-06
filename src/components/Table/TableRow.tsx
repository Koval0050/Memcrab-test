import { useTableContext } from "@/context/TableContext";

import {
  calculateRowSum,
  handleCellClick,
  handleRowDelete,
} from "@/utils/tableUtils";

import { TableCell } from "./TableCell";
import { Button } from "../ui/Button";

interface TableRowProps {
  row: number[];
  rowIdx: number;
  highlightedCells: { rowIdx: number; colIdx: number }[];
  hoveredSumIdx: number | null;
  onCellHover: (rowIdx: number, colIdx: number) => void;
  onCellLeave: VoidFunction;
  onSumHover: (rowIdx: number) => void;
}

export const TableRow = ({
  row,
  rowIdx,
  highlightedCells,
  hoveredSumIdx,
  onCellHover,
  onCellLeave,
  onSumHover,
}: TableRowProps) => {
  const { data, setData } = useTableContext();
  const rowSum = calculateRowSum(row);

  return (
    <tr className="table-view__row" onMouseLeave={onCellLeave}>
      <td className="table-view__cell"></td>

      {row.map((cell, colIdx) => (
        <TableCell
          key={colIdx}
          value={cell}
          rowSum={rowSum}
          isHighlighted={highlightedCells.some(
            (highlightedCell) =>
              highlightedCell.rowIdx === rowIdx &&
              highlightedCell.colIdx === colIdx
          )}
          isHoveredSum={hoveredSumIdx === rowIdx}
          onClick={() => handleCellClick(rowIdx, colIdx, data, setData)}
          onHover={() => onCellHover(rowIdx, colIdx)}
          onLeave={onCellLeave}
        />
      ))}
      <td
        className="table-view__cell table-view__cell--sum"
        onMouseEnter={() => onSumHover(rowIdx)}
        onMouseLeave={onCellLeave}
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
};
