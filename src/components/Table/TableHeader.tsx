import { useTableContext } from "@/context/TableContext";

export const TableHeader = () => {
  const { data } = useTableContext();
  const columns = data[0]?.length || 0;

  return (
    <thead>
      <tr>
        <th className="table-view__header">Row/Col</th>
        {[...Array(columns)].map((_, colIdx) => (
          <th key={colIdx} className="table-view__header">
          </th>
        ))}
        <th className="table-view__header">Sum values</th>
        <th className="table-view__header"></th>
      </tr>
    </thead>
  );
};
