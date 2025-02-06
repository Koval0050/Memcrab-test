import { useTableContext } from "@/context/TableContext";

export const TableHeader = () => {
  const { data } = useTableContext();

  return (
    <thead>
      <tr>
        <th className="table-view__header">Row/Col</th>
        {data[0]?.map((cell) => (
          <th key={cell.id} className="table-view__header"></th>
        ))}
        <th className="table-view__header">Sum values</th>

        <th className="table-view__header"></th>
      </tr>
    </thead>
  );
};
