export const PopUpFreezeView = ({text}) => {

    return (
        <div
            className={
                "absolute right-0 bottom-10 z-10 mt-2 origin-top-right rounded-[16px] overflow-hidden bg-[#202020] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            }
        >
            <div
                className={
                    "p-3 text-left w-[250px] max-sm:max-w-[150px] lg:w-[290px] max-sm:p-2"
                }
            >
                <p
                    className={
                        "text-xs flex flex-col gap-[2px] text-white font-manrope font-normal"
                    }
                >
                    {text}
                </p>
            </div>
        </div>
    )
}
