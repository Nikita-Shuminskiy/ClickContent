import InputMask from "react-input-mask";

const InputMaskUi = ({ ...rest }) => {
  const {
    value = "",
    onBlur = null,
    mask = "+7 (000) 000-00-00",
  } = { ...rest };
  const onBlurHandler = () => {
    onBlur?.();
  };
  const inputId = "inputMask";
  return (
    <div className={`w-full block inputMaskUI`}>
      <InputMask
        id={inputId}
        className="w-full p-6 rounded-2xl text-sm bg-white/10 text-white"
        onBlur={onBlurHandler}
        mask={mask}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default InputMaskUi;
