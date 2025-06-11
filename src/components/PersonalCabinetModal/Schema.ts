import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";

const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/tiff",
    "image/svg+xml",
    "image/heic",
    "image/heif",
    "image/hif",
];

export const getPersonalCabinetProjectSchema = (): any =>
    yupResolver(
        yup.object({
            nickName: yup
                .string()
                .transform((value) => value.trim())
                .test(
                    "nickName",
                    "Никнейм может содержать только буквы a-z, цифры 0-9 и символ подчеркивания _. Длина от 4 до 32 символов. Никнейм не может состоять только из цифр.",
                    (value) => {
                        if (!value) return true;
                        const regex = /^[a-z0-9_]{4,32}$/i;
                        const hasLetter = /[a-zA-Z]/.test(value);
                        return regex.test(value) && hasLetter;
                    },
                )
                .notRequired(),
            avatar: yup.string().notRequired(),
            file: yup
                .mixed()
                .notRequired()
                .test(
                    "fileSize",
                    "Файл слишком большой. Максимальный размер 16 MB.",
                    (value: File) => {
                        if (!value) return true;
                        return value.size <= 16 * 1024 * 1024; // 16 MB
                    },
                )
                .test("file", "Неподдерживаемый формат файла", (value: File) => {
                    if (!value) return true;
                    return imageTypes.includes(value.type);
                }),
        }),
    )
