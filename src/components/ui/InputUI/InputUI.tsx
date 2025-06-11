import {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useState,
} from "react";

export interface InputUIProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasPopover?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  error?: string;
  onInput?: (e: any) => void;
  inputWrapperClassName?: string;
  hasFakeCaret?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  labelClassName?: string;
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-4 bg-white" />
    </div>
  );
}

const InputField = forwardRef(
  (
    {
      label,
      value,
      placeholder,
      onInput,
      className,
      hasFakeCaret,
      startIcon,
      endIcon,
      labelClassName,
      ...rest
    }: InputUIProps,
    ref: any,
  ) => {
    return (
      <div className="relative inputUI">
        {hasFakeCaret && <FakeCaret />}
        {startIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {startIcon}
          </div>
        )}
        <input
          type="text"
          id={`input-${label}-${value}`}
          className={`block pt-[40px] pb-[20px] max-sm:pt-[31px] max-sm:pb-[11px]  ${
            startIcon ? "px-12" : "px-5 "
          } font-normal text-white bg-[#1A1A1A] rounded-2xl w-full placeholder:text-white/30 disabled:opacity-40 disabled:cursor-not-allowed  appearance-none focus:outline-none focus:ring-0 peer  ${
            className ? className : ""
          }`}
          placeholder=" "
          value={value ?? ""}
          onInput={onInput}
          ref={ref}
          {...rest}
        />
        <label
          htmlFor={`input-${label}-${value}`}
          className={`w-full whitespace-pre font-firstNeue overflow-hidden absolute text-[14px] max-xs:text-[10px] text-[#FFFFFF4D] duration-300 transform -translate-y-0 peer-focus:-translate-y-0 top-[20%] peer-focus:top-[20%] z-10 origin-[0] ${
            startIcon ? "px-12" : "px-5"
          } peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 ${
            labelClassName ? labelClassName : ""
          }`}
        >
          {!!value ? label : placeholder}
        </label>
        {endIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {endIcon}
          </div>
        )}
      </div>
    );
  },
);

const InputUI = forwardRef(
  (
    {
      label,
      hasPopover,
      value,
      error,
      onInput,
      onFocus,
      onBlur,
      inputWrapperClassName,
      startIcon,
      endIcon,
      labelClassName,
      ...rest
    }: InputUIProps,
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
      <div
        className={
          inputWrapperClassName ? inputWrapperClassName : "w-full relative"
        }
      >
        <InputField
          ref={ref}
          label={label}
          value={value}
          onInput={onInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          startIcon={startIcon}
          endIcon={endIcon}
          labelClassName={labelClassName}
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

export default InputUI;
