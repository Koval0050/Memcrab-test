import { calculatePercentage } from "@/utils/tableUtils";

interface TableCellProps {
  value: number;
  rowSum: number;
  isHighlighted: boolean;
  isSumCell?: boolean;
  isHoveredSum?: boolean;
  onClick: VoidFunction;
  onHover: VoidFunction;
  onLeave: VoidFunction;
}

export const TableCell = ({
  value,
  rowSum,
  isHighlighted,
  isSumCell = false,
  isHoveredSum = false,
  onClick,
  onHover,
  onLeave,
}: TableCellProps) => {
  const percentage = calculatePercentage(value, rowSum);

  const cellStyle = {
    background:
      isHoveredSum && !isSumCell
        ? `rgba(0, 255, 0, ${value / Math.max(rowSum, 1)})`
        : undefined,
  };

  return (
    <td
      className={`table-view__cell table-view__cell--clickable ${
        isHighlighted ? "highlighted" : ""
      }`}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={cellStyle}
    >
      {isHoveredSum && !isSumCell ? `${percentage}%` : value}
    </td>
  );
};
