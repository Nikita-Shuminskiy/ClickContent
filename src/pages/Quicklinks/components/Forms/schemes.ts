import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import StorageService from "@/core/service/storage-service.ts";

export const quickFormSchema = () => {
    const settings = StorageService.getSettings();

    const stopWords = ["донат", "donat", "пожертв"];

    const containsStopWord = (value: string | undefined): string | null => {
        if (!value) return null;

        const lowerCaseValue = value.toLowerCase();
        const foundWord = stopWords.find(word => lowerCaseValue.includes(word));

        return foundWord ? value : null;
    };

    return yupResolver(
        yup.object({
            title: yup
                .string()
                .required("Укажите название ссылки")
                .max(100, "Максимально 100 символов")
                .test(
                    "noStopWords",
                    "Поле содержит запрещенные слова",
                    (value, context) => {
                        if (!value) return true;

                        const foundWord = containsStopWord(value)
                        return foundWord
                            ? context.createError({ message: `Пожалуйста, замените запрещенное слово: ${foundWord}` })
                            : true;
                    }
                ),
            description: yup
                .string()
                .required("Укажите описание ссылки")
                .max(300, "Максимально 300 символов")
                .test(
                    "noStopWords",
                    "Поле содержит запрещенные слова",
                    (value, context) => {
                        if (!value) return true;

                        const foundWord = containsStopWord(value)
                        return foundWord
                            ? context.createError({ message: `Пожалуйста, замените запрещенное слово: ${foundWord}` })
                            : true;
                    }
                ),
            amount: yup
                .string()
                .test(
                    'min',
                    `Минимальная сумма ${settings.minQuicklink}₽`,
                    value => parseInt(value.replace('₽', '').trim(), 10) >= settings.minQuicklink
                )
                .test(
                    'max',
                    `Максимальная сумма ${settings.maxQuicklink}₽`,
                    value => parseInt(value.replace('₽', '').trim(), 10) <= settings.maxQuicklink
                )
                .required('Обязательное поле'),
            thanksText: yup
                .string()
                .max(100, "Максимально 100 символов")
                .test(
                    "noStopWords",
                    "Поле содержит запрещенные слова",
                    (value, context) => {
                        if (!value) return true;

                        const foundWord = containsStopWord(value)
                        return foundWord
                            ? context.createError({ message: `Пожалуйста, замените запрещенное слово: ${foundWord}` })
                            : true;
                    }
                ),
            recommendedPayment: yup.number(),
            allowResell: yup.boolean(),
            isCreateAds: yup.boolean(),
        })
    );
};
