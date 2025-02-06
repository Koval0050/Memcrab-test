import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface TableCell {
  id: string;
  amount: number;
}

interface TableContextType {
  rows: number;
  cols: number;
  data: TableCell[][];
  setRows: Dispatch<SetStateAction<number>>;
  setCols: Dispatch<SetStateAction<number>>;
  setData: Dispatch<SetStateAction<TableCell[][]>>;
  generateTable: () => void;
}

export const TableContext = createContext<TableContextType | null>(null);

export const useTableContext = () => {
  const context = useContext(TableContext);

  if (!context)
    throw new Error("useTableContext must be used within a TableProvider");

  return context;
};
