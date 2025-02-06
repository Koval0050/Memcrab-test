import React, { useState, PropsWithChildren } from "react";
import { TableContext } from "./TableContext";

const MAX_ROWS = 100;
const MAX_COLS = 100;

const TableProvider = ({ children }: PropsWithChildren) => {
  const [rows, setRows] = useState<number>(0);
  const [cols, setCols] = useState<number>(0);
  const [data, setData] = useState<number[][]>([]);

  const handleSetRows = (value: React.SetStateAction<number>) => {
    setRows((prev) => {
      const newValue = typeof value === "function" ? value(prev) : value;
      return Math.max(0, Math.min(newValue, MAX_ROWS));
    });
  };

  const handleSetCols = (value: React.SetStateAction<number>) => {
    setCols((prev) => {
      const newValue = typeof value === "function" ? value(prev) : value;
      return Math.max(0, Math.min(newValue, MAX_COLS));
    });
  };

  const generateTable = () => {
    const newData = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.floor(Math.random() * 10) + 1)
    );
    setData(newData);
  };

  return (
    <TableContext.Provider
      value={{
        rows,
        cols,
        data,
        setRows: handleSetRows,
        setCols: handleSetCols,
        generateTable,
        setData,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
