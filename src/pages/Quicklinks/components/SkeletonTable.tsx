import {SkeletonUI} from "@components/ui/SkeletonUI";
import React from "react";

export const SkeletonTable = () => {
    return (
        <>
            <div className="h-4 rounded-md overflow-hidden mb-4 max-sm:hidden">
                <SkeletonUI/>
            </div>
            <ul className="grid gap-3">
                <li>
                    <div className="w-full h-[44px] rounded-lg overflow-hidden max-sm:h-[190px]">
                        <SkeletonUI/>
                    </div>
                </li>
                <li>
                    <div className="w-full h-[44px] rounded-lg  overflow-hidden max-sm:h-[190px]">
                        <SkeletonUI/>
                    </div>
                </li>
                <li>
                    <div className="w-full h-[44px] rounded-lg overflow-hidden max-sm:h-[190px]">
                        <SkeletonUI/>
                    </div>
                </li>
                <li>
                    <div className="w-full h-[44px] rounded-lg overflow-hidden max-sm:h-[190px]">
                        <SkeletonUI/>
                    </div>
                </li>
            </ul>
        </>
    )
}
