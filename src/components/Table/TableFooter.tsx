import { useTableContext } from "@/context/TableContext";

export const TableFooter = () => {
  const { data } = useTableContext();

  const calculateColumnFiftyPercent = (colIndex: number) => {
    const columnSum = data.reduce((sum, row) => sum + row[colIndex].amount, 0);
    return columnSum * 0.5;
  };

  return (
    <tfoot>
      <tr className="table-view__row">
        <td className="table-view__cell table-view__cell--bold">
          50th percentile
        </td>
        {data[0]?.map((cell, colIdx) => (
          <td key={cell.id} className="table-view__cell table-view__cell--bold">
            {calculateColumnFiftyPercent(colIdx)}
          </td>
        ))}
        <td className="table-view__cell"></td>
      </tr>
    </tfoot>
  );
};
