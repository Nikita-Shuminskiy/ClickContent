interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
}

const LoadingWrapper = ({
  isLoading,
  children,
  skeleton,
}: LoadingWrapperProps) => {
  if (isLoading) {
    return skeleton;
  }

  return children;
};

export default LoadingWrapper;
