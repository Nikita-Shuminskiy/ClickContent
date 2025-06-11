import plusIcon from "@/assets/images/icons/plus.svg";
import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper";
import { SkeletonUI } from "@/components/ui/SkeletonUI";
import { getCorrectPrice } from "@/helpers/NumberFormatter";
import { formatDate } from "@/helpers/Datetimeutils.ts";
import { useGetContracts, useGetPersons } from "@/OLD_rest/useAds";
import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";

const selectValue = [
  { value: "service", text: "Договор оказания услуг" },
  { value: "mediation", text: "Посреднический договор" },
  { value: "selfPromotion", text: "Договор саморекламы" },
  { value: "additional", text: "Дополнительное соглашение" },
];

const ContractorsSkeleton = () => {
  return (
    <section className='pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]'>
      <div className='container'>
        <div className='mb-10'>
          <div className='max-w-[191px] mb-8 max-h-[58px] rounded-xl overflow-hidden'>
            <SkeletonUI />
          </div>
          <div className='w-full flex flex-wrap gap-4'>
            <div className='max-h-[117px] w-full max-w-[318px] rounded-[32px] max-md:rounded-[20px] overflow-hidden'>
              <SkeletonUI />
            </div>
            <div className='max-h-[117px] w-full max-w-[318px] rounded-[32px] max-md:rounded-[20px] overflow-hidden'>
              <SkeletonUI />
            </div>
            <div className='max-h-[117px] w-full max-w-[318px] rounded-[32px] max-md:rounded-[20px] overflow-hidden'>
              <SkeletonUI />
            </div>
          </div>
        </div>
        <div className='max-w-[1096px] bg-[#141414] rounded-[30px] overflow-hidden p-10'>
          <div className='flex justify-between gap-x-10 mb-8'>
            <div className='max-w-[354px] w-full max-h-[29px] rounded-lg overflow-hidden'>
              <SkeletonUI />
            </div>
            <div className='max-w-[214px] w-full max-h-[29px] rounded-lg overflow-hidden'>
              <SkeletonUI />
            </div>
          </div>
          <div className='flex justify-between max-sm:hidden mb-[11px]'>
            <div className='max-w-[30px] max-h-[14px] rounded-lg max-md:rounded-[20px] overflow-hidden'>
              <SkeletonUI />
            </div>
            <div className='max-w-[82px] max-h-[14px] rounded-lg overflow-hidden'>
              <SkeletonUI />
            </div>
            <div className='max-w-[75px] max-h-[14px] rounded-lg overflow-hidden'>
              <SkeletonUI />
            </div>
            <div className='max-w-[82px] max-h-[14px] rounded-lg overflow-hidden'>
              <SkeletonUI />
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='max-w-[1016px] max-h-[43px] rounded-lg overflow-hidden'>
              <SkeletonUI />
            </div>
            <div className='max-w-[1016px] max-h-[43px] rounded-lg overflow-hidden'>
              <SkeletonUI />
            </div>
            <div className='max-w-[1016px] max-h-[43px] rounded-lg overflow-hidden'>
              <SkeletonUI />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contractors = () => {
  const navigator = useNavigate();
  const { contracts, isLoading: isContractsLoading } = useGetContracts();
  const { persons, isLoading: isPersonLoading } = useGetPersons();
  const [selectedPersons, setSelectedPersons] = useState(persons?.[0]);
  const contractsData = contracts?.filter(
    (contract) => contract.contractorId === selectedPersons?.id,
  );

  useEffect(() => {
    if (persons && persons.length > 0) {
      setSelectedPersons(persons[0]);
    }
  }, [persons]);

  return (
    <LoadingWrapper
      isLoading={isContractsLoading || isPersonLoading}
      skeleton={<ContractorsSkeleton />}
    >
      <section
        className='
    pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]'
      >
        <div className='container'>
          <div className='mb-10'>
            <h2 className='text-[32px] mb-8 font-bold max-md:text-2xl max-sm:text-lg'>
              Контрагенты
            </h2>
            <div className='w-full flex flex-wrap gap-4'>
              {persons?.map((person) => (
                <button
                  className={`flex items-center justify-between gap-4 rounded-[32px] p-10 bg-color-vmire max-md:p-8 max-md:rounded-[20px] ${
                    selectedPersons?.id === person.id
                      ? "text-white"
                      : "text-white/60"
                  }`}
                  key={person.id}
                  onClick={() => setSelectedPersons(person)}
                >
                  <span className='text-sm max-xs:text-xs'>
                    {person.name} / ИНН {person.inn}
                  </span>
                </button>
              ))}

              <button
                className='flex items-center gap-5 justify-between text-base font-bold rounded-[32px] p-10 border border-solid border-white/10 text-left max-md:p-8 max-md:rounded-[20px]'
                onClick={() => navigator("/ads?step=4&isContracts=true")}
              >
                <span>Добавить контрагента</span>
                <img src={plusIcon} aria-hidden='true' alt='Плюс' />
              </button>
            </div>
          </div>
          <div className='max-w-[1100px]'>
            <div className='flex flex-col rounded-[30px] min-h-[400px] bg-color-vmire p-10 max-sm:p-0 max-sm:bg-transparent'>
              {(selectedPersons || selectedPersons?.length > 0) && (
                <div className='flex items-center gap-5 justify-between mb-8 max-sm:flex-col'>
                  <h3 className='text-2xl max-w-[60%] max-sm:text-lg max-sm:self-start max-sm:max-w-full'>
                    <span className='font-bold'>{selectedPersons?.name}</span> /
                    ИНН
                    <span className='font-normal'>{selectedPersons?.inn}</span>
                  </h3>
                  <button
                    className='font-firstNeue flex items-center gap-1 max-sm:self-end'
                    onClick={() => navigator("/ads?step=6&isContracts=true")}
                  >
                    <img
                      className='w-6 h-6 object-cover'
                      src={plusIcon}
                      aria-hidden='true'
                      alt='Плюс'
                    />
                    Добавить договор
                  </button>
                </div>
              )}

              {(!contractsData ||
                contractsData.length === 0 ||
                (selectedPersons && selectedPersons?.length === 0)) && (
                <span className='w-full flex-grow h-full flex items-center justify-center'>
                  Ничего не найдено
                </span>
              )}

              {contractsData && contractsData?.length > 0 && (
                <div>
                  <div className='grid grid-cols-[1fr,_1.5fr,_1.3fr,_0.8fr,_0.2fr] items-center gap-4 mb-4 max-sm:hidden'>
                    <span className='font-firstNeue text-[12px] text-white/70'>
                      Дата
                    </span>
                    <span className='font-firstNeue text-[12px] text-white/70'>
                      Номер договора
                    </span>
                    <span className='font-firstNeue text-[12px] text-white/70'>
                      Тип договора
                    </span>
                    <span className='font-firstNeue text-[12px] text-white/70'>
                      Сумма
                    </span>
                    <span className='text-[12px] text-white/70'></span>
                  </div>
                  <ul className='grid gap-4 max-sm:gap-6'>
                    {contractsData?.map((contract) => (
                      <li key={contract.id}>
                        <div className='grid grid-cols-[1fr,_1.5fr,_1.3fr,_0.8fr,_0.2fr] items-center gap-4 pb-3 border-b border-b-white/10 max-sm:grid-cols-1'>
                          <div className='flex items-center justify-between gap-4'>
                            <span className='font-firstNeue hidden text-[12px] text-white/70 max-sm:block'>
                              Дата
                            </span>
                            <time
                              className='font-firstNeue flex flex-col text-[12px] max-sm:items-end'
                              data-time='312'
                            >
                              {formatDate(contract.created.substring(0, 10))}
                            </time>
                          </div>
                          <div className='flex items-center justify-between gap-4'>
                            <span className='font-firstNeue hidden text-[12px] text-white/70 max-sm:block'>
                              Номер договора
                            </span>
                            <span className='font-firstNeue text-base max-sm:text-right line-clamp-2'>
                              № {contract.serial}
                            </span>
                          </div>
                          <div className='flex items-center justify-between gap-4 w-full overflow-hidden'>
                            <span className='font-firstNeue hidden text-[12px] text-white/70 max-sm:block'>
                              Тип договора
                            </span>
                            <div className='font-firstNeue flex items-center gap-2 overflow-hidden'>
                              {
                                selectValue?.find(
                                  (option) =>
                                    option.value.toLocaleLowerCase() ===
                                    contract?.type.toLowerCase(),
                                )?.text
                              }
                            </div>
                          </div>
                          <div className='flex items-center justify-between gap-4'>
                            <span className='font-firstNeue hidden text-[12px] text-white/70 max-sm:block'>
                              Сумма
                            </span>
                            <span>
                              {getCorrectPrice(contract.amount / 100 || 0)}
                            </span>
                          </div>
                          <div className='flex flex-wrap justify-end items-center gap-[10px]'>
                            <Menu
                              as='div'
                              className='relative inline-block text-left'
                            >
                              <div>
                                <Menu.Button
                                  className='rotate-90'
                                  aria-label='редактировать'
                                >
                                  <span className='text-2xl'>...</span>
                                </Menu.Button>
                              </div>

                              {/* <Transition
                                as={Fragment}
                                enter='transition ease-out duration-100'
                                enterFrom='transform opacity-0 scale-95'
                                enterTo='transform opacity-100 scale-100'
                                leave='transition ease-in duration-75'
                                leaveFrom='transform opacity-100 scale-100'
                                leaveTo='transform opacity-0 scale-95'
                              >
                                <Menu.Items className='absolute right-0 z-10 mt-2 origin-top-right rounded-[16px] overflow-hidden bg-[#202020] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                  <div className='py-1'>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          type='submit'
                                          className={classNames(
                                            active
                                              ? "bg-white/10 text-gray-900"
                                              : "text-white",
                                            "flex items-center gap-2 text-white w-full px-4 py-2 text-left",
                                          )}
                                          onClick={() => {}}
                                        >
                                          Удалить
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition> */}
                            </Menu>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </LoadingWrapper>
  );
};

export default Contractors;
