import * as yup from 'yup';

export const publicationPageSchema = yup.object({
    email: yup.string().email('Введите верный E-mail').notRequired().default(''),
    isGift: yup.boolean().notRequired()
});
