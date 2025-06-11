import {IQuickLinkDto} from "@/data-contracts.ts";

export const sortByDate = ({
                               data,
                               setData,
                               isAscending = true,
                           }: {
    data: IQuickLinkDto[];
    setData: (data:IQuickLinkDto[]) => void;
    isAscending: boolean;
}) => {
    const sortedData = [...data].sort((a, b) =>
        isAscending
            ? new Date(a.created).getTime() - new Date(b.created).getTime()
            : new Date(b.created).getTime() - new Date(a.created).getTime()
    );
    setData(sortedData);
};
