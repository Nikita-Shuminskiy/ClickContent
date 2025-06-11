import ContentLoader from "react-content-loader";
import React from "react";
type SkeletonUIProps = {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
}
const SkeletonUI = ({ children, width, height }: SkeletonUIProps) => {
  return (
    <ContentLoader
      speed={2}
      width={ width ?? "100%"}
      height={ height ?? "100%"}
      backgroundColor="#FFFFFF0D"
      foregroundColor="#141414"
    >
      {children ?? <rect x="0" y="0" rx="5" ry="5" width="100%" height='100%'  />}
    </ContentLoader>
  );
};

export default SkeletonUI;
