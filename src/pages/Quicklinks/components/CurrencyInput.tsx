import { InputUI } from "@components/ui/InputUI";
import { InputUIProps } from "@components/ui/InputUI/InputUI.tsx";
import { KeyboardEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps extends InputUIProps {
  amount?: number | string;
  suffix?: string;
}

export const CurrencyInput = ({
  amount,
  className,
  label,
  placeholder,
  suffix = "₽",
  name,
}: IProps) => {
  const { control } = useFormContext();

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    fieldOnChange: (value: string) => void,
  ) => {
    const input = e.target as HTMLInputElement;
    const cursorPosition = input.selectionStart;

    if (
      e.key === "Backspace" &&
      cursorPosition !== null &&
      cursorPosition > 0
    ) {
      const value = input.value;

      if (value[cursorPosition - 1] === suffix) {
        e.preventDefault();
        const newValue = value.slice(0, cursorPosition - 1);
        fieldOnChange(newValue);
      } else if (cursorPosition === value.length) {
        e.preventDefault();
        const newValue = value.slice(0, -1);
        fieldOnChange(newValue);
      }
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => (
        <InputUI
          id="amount"
          className={className}
          hasPopover
          label={label}
          value={amount ? amount : field.value}
          error={fieldError?.message}
          placeholder={placeholder}
          {...field}
          onKeyDown={(e) => handleKeyDown(e, field.onChange)}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            field.onChange(!!value ? `${value} ${suffix}` : value);
          }}
        />
      )}
    />
  );
};
