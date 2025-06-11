import { InputHTMLAttributes } from "react";

interface CheckboxToggleUIProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  label: string;
  checked?: boolean;
  onChangeChecked?: (boolean) => void;
}

const CheckboxToggleUI = ({
  label,
  checked,
  onChangeChecked,
  ...rest
}: CheckboxToggleUIProps) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <span className="sr-only">{label}</span>
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChangeChecked(e.target.checked)}
        {...rest}
      />
      <div className="w-11 h-6 bg-[#27282A] peer-focus:outline-none peer-checked:bg-[#874AB0]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:bg-[#874AB0] peer-checked:after:border-[#874AB0] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
    </label>
  );
};

export default CheckboxToggleUI;
