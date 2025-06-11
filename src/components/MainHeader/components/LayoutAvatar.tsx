import React from "react";
import mockAvatar from '@assets/images/all-img/mockAvatar.png'
import {classNames} from "@/helpers/CssClasses.ts";
import {useGetUser} from "@/core/api/api-hooks/ui/user/use-get-user.ts";

export const LayoutAvatar = () => {
    const { data: user } = useGetUser()

    const fullName =
        user?.firstName &&
        user?.surname && `${user.firstName} ${user.surname}`

    return (
        <div
            className={classNames(
                "flex items-center gap-3 bg-[#141414] rounded-[60px] py-3 px-5 max-xs:py-[5px] max-xs:px-[10px] max-xs:rounded-[10px]max-semi-lg:bg-transparent max-semi-lg:rounded-none max-semi-lg:flex-col max-semi-lg:gap-2 max-semi-lg:p-0",
            )}
        >
            <div
                className={classNames(
                    "w-10 h-10 rounded-[50%] overflow-hidden max-xs:block max-semi-lg:h-16 max-semi-lg:w-16",
                )}
            >
                <img
                    className="w-full h-full bg-gray-200 object-cover"
                    src={user?.avatarLink ?? mockAvatar}
                    alt={"avatar"}
                />
            </div>
            <span
                className={classNames("text-base font-bold text-white max-semi-lg:text-center max-semi-lg:text-2xl")}
            >
        {user?.nickName || fullName || "Меню"}
      </span>
            <span
                className={classNames(
                    "block w-0 h-0 border-solid border-[5px] border-r-transparent border-l-transparent border-b-0 border-t-white max-semi-lg:hidden",
                )}
            ></span>
        </div>
    )
}
