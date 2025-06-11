import errorIcon from "@/assets/images/icons/error-icon.svg";

type Props = {
  error?: any;
  excludeFeilds?: string[];
};

const ErrorApiUI = ({ error, excludeFeilds = [] }: Props) => {
  const validationErrorMessage = (str) => {
    // проверка на русские буквы, символы
    return /^[а-яА-ЯёЁ0-9\s.,!?@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'"\\|,<>\./\?\~`]+$/.test(
      str,
    );
  };
  const errorMessage = "Ошибка сервера, попробуйте позже";
  //validationErrorMessage(error?.getMessage()) ? error?.getMessage() :
  return (
    <>
      {!!error && (
        <p className="flex items-center gap-2 text-red-500 py-3">
          <img className="w-4 h-4 object-cover" src={errorIcon} alt="Ошибка" />
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default ErrorApiUI;

{
  /* {error
  ?.getFieldsExcept(excludeFeilds)
  .map((field: any) => (
    <p className='text-red-500'>{field.message}</p>
  ))} */
}
