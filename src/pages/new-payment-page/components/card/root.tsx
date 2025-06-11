import { FunctionComponent, memo, PropsWithChildren } from "react";

export interface IProps extends PropsWithChildren {
    classname?: string
}

export const Root: FunctionComponent<IProps> = memo(( { classname, children } ) => {

        return (
            <div
                className={ `overflow-hidden  relative bg-[#0E0E0E] pb-6 rounded-[32px] shadow-lg max-w-[536px] w-full  z-10 text-black max-lg:max-w-[430px]  max-sm:!rounded-none max-sm:overflow-y-auto max-sm:h-full max-sm:max-w-full max-sm:w-full ${ classname ?? '' }` }>
                { children }
            </div>
        )
    }
)

