import { FunctionComponent, memo } from "react";
import { Link } from "react-router-dom";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user";
import { TooltipModalUI } from "@components/ui/TooltipModalUI";

export const CommissionInfo: FunctionComponent = memo(() => {
  const user = useGetUser().data;

  return (
    <div className="mb-1 flex flex-row flex-wrap gap-2 max-xs:flex-col">
      <h3 className="text-lg max-xs:text-sm font-medium">
        Комиссия: {user.balance && user.commission}%
      </h3>
      <TooltipModalUI
        hasCanselBtn={false}
        okButtonText="OK"
        hasImage={false}
        title="Получи пониженную комиссию на использование ClickContent!"
        text={
          <>
            <p>
              Стань партнёром сервиса: добавь в свои социальные сети ссылку на
              сайт ClickContent и
              <Link
                to="/feedback"
                className="text-lg font-medium text-purple-500"
              >
                &nbsp;пришли&nbsp;
              </Link>
              нам ссылку на профиль! Мы проверим наличие ссылки и установим
              пониженную комиссию!
            </p>
          </>
        }
      >
        <span className={"text-lg max-xs:text-sm font-medium text-[#874AB0]"}>
          Понизить комиссию
        </span>
      </TooltipModalUI>
    </div>
  );
});
