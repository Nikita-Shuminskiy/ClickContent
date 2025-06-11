import { useNavigate } from 'react-router-dom';
import { ButtonUI } from '@components/ui/ButtonUI'
import SimpleBar from 'simplebar-react';
import { formatDate, formatTime } from '@/helpers/Datetimeutils.ts';
import { getCorrectPrice } from '@/helpers/NumberFormatter.ts';

interface IModalBottom {
  lastTransactions?: any[];
  wrapperClassName?: string;
}

export default function ModalBottom({ lastTransactions, wrapperClassName }: IModalBottom) {
  const navigate = useNavigate();
  const handleReadMore = () => {
    navigate("/payouts");
  };
  return (
    <div className={wrapperClassName ? wrapperClassName : ''}>
      {lastTransactions?.length > 0 && (
        <>
          <div className="flex items-center justify-between gap-5 mb-8 max-sm:flex-col">
            <h3 className="text-2xl font-bold text-left">
              Последние проведенные транзакции
            </h3>
           {/* <div className="max-w-[220px] w-full max-sm:max-w-full max-sm:hidden">
              <ButtonUI
                variant="border"
                className={
                  'max-xs:!py-[20px] max-xs:text-[16px]'
                }
                onClick={handleReadMore}
              >
                Смотреть больше
              </ButtonUI>
            </div>*/}
          </div>
          <div className="grid grid-cols-[0.6fr,0.6fr,_1.2fr,_0.4fr] gap-4 mb-4 pb-3 max-sm:hidden">
            <span className="text-xs text-white/70">Дата</span>
            <span className="text-xs text-white/70">Отправитель</span>
            <span className="text-xs text-white/70">Сообщение</span>
            <span className="text-xs text-white/70 text-right">
              Сумма
            </span>
          </div>
          <SimpleBar style={{ maxHeight: 800 }} className='max-sm:mb-8 '>
            <ul className="grid gap-4">
              {lastTransactions.map((ui, i) => {
                return <li key={`${ui.id}-${i}`}>
                  <div
                      className={`grid grid-cols-[0.6fr,0.6fr,_1.2fr,_0.4fr] gap-4 items-start pb-3 border-b border-solid border-b-white/10 max-sm:grid-cols-[1fr,_0.4fr] max-sm:gap-2 max-sm:items-center ${i === lastTransactions.length - 1 ? 'border-b-0' : ''}`}>
                    <div className="flex items-center gap-3 flex-wrap max-sm:order-1">
                      <span className="text-xs max-xs:text-[10px]">
                        {formatDate(ui?.operationDate)}
                      </span>
                      <span className="text-xs max-xs:text-[10px]">
                        {formatTime(ui?.operationDate)}
                      </span>
                    </div>
                    <div className="max-sm:order-5 max-sm:col-span-full">
                      <p className="text-base text-white max-xs:text-[10px] max-xs:leading-[1.4]">
                        {ui?.user?.nickname || ui?.user?.fio || 'guest'}
                      </p>
                    </div>
                    <div className="max-sm:order-5 max-sm:col-span-full">
                      <p className="text-base text-white/70 max-xs:text-[10px] max-xs:leading-[1.4]">
                        {ui.donatorComment}
                      </p>
                    </div>
                    <div className="text-right max-sm:order-3">
                      <span className="w-full text-base text-right max-xs:font-bold">
                        {getCorrectPrice(ui.amount)}
                      </span>
                    </div>
                  </div>
                </li>
              })}
            </ul>
          </SimpleBar>
        </>
      )}
      <div className="max-w-[220px] w-full max-sm:max-w-full hidden max-sm:block">
        <ButtonUI
            variant="border"
            className={
              'max-xs:!py-[20px] max-xs:text-[16px]'
            }
            onClick={handleReadMore}
        >
          Смотреть больше
        </ButtonUI>
      </div>
    </div>
  )
}
