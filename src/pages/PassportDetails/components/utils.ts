import {convertDateToFormat} from "@/helpers/Datetimeutils.ts";
import {IPassportDto} from "@/data-contracts.ts";

export const uploadPassportToDefaultValues = (payload: {
    dataPassport: IPassportDto,
}) => {
    const { dataPassport } = payload;
    const transformedData = {};

    Object.keys(dataPassport).forEach((key) => {
        switch (key) {
            case 'dateOfBirth':
            case 'dateOfIssue': {
                transformedData[key] = convertDateToFormat({
                    dateStr: dataPassport[key as keyof IPassportDto] as string,
                    inputFormat: 'yyyy-MM-dd',
                    outputFormat: 'dd/MM/yyyy',
                });
                break;
            }
            case 'sex': {
                transformedData[key as "male" | "female"] = dataPassport[key] === 'male' ? 'Мужской' : 'Женский';
                break;
            }
            case 'phone': {
                transformedData[key] = String(dataPassport[key])
                break;
            }
            default: {
                transformedData[key] = dataPassport[key as keyof IPassportDto];
                break;
            }
        }
    });

    return transformedData;
};
