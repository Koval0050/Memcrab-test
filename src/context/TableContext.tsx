import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface TableContextType {
  rows: number;
  cols: number;
  data: number[][];
  setRows: Dispatch<SetStateAction<number>>;
  setCols: Dispatch<SetStateAction<number>>;
  setData: Dispatch<SetStateAction<number[][]>>;
  generateTable: () => void;
}

export const TableContext = createContext<TableContextType | null>(null);

export const useTableContext = () => {
  const context = useContext(TableContext);

  if (!context)
    throw new Error("useTableContext must be used within a TableProvider");

  return context;
};
