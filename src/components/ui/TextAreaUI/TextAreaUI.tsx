import React, { LegacyRef, useEffect, useState } from "react";

export interface InputUIProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hasPopover?: boolean;
  placeholder?: string;
  classes?: string;
  defaultValue?: string | number;
  isFromLanding?: boolean;
  error?: string;
  onInput?: (e: any) => void;
}

const InputField = React.forwardRef(
  (
    {
      label,
      value,
      placeholder,
      onInput,
      classes,
      isFromLanding,
      ...rest
    }: InputUIProps,
    ref: LegacyRef<HTMLTextAreaElement> | undefined,
  ) => {
    return (
      <div
        className={`block w-full inputUI relative min-h-[120px] bg-[#1A1A1A] rounded-2xl pt-[10%] pb-[10px]`}
      >
        <textarea
          id={`textarea-${label}-${value}`}
          className={`block min-h-[70px] ${
            isFromLanding ? "px-2" : "px-5"
          } font-normal text-white bg-transparent w-full disabled:opacity-40 disabled:cursor-not-allowed  appearance-none focus:outline-none focus:ring-0 peer  resize-none  ${
            classes ?? ""
          }`}
          // type='text'
          value={value ?? ""}
          placeholder={" "}
          onInput={onInput}
          ref={ref}
          {...rest}
        />
        <label
          htmlFor={`textarea-${label}-${value}`}
          className={`w-full absolute text-[14px] max-xs:text-[10px] text-[#FFFFFF4D] duration-300 transform -translate-y-0 peer-focus:-translate-y-0  top-[15%] peer-focus:top-[8%]  z-10 origin-[0] ${
            isFromLanding ? "px-2" : "px-5 whitespace-pre overflow-hidden"
          } peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[25%]`}
        >
          {!!value ? label : placeholder}
        </label>
      </div>
    );
  },
);

const InputUI = React.forwardRef(
  (
    {
      label,
      hasPopover,
      value,
      error,
      onInput,
      onFocus,
      onBlur,
      classes,
      isFromLanding,
      ...rest
    }: any,
    ref: any,
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(
      Boolean(hasPopover && error),
    );

    const handleFocus = (event) => {
      setIsPopoverOpen(false);
      onFocus?.(event);
    };

    const handleBlur = (event) => {
      setIsPopoverOpen(false);
      onBlur?.(event);
    };

    useEffect(() => {
      setIsPopoverOpen(Boolean(hasPopover && error));
    }, [hasPopover, error]);

    return (
      <div className="w-full relative">
        <InputField
          ref={ref}
          label={label}
          value={value}
          isFromLanding={isFromLanding}
          classes={classes}
          onInput={onInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {isPopoverOpen && (
          <span className="text-white bg-red-500 px-3 py-[5px] text-center rounded absolute left-0 top-full mt-3 z-20 after:block after:w-[10px] after:h-[10px] after:bg-red-500 after:absolute after:rotate-45 after:top-[-5px] after:left-[20px]">
            {error}
          </span>
        )}
      </div>
    );
  },
);

// const InputField = ({
//   label,
//   placeholder,
//   defaultValue,
//   onInput,
//   ...OLD_rest
// }: InputUIProps) => {
//   return (
//     <label className='w-full'>
//       <span className='sr-only'>{label}</span>
//       <input
//         className='w-full py-[30px] px-5 text-sm font-normal text-white bg-white/10 rounded-2xl placeholder:text-white/30'
//         type='text'
//         value={defaultValue ?? ""}
//         placeholder={placeholder}
//         onInput={onInput}
//         {...OLD_rest}
//       />
//     </label>
//   );
// };

// const InputUI = ({
//   label,
//   placeholder,
//   defaultValue,
//   onInput,
//   ...OLD_rest
// }: InputUIProps) => {
//   return (
//     <label className='w-full'>
//       <span className='sr-only'>{label}</span>
//       <input
//         className='w-full py-[30px] px-5 text-sm font-normal text-white bg-white/10 rounded-2xl placeholder:text-white/30'
//         type='text'
//         value={defaultValue ?? ""}
//         placeholder={placeholder}
//         onInput={onInput}
//         {...OLD_rest}
//       />
//     </label>
//   );
// };

export default InputUI;
