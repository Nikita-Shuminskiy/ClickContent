import bgLand from "@/assets/images/all-img/bg-land.jpg";
import applyIcon from "@/assets/images/icons/apply.svg";
import { CSSProperties, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import StorageService from "@/core/service/storage-service.ts";
import { percentageCollected } from '@/helpers/PercentageCollected.ts';
import {getHasChangeNickName} from "@/helpers/CheckUserNickName.ts";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const SuccessAim = () => {
  const [data, setData] = useState(null); //IUserInfo
  const [error, setError] = useState(null);

  // const payment = StorageService.getPayment();
// todo
/*  useEffect(() => {
    if (payment == null) {
      setError("Ошибка");
    } else {
      let result =
        payment.type == "donate"
          ? InfoService.GetByNickname(payment.nickname)
          : InfoService.GetByShortLink(payment.id);
      result
        .then((json) => {
          setData(json.data);
        })
        .catch((e) => {
          setError("ошибка: " + e);
        });
    }
  }, []);*/
  const currentProcent = percentageCollected(10000, 40000);
  const hasChangedNickName = getHasChangeNickName(data?.nickname)
  return (
    <section className='pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]'>
      <div className='container'>
        {data != null && (
          <>
            <h2 className='sr-only'>Покупка</h2>
            <div className='fixed -z-[1] left-0 right-0 top-0 bottom-0 w-full h-full'>
              <img
                className='w-full h-full object-cover'
                src={bgLand}
                aria-hidden='true'
                alt='Фон'
              />
            </div>
            <div className='mb-9'>
              <div className='w-14 h-14 mb-8 mx-auto'>
                <img
                  className='w-full h-full object-contain'
                  src={applyIcon}
                  aria-hidden='true'
                  alt='Готово'
                />
              </div>
              <span className='block text-6xl font-bold text-center mb-4 max-md:text-5xl max-sm:text-4xl'>
                Поздравляем!
              </span>
              <span className='block text-2xl text-center max-sm:text-xl'>
                Оплата прошла успешно
              </span>
            </div>
            <div className='max-w-[800px] w-full m-auto'>
              <div className='flex flex-col gap-7 w-full bg-[#141414] py-[60px] px-14 text-white rounded-[35px] max-sm:p-6'>
                <div className='pb-5 border-b border-dashed border-white/60'>
                  <h3 className='text-lg'>
                    {/*{payment.type == "donate" && (*/}
                    {/*  <>*/}
                    {/*    Отправка кликсов пользователю{" "}*/}
                    {/*    <span className='text-[#A354D9]'>*/}
                    {/*   {*/}
                    {/*     hasChangedNickName && data?.nickname ? `@${data.nickname}` : <>*/}
                    {/*       {data.beneficiary?.firstName}*/}
                    {/*       {"\u00A0"}*/}
                    {/*       {data.beneficiary?.surname}*/}
                    {/*     </>*/}
                    {/*   }*/}
                    {/*    </span>*/}
                    {/*  </>*/}
                    {/*)}*/}
                    {/*{payment.type == "quicklink" && (*/}
                    {/*  <>*/}
                    {/*    Оплата доступа от пользователя{" "}*/}
                    {/*    <span className='text-[#A354D9]'>*/}
                    {/*    {*/}
                    {/*      hasChangedNickName && data?.nickname ? `@${data.nickname}` : <>*/}
                    {/*        {data.beneficiary?.firstName}*/}
                    {/*        {"\u00A0"}*/}
                    {/*        {data.beneficiary?.surname}*/}
                    {/*      </>*/}
                    {/*    }*/}
                    {/*    </span>*/}
                    {/*  </>*/}
                    {/*)}*/}
                  </h3>
                </div>
                <div className='p-8 rounded-[32px] bg-[#202020] max-xs:p-5 max-xs:rounded-2xl'>
                  <span className='block text-2xl font-bold text-white mb-2 max-sm:text-lg max-xs:text-base'>
                    Благотворительность
                  </span>
                  <p className='text-sm mb-5 max-xs:text-xs'>Описание цели</p>
                  <div className='w-full h-3 rounded-[100px] border border-solid border-white/20 mb-4 relative'>
                    <span
                      className='absolute flex items-center justify-end left-0 top-0 bottom-0 bg-[#874AB0] rounded-[100px]'
                      style={{ width: currentProcent + "%" }}
                    >
                      <span className='text-[10px] py-[5px] px-[10px] rounded-2xl bg-[#874AB0] -mr-4'>
                        {currentProcent}%
                      </span>
                    </span>
                  </div>
                  <div className='flex items-center gap-5  justify-between'>
                    <span className='text-center'>0 ₽</span>
                    <span className='text-center'>40000 ₽</span>
                  </div>
                </div>
            {/*    <div>
                  <span className='block text-sm text-white/60'>Владелец</span>
                  <span className='block text-base'>
                    {data.beneficiary.firstName}
                    {"\u00A0"}
                    {data.beneficiary.middleName}
                    {"\u00A0"}
                    {data.beneficiary.surname}
                  </span>
                </div>*/}
                <div>
                  <span className='block text-sm text-white/60'>Дата</span>
                  <span className='block text-base'>19.12.2023</span>
                </div>
                <div className='pt-6 border-t border-dashed border-white/60'>
                  <span className='block text-sm text-white/60'>Сумма </span>
                  <span className='block text-2xl font-bold'>
                    {/*{payment.amount} ₽*/}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {data == null &&
          ((error && (
            <div className='flex items-center justify-center h-full'>
              {error}
            </div>
          )) || (
            <div className='w-full flex items-center justify-center'>
              <ClipLoader
                cssOverride={override}
                size={150}
                color={"#123abc"}
                loading={true}
                speedMultiplier={1.5}
                aria-label='Loading Spinner'
                data-testid='loader'
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default SuccessAim;
