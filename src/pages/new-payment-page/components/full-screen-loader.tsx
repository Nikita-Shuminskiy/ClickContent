import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const FullScreenLoader = () => {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <div className="absolute indent-0 ">
        <ClipLoader
          cssOverride={override}
          size={150}
          color={"#123abc"}
          loading={true}
          speedMultiplier={1.5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};
