import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import { Extra, IAddCardDto } from "@/data-contracts";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider";
import { usePayForQuickLink } from "@/core/api/api-hooks/finance/use-pay-for-quicklink";
import StorageService from "@/core/service/storage-service";
import { PayErrorAlert } from "./pay-error-alert";

interface IProps {
  data?: IAddCardDto;
  isPayRejected: boolean;
  isDataPending: boolean;
}

export const SBPPayment: FunctionComponent<IProps> = memo(
  ({ data, isPayRejected, isDataPending }) => {
    const { showAlert, hideAlert } = useAlert();
    const { quickLinkId } = useParams<{ quickLinkId?: string }>();

    const {
      mutateAsync: pay,
      data: newQrData,
      isPending,
    } = usePayForQuickLink();

    const [timeLeft, setTimeLeft] = useState(300);
    const [isTimeUp, setIsTimeUp] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
    };

    const refreshSbpQr = useCallback(async () => {
      try {
        await pay({
          quicklinkId: quickLinkId,
          byQr: true,
          extra: {} as Extra,
        });
        StorageService.setPoolingStarting();
      } catch (e) {
        showAlert(
          <PayErrorAlert
            title="Возникла ошибка!"
            text="Пожалуйста, повторите попытку позже, либо свяжитесь с автором ссылки"
          />,
          "error",
          5000,
        );
        console.log("Refresh payment error", e);
      } finally {
        hideAlert();
        setIsTimeUp(false);
        setTimeLeft(300);
      }
    }, []);

    const isQrNotAllowed = isPayRejected || isTimeUp || isPending;

    const qr = newQrData ? newQrData?.url : data?.url;

    useEffect(() => {
      if (timeLeft > 0) {
        timerRef.current = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      } else {
        setIsTimeUp(true);
        showAlert(
          <PayErrorAlert
            title="QR код на оплату устарел"
            text="Для быстрой и удобной оплаты по СБП, обновите QR код"
            action={
              <div
                className="text-[14px] leading-[19px] font-bold text-[#874AB0] cursor-pointer"
                onClick={refreshSbpQr}
              >
                Обновить
              </div>
            }
          />,
          "error",
          15000,
        );
        StorageService.stopPooling();
      }
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, [timeLeft]);

    if (isDataPending) return null;

    return (
      <div className="max-w-[478px] !w-full pr-[82px] pt-[10px] pb-[16px] border-r border-white/10 max-lg:pr-[34px] max-lg:py-0 max-sm:pr-[29px] max-sm:pt-0 max-xs:border-t max-xs:pt-[24px] max-xs:border-white/10 max-xs:border-r-0 max-xs:px-[32px] mobile:hidden">
        <div className="h-full w-full flex flex-col gap-6 items-center max-sm:gap-4 max-xs:gap-3">
          <p className="font-steppe font-bold text-center text-[24px] leading-[29px] text-[#F8F8F8] max-lg:text-[18px] max-lg:leading-[22px] max-xs:text-[16px] max-xs:leading-[19px]">
            Оплатите через СБП в приложении вашего банка
          </p>

          <div className="px-[10px] max-lg:px-[51px] max-sm:px-[22px]">
            <div className="w-[376px] h-[376px] bg-gradient-to-br from-[#F0826C] via-[#874AB0] to-[#863AFF] rounded-[56px] p-6 max-lg:w-[220px] max-lg:h-[220px] max-lg:p-4 max-lg:rounded-[41px] max-xs:w-[192px] max-xs:h-[192px]">
              <div
                className={`w-full h-full p-6  bg-white rounded-[36px] max-lg:p-4 max-lg:rounded-[26px] ${
                  isQrNotAllowed && "blur-[7px]"
                }`}
              >
                <QRCode
                  value={qr}
                  id="qr-code-sbp"
                  className="custom-qr-code"
                />
              </div>
            </div>
          </div>

          {isTimeUp ? (
            <p className="text-center font-steppe text-[12px] leading-[14.4px] text-white max-sm:text-[10px] max-sm:leading-3">
              Срок действия QR-кода истек. Для продолжения <br />
              нужно{" "}
              <span
                className="inline-block underline cursor-pointer"
                onClick={refreshSbpQr}
              >
                обновить QR-код
              </span>
            </p>
          ) : isPayRejected ? (
            <p className="text-center font-steppe  text-[12px] leading-[14.4px] text-white max-sm:text-[10px] max-sm:leading-3">
              QR код недоступен
            </p>
          ) : (
            <p className="text-center font-steppe  text-[12px] leading-[14.4px] text-white max-sm:text-[10px] max-sm:leading-3">
              Срок действия QR-кода истекает <br /> через {formatTime(timeLeft)}
            </p>
          )}
          <div className="py-3 px-6 bg-[#FFFFFF0D] rounded-[50px] w-full max-sm:rounded-[32px] max-xs:mt-[4px]   max-sm:text-[10px] max-sm:leading-3">
            <p className=" m-auto text-center font-steppe text-[12px] leading-[14.4px] text-white max-w-[300px] max-lg:max-w-[274px] max-sm:max-w-[188px] max-sm:text-[10px] max-sm:leading-[12px] max-xs:max-w-[310px] ">
              Для оплаты отсканируйте QR-код в приложении вашего банка, либо
              штатной камерой телефона
            </p>
          </div>
          {/*<div className='hidden max-sm:block'>*/}
          {/*    <Terms/>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  },
);
