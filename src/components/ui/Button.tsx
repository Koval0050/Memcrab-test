import { PropsWithChildren } from "react";

type Props = {
  onClick: VoidFunction;
};

export const Button = ({ children, onClick }: PropsWithChildren<Props>) => (
  <button className="table-view__controls-button" onClick={onClick}>
    {children}
  </button>
);
