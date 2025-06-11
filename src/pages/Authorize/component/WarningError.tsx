import React from "react";
import { Link } from "react-router-dom";

const WarningError = ({ text }: { text?: string }) => {
  const redirectUrl =
    localStorage.getItem("currentRedirectUrl") || "/dashboard";

  return (
    <div className={"flex items-center flex-col"}>
      <span className="block text-6xl font-bold text-center mb-4 max-md:text-5xl max-sm:text-4xl">
        {text ? text : "Что-то пошло не так..."}
      </span>
      {redirectUrl && (
        <Link
          className="p-5 max-w-[240px] w-full bg-[#874AB0] text-white text-base text-center leading-none rounded-[60px] max-xs:max-w-full"
          to={redirectUrl}
        >
          Попробовать снова
        </Link>
      )}
    </div>
  );
};

export default WarningError;
