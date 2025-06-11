import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

export const feedbackResolver = yupResolver(
    yup
        .object({
            type: yup
                .object({
                    text: yup.string().required(),
                    value: yup.string().required(),
                })
                .required(),
            name: yup
                .string()
                .required("Укажите имя")
                .max(100, "Максимально 100 символов"),
            contact: yup.string().when("type", {
                is: (type) => type.value === "mail",
                then: () =>
                    yup
                        .string()
                        .email("Неверный формат почты")
                        .required("Укажите почту"),
                otherwise: () =>
                    yup
                        .string()
                        .matches(
                            /^(https?:\/\/t\.me\/\w+|@\w{3,})$/,
                            "Telegram username должен быть в формате @username или https://t.me/username"
                        )
                        .required("Телеграм обязателен для заполнения")
            }),
            isTerms: yup.boolean().test({
                message: "Примите условия сервиса",
                test: (value) => value === true,
            }),
            text: yup.string().required("Напишите сообщение"),
        })
        .required(),
)
