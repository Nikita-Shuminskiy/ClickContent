import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const passportScheme = () => {
  return yupResolver(
    yup
      .object({
        surname: yup
          .string()
          .required("Укажите фамилию")
          .matches(
            /^[а-яА-ЯёЁa-zA-Z]+$/,
            "Фамилия должна содержать только буквы",
          ),
        firstName: yup
          .string()
          .required("Укажите имя")
          .matches(/^[а-яА-ЯёЁa-zA-Z]+$/, "Имя должно содержать только буквы"),
        middleName: yup
          .string()
          .notRequired()
          .matches(
            /^[а-яА-ЯёЁa-zA-Z]*$/,
            "Отчество должно содержать только буквы",
          ),

        isPatronymic: yup.boolean().notRequired(),
        series: yup
          .string()
          .matches(/^\d{4}$/, "Серия должна состоять из 4 цифр")
          .required("Укажите серию"),
        number: yup
          .string()
          .matches(/^\d{6}$/, "Номер паспорта должен состоять из 6 цифр")
          .required("Укажите номер паспорта"),
        dateOfBirth: yup
          .string()
          .required("Укажите дату рождения, формат дд/мм/гггг"),
        dateOfIssue: yup
          .string()
          .required("Укажите дату выдачи, формат дд/мм/гггг"),

        placeOfBirth: yup.string().required("Укажите место рождения"),

        issuedBy: yup.string().required("Укажите, кем выдан паспорт"),
        policeDepartmentCode: yup
          .string()
          .matches(
            /^\d{3}-\d{3}$/,
            "Код подразделения должен соответствовать формату XXX-XXX",
          )
          .required("Укажите код подразделения"),
        registrationAddress: yup.string().required("Укажите адрес регистрации"),
        phone: yup
          .string()
          .matches(/^\d{11}$/, "Номер телефона должен содержать 11 цифр")
          .required("Укажите номер телефона"),
        sex: yup
          .string()
          .oneOf(["Женский", "Мужской"], "Укажите корректный пол")
          .required("Укажите пол"),
      })
      .required(),
  );
};
