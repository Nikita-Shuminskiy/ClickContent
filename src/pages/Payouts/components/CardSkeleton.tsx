import { SkeletonUI } from "@components/ui/SkeletonUI";

export const CardSkeleton = () => {
  return (
    <>
      <div className="flex gap-3">
        <div className="w-full h-24 max-xs:hidden max-w-[450px] rounded-[32px] overflow-hidden">
          <SkeletonUI />
        </div>
        <div className="w-full h-24 max-xs:hidden max-w-[450px] rounded-[32px] overflow-hidden">
          <SkeletonUI />
        </div>
        <div className="w-full h-24 max-xs:hidden max-w-[257px] rounded-[32px] overflow-hidden">
          <SkeletonUI />
        </div>
      </div>
    </>
  );
};
