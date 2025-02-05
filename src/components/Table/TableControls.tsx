import { useTableContext } from "@/context/TableContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const TableControls = () => {
  const { rows, setRows, cols, setCols, generateTable } = useTableContext();

  return (
    <div className="table-view__controls">
      <Input
        type="number"
        placeholder="Rows (M)"
        value={rows}
        onChange={(e) => setRows(Number(e.target.value))}
      />

      <Input
        type="number"
        placeholder="Columns (N)"
        value={cols}
        onChange={(e) => setCols(Number(e.target.value))}
      />

      <Button onClick={generateTable}>Generate Table</Button>
    </div>
  );
};
