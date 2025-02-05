import React from "react";

type Props = {
  type: string;
  placeholder: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ type, placeholder, value, onChange }: Props) => (
  <input
    className="table-view__controls-input"
    value={value}
    type={type}
    placeholder={placeholder}
    onChange={onChange}
  />
);
