import React from "react";
import { Controller } from "react-hook-form";
import { InputUI } from ".";
import { InputUIProps } from "./TextAreaUI";

export type FormInputTypes = {
  control: any;
  name: string;
  errorStyle?: any;
  isFromLanding?: boolean;
} & InputUIProps;

export default React.forwardRef(
  (
    {
      name,
      control,
      error,
      onFocus,
      onBlur,
      onInput,
      isFromLanding,
      errorStyle,
      ...rest
    }: FormInputTypes,
    ref: any,
  ) => {
    const handleFocus = (event) => {
      onFocus?.(event);
    };

    const handleBlur = (fieldOnBlur?: (...event: any[]) => void) => {
      return (event) => {
        onBlur?.(event);
        fieldOnBlur?.(event);
      };
    };

    const handleChangeText = (
      fieldOnChangeText?: (...event: any[]) => void,
    ) => {
      return (text: string) => {
        onInput?.(text);
        fieldOnChangeText?.(text);
      };
    };

    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, ...fieldRest },
          fieldState: { error: fieldError },
        }) => {
          return (
            <InputUI
              onInput={handleChangeText(onChange)}
              hasPopover
              isFromLanding={isFromLanding}
              onFocus={handleFocus}
              onBlur={handleBlur(onBlur)}
              error={fieldError ? fieldError.message : error}
              {...fieldRest}
              {...rest}
              ref={ref}
            />
          );
        }}
      />
    );
  },
);
