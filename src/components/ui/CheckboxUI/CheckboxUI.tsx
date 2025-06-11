import { InputHTMLAttributes } from "react";

interface CheckboxUIProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  label?: string;
  checked?: boolean;
  children?: React.ReactNode;
  onChangeChecked?: (boolean) => void;
}

const CheckboxUI = ({
  label,
  checked,
  onChangeChecked,
  children,
  ...rest
}: CheckboxUIProps) => {
  return (
    <label className="checkboxUI">
      <input
        className="sr-only checkboxUI__input"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChangeChecked(e.target.checked)}
        {...rest}
      />
      <span className="checkboxUI__checked"></span>
      <span className="checkboxUI__label">{children || label}</span>
    </label>
  );
};

export default CheckboxUI;
