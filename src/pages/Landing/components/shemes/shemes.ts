import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const contactResolver = yupResolver(
  yup
    .object({
      type: yup.string().notRequired(),

      name: yup
        .string()
        .required("Укажите имя")
        .max(100, "Максимально 100 символов"),
      contact: yup
        .string()
        .email("Неверный формат почты")
        .required("Укажите почту"),
      text: yup.string().required("Напишите сообщение"),
    })
    .required(),
);
