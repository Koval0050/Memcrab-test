import { useTableContext } from "@/context/TableContext";

import { TableControls } from "./TableControls";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";

import "@/styles/table.scss";

const TableView = () => {
  const { data } = useTableContext();

  return (
    <div className="table-view">
      <TableControls />
      {data?.length > 0 ? (
        <table className="table-view__table">
          <TableHeader />
          <TableBody />
          <TableFooter />
        </table>
      ) : (
        <div className="table-view__empty">Please enter at least 1 value</div>
      )}
    </div>
  );
};

export default TableView;
