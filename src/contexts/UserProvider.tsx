import React, {createContext, Dispatch, memo, SetStateAction, useContext, useMemo, useState,} from "react";
import {useGetUser} from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import {ICardDto, IUserDto} from "@/data-contracts.ts";
import {getHasChangeNickName} from "@/helpers/CheckUserNickName.ts";

const UserContext = createContext<Partial<UserContextType>>({});

export type UserProviderProps = {
    children: React.ReactNode | any;
};

export type UserContextType = {
    user: IUserDto;
    cards: ICardDto[];
    onSaveUser: (user: IUserDto) => void;
    isNotCards: boolean;
    isNotCardsAndPassport: boolean;
    isNotPassport: boolean;
    isFrozenUser: boolean;
    userAvatar: string;
    userNickName: string;
    toggleMobileMenu?: () => void;
    isOpenMobileMenu?: boolean;
    setIsOpenMobileMenu?: Dispatch<SetStateAction<boolean>>;
};

export const UserProvider = memo(({children}: UserProviderProps) => {
    const {data: user} = useGetUser()
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)

    const toggleMobileMenu = () => {
        setIsOpenMobileMenu((prevState) => !prevState)
    }

    const isNotPassport = useMemo(
        () => user?.accountType == "PhoneVerified",
        [user?.accountType],
    );
    const isNotCardsAndPassport = useMemo(
        () => user?.accountType == "PhoneVerified" && user?.cards?.length === 0,
        [user?.accountType, user?.cards?.length],
    );
    const isNotCards = useMemo(
        () =>
            (user?.accountType == "Influencer" ||
                user?.accountType == "PassportVerified") &&
            user.cards?.length === 0,
        [user?.accountType, user?.cards?.length],
    );

    const isFrozenUser = false
    //const userAvatar = user?.avatar ? createMediaLink(user.avatar) : mockAvatar;

    const hasChangedNickName = getHasChangeNickName(user?.nickName);

    const userNickName = hasChangedNickName ? user?.nickName : user?.firstName;

    return (
        <UserContext.Provider
            value={{
                user,
                cards: user?.cards,
                isNotCards,
                isNotCardsAndPassport,
                isNotPassport,
                isFrozenUser,
                userNickName,
                isOpenMobileMenu,
                toggleMobileMenu,
                setIsOpenMobileMenu
            }}
        >
            {children}
        </UserContext.Provider>
    );
});

export const useUserInfoContext = () => {
    return useContext(UserContext);
};
