import { FunctionComponent, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import { useScrollToTop } from "@/hooks/useScrollTop";
import { getCorrectPrice } from "@/helpers/NumberFormatter.ts";

export const BalanceInfo: FunctionComponent = memo(() => {
  const { data, refetch } = useGetUser();

  const balance = getCorrectPrice(data.balance.total);

  const scrollToTop = useScrollToTop();

  useEffect(() => {
    const id = +setInterval(async () => {
      await refetch();
    }, 10000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="flex items-center justify-between gap-5 mb-4 max-xs:items-start">
      <Link
        to="/settings"
        onClick={scrollToTop}
        className="text-2xl max-xs:text-base font-bold"
      >
        Ваш баланс
      </Link>
      {balance && (
        <span className="text-6xl font-bold max-sm:text-5xl max-xs:text-[24px]">
          {balance}
        </span>
      )}
    </div>
  );
});
