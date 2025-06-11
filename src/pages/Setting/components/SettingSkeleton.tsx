import {SkeletonUI} from "@components/ui/SkeletonUI";
import React from "react";

export const SettingSkeleton = () => {
    return (
        <section className="pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]">
            <div className="container">
                <div className="h-8 mb-8 rounded-[8px] overflow-hidden max-sm:mb-6 max-sm:rounded-lg">
                    <SkeletonUI>
                        <rect
                            className={"max-sm:w-[40%]"}
                            x="0"
                            y="0"
                            rx="8"
                            ry="8"
                            width="20%"
                            height="30"
                        />
                    </SkeletonUI>
                </div>
                <div className="flex items-center gap-4 max-md:flex-col">
                    <div className="w-[50%] h-[430px] p-[40px] max-sm:p-[20px] bg-[#141414] rounded-[32px] max-lg:w-[60%] max-md:w-full max-sm:h-[350px]">
                        <SkeletonUI>
                            <rect x="0" y="0" rx="8" ry="8" width="50%" height="30" />
                            <rect x="0" y="60" rx="16" ry="16" width="100%" height="79" />
                            <rect x="0" y="150" rx="16" ry="16" width="100%" height="79" />
                            <rect x="0" y="250" rx="30" ry="30" width="30%" height="59" />
                        </SkeletonUI>
                    </div>
                    <div className="w-[50%] grid grid-cols-2 gap-4 max-lg:grid-cols-1 max-lg:w-[40%] max-md:w-full">
                        <div className="w-full grow p-[40px] max-sm:p-[20px] rounded-[32px] bg-[#141414]  overflow-hidden max-sm:rounded-3xl h-[210px]">
                            <SkeletonUI>
                                <rect x="0" y="0" rx="8" ry="8" width="50%" height="40" />
                                <rect x="0" y="50" rx="5" ry="5" width="70%" height="50" />
                            </SkeletonUI>
                        </div>
                        <div className="w-full grow p-[40px] max-sm:p-[20px] rounded-[32px] bg-[#141414]  overflow-hidden max-sm:rounded-3xl h-[210px]">
                            <SkeletonUI>
                                <rect x="0" y="0" rx="8" ry="8" width="50%" height="40" />
                                <rect x="0" y="60" rx="8" ry="8" width="70%" height="50" />
                            </SkeletonUI>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};