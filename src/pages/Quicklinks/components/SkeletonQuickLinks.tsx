import { SkeletonUI } from "@components/ui/SkeletonUI";
import React from "react";

export const SkeletonQuickLinks = () => {
  return (
    <section className="pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]">
      <div className="container">
        <div className="w-[400px] h-8 mb-8 rounded-[8px] overflow-hidden max-sm:mb-6 max-sm:rounded-lg">
          <SkeletonUI>
            <rect
              className={"max-sm:w-[50%]"}
              x="0"
              y="0"
              rx="8"
              ry="8"
              width="100%"
              height="30"
            />
          </SkeletonUI>
        </div>
        <div className="flex items-start gap-8 max-lg:flex-col">
          <div className="w-2/4 h-[782px]  p-[40px] max-sm:p-[20px] rounded-[32px] bg-[#141414] overflow-hidden max-lg:w-full max-lg:h-[600px] max-sm:h-[550px] max-sm:rounded-3xl">
            <SkeletonUI>
              <rect x="0" y="0" rx="8" ry="8" width="50%" height="30" />
              <rect x="0" y="60" rx="8" ry="8" width="50%" height="24" />
              <rect x="92%" y="60" rx="8" ry="8" width="8%" height="24" />

              <rect x="0" y="110" rx="16" ry="16" width="100%" height="79" />
              <rect x="0" y="205" rx="16" ry="16" width="100%" height="79" />
              <rect x="0" y="300" rx="16" ry="16" width="100%" height="79" />

              <rect x="0" y="390" rx="8" ry="8" width="50%" height="24" />
              <rect x="92%" y="390" rx="8" ry="8" width="8%" height="24" />
              <rect x="0" y="430" rx="16" ry="16" width="100%" height="79" />
              <rect x="0" y="520" rx="8" ry="8" width="30%" height="24" />
              <rect x="92%" y="520" rx="8" ry="8" width="8%" height="24" />
              <rect x="0" y="580" rx="30" ry="30" width="30%" height="59" />
            </SkeletonUI>
          </div>
          <div className="w-2/4 h-[782px] p-[40px] max-sm:p-[20px] rounded-[32px] bg-[#141414] overflow-hidden max-lg:w-full max-lg:h-[600px] max-sm:h-[450px] max-sm:rounded-3xl">
            <SkeletonUI>
              <rect x="0" y="0" rx="8" ry="8" width="120px" height="30" />
              <rect x="95%" y="0" rx="20" ry="20" width="4%" height="25" />

              <rect x="0" y="60" rx="8" ry="8" width="8%" height="20" />
              <rect x="25%" y="60" rx="8" ry="8" width="8%" height="20" />
              <rect x="50%" y="60" rx="8" ry="8" width="5%" height="20" />
              <rect x="70%" y="60" rx="8" ry="8" width="7%" height="20" />
              <rect x="92%" y="60" rx="8" ry="8" width="8%" height="20" />

              <rect x="0" y="90" rx="8" ry="8" width="100%" height="38" />
              <rect x="0" y="140" rx="8" ry="8" width="100%" height="38" />
              <rect x="0" y="190" rx="8" ry="8" width="100%" height="38" />
            </SkeletonUI>
          </div>
        </div>
      </div>
    </section>
  );
};
