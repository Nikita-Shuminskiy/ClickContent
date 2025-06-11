import { SkeletonUI } from "@components/ui/SkeletonUI";
import React from "react";

export const UserMenuSkeleton = () => {
  return (
    <div className="max-w-[170px] w-full h-12 rounded-[60px] overflow-hidden max-xs:rounded-[10px] max-xs:h-[50px] max-xs:max-w-[85px]">
      <SkeletonUI />
    </div>
  );
};
