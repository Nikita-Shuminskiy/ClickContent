import React from "react";
import {SkeletonUI} from "@components/ui/SkeletonUI";

export const DashboardSkeleton = () => {
  return (
    <section className="pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]">
      <div className="container">
        <div className="flex flex-row gap-[16px] max-sm:flex-col">
          <div className="flex flex-col gap-[16px] w-full">
            <div className="rounded-[32px] w-[100%] h-[258px] bg-[#141414]  p-[40px] max-sm:p-[20px]">
              <SkeletonUI>
                <rect x="0" y="20" rx="8" ry="8" width="25%" height="30" />
                <rect x="60%" y="0" rx="8" ry="8" width="40%" height="70" />

                <rect x="0" y="70" rx="8" ry="8" width="15%" height="20" />
                <rect x="0" y="125" rx="8" ry="8" width="30%" height="42" />
                <rect x="65%" y="110" rx="30" ry="30" width="30%" height="59" />
              </SkeletonUI>
            </div>
            <div className="rounded-[32px] w-[100%] h-[574px] bg-[#141414]  p-[40px] max-sm:p-[20px]">
                <SkeletonUI>
                    <rect x="0" y="0" rx="8" ry="8" width="25%" height="30"/>
                    <rect x="80%" y="0" rx="8" ry="8" width="20%" height="30"/>

                    <rect x="0" y="50" rx="16" ry="16" width="40%" height="185"/>
                    <rect x="45%" y="50" rx="16" ry="16" width="40%" height="185"/>
                    <rect x="90%" y="50" rx="16" ry="16" width="15%" height="185"/>

                    <rect x="0" y="250" rx="8" ry="8" width="25%" height="30"/>
                    <rect x="80%" y="250" rx="8" ry="8" width="20%" height="30"/>

                    <rect x="0" y="300" rx="16" ry="16" width="40%" height="185"/>
                    <rect x="45%" y="300" rx="16" ry="16" width="40%" height="185"/>
                    <rect x="90%" y="300" rx="16" ry="16" width="15%" height="185"/>
                </SkeletonUI>
            </div>
          </div>
            <div className="flex flex-col gap-[16px]  w-full">
                <div className="rounded-[32px] w-[100%] h-[482px] bg-[#141414]  p-[40px] max-sm:p-[20px]">
                    <SkeletonUI>
                        <rect x="0" y="0" rx="8" ry="8" width="20%" height="30"/>
                        <rect x="80%" y="0" rx="8" ry="8" width="20%" height="30"/>
                    </SkeletonUI>
                </div>
                <div className="rounded-[32px] w-[100%] h-[348px] bg-[#141414]  p-[40px] max-sm:p-[20px]">
                    <SkeletonUI>
                        <rect x="0" y="0" rx="8" ry="8" width="40%" height="30"/>
                        <rect x="80%" y="0" rx="8" ry="8" width="20%" height="30"/>
                    </SkeletonUI>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
