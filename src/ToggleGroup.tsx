import { useRef } from "react";
import "./ToggleGroup.css";

export const ToggleGroup = ({
  vertical,
  children,
}: {
  vertical?: boolean;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <div
      className={`toggle-group toggle-group__${
        vertical ? "vertical" : "horizontal"
      }`}
    >
      {children}
    </div>
  );
};

export const ToggleButton = ({
  name,
  checked,
  onChange,
  label = "",
  value,
  type = "checkbox",
}: {
  name: string;
  label: string | JSX.Element;
  value?: string;
  checked: boolean;
  onChange: (value: any) => void;
  type: "radio" | "checkbox";
}) => {
  const id = type === "checkbox" ? name : value;
  const ref = useRef<HTMLInputElement>(null);
  const onChangeHandler = () => {
    onChange(value ?? name);
  };

  return (
    <>
      <label
        htmlFor={`${id}-toggle `}
        className={`toggle ${checked ? "toggle__checked" : ""}`}
      >
        {label}
        <input
          id={`${id}-toggle`}
          ref={ref}
          type={type}
          name={name}
          value={value ?? name}
          checked={checked}
          onChange={onChangeHandler}
        />
      </label>
    </>
  );
};
