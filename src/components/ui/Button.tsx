import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export const Button = ({ children, onClick }: Props) => {
  return (
    <button className="table-view__controls-button" onClick={onClick}>
      {children}
    </button>
  );
};
