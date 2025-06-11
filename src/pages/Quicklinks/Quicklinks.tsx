import FreezeWrapper from "@/components/FreezeWrapper/FreezeWrapper.tsx";
import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper";
import { useUserInfoContext } from "@/contexts/UserProvider.tsx";
import { sortByDate } from "@/helpers/Sortings.ts";
import { useWindowWidth } from "@/hooks/useWindowWidth.ts";
import QuickLinksFormModal from "@/pages/Quicklinks/components/Forms/QuickLinksFormModal";
import QuickLinksInfoModal from "@/pages/Quicklinks/components/Forms/QuickLinksInfoModal";
import QuickLinksSuccesModal from "@/pages/Quicklinks/components/Forms/QuickLinksSuccesModal";
import QuickLinkTableView from "@/pages/Quicklinks/components/QuickLinkTableView.tsx";
import TabButtonUI from "@components/ui/TabButtonUI/TabButtonUI.tsx";
import { Tab, TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AlertModal from "../../components/AlertModal";
import TabListUI from "../../components/ui/TabListUI/TabListUI.tsx";
import QuickLinksForm from "@/pages/Quicklinks/components/Forms/QuickLinksForm.tsx";
import { useGetOwnerQuickLinks } from "@/core/api/api-hooks/ui/quick-link/use-get-owner-quick-links.ts";
import { useModal } from "@/contexts/ModalProvider/useModal.ts";
import { ModalKey } from "@/core/types/modal-key.ts";
import { SkeletonQuickLinks } from "@/pages/Quicklinks/components/SkeletonQuickLinks.tsx";
import { SkeletonTable } from "@/pages/Quicklinks/components/SkeletonTable.tsx";

const Quicklinks = () => {
  const { isMobile } = useWindowWidth();
  const { isNotPassport, isFrozenUser } = useUserInfoContext();

  const { openModal: openQuickLinkDetailsModal } = useModal(
    ModalKey.QUICK_LINK_DETAILS,
  );

  const [selectedQuicklink, setSelectedQuicklink] = useState(null);
  const [stateAlertModal, setStateAlertModal] = useState(false);
  const [alertProps, setAlertProps] = useState({
    title: "",
    text: "",
    okButtonText: "",
    onOkButtonClick: null,
  });
  const [stateQuickLinksSuccessModal, setStateQuickLinksSuccessModal] =
    useState(false);
  const [stateAdsModal, setStateAdsModal] = useState(false);
  const [isNotEditForm, setIsNotEditForm] = useState(false);
  const [stateQuickLinksModal, setStateQuickLinksModal] = useState(false); // редактирование быстрой ссылки\

  const [isAscending, setIsAscending] = useState(true);

  const [selectedOption, setSelectedOption] = useState("created");

  const selectValue = [
    {
      value: "created",
      text: "Сорт. по дате",
      function: sortByDate,
      selected: selectedOption === "created",
    },
    /*    {
         value: "Type",
         text: "Сорт. по типу",
         function: sortByType,
         selected: selectedOption === "Type",
         },*/
  ];

  const { data: quicklinks, isLoading } = useGetOwnerQuickLinks();

  const [data, setData] = useState([]);
  const toggleOption = (option) => {
    if (option === selectedOption) {
      setIsAscending(!isAscending);
    } else {
      setSelectedOption(option);
      setIsAscending(true);
    }

    const selectedOptionObj = selectValue.find((item) => item.value === option);
    if (selectedOptionObj) {
      selectedOptionObj.function({
        data: data,
        setData: setData,
        isAscending: isAscending,
      });
    }
  };
  useEffect(() => {
    setData(quicklinks);

    /*       const isHasLowCostQuickLink = quicklinks?.some(( quicklink ) => (quicklink.amount / 100) < 39)
       //todo логикапоказа модалки
               isHasLowCostQuickLink && setIsOpenPaymentAlert(true)

               return () => setIsOpenPaymentAlert(false)*/
  }, [quicklinks]);

  const tabListTitles = useMemo(
    () =>
      isMobile
        ? ["Все ссылки", "Новая ссылка"] //, "Перепродажа ссылки"
        : ["Новая ссылка"], //"Перепродажа ссылки"
    [isMobile],
  );
  const allLinksLayout = (
    <div className="w-[60%] max-lg:min-h-[300px] min-h-[813px] gap-8 bg-color-vmire max-sm:bg-transparent p-10 rounded-[32px] relative z-[2] max-lg:w-full max-sm:p-0">
      <div className="flex justify-between items-center gap-3 mb-8">
        <h3 className="text-2xl font-bold max-sm:hidden">Мои ссылки</h3>
        {quicklinks?.length > 0 &&
          selectValue.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleOption(option.value)}
            >
              {option.text}{" "}
              {selectedOption === option.value && (isAscending ? "↑" : "↓")}
            </button>
          ))}
      </div>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          {quicklinks?.length > 0 ? (
            <div>
              {/*         _0.8fr   для тип*/}
              <div className="grid grid-cols-[1fr,_1.3fr,_1.5fr,_1.7fr,1fr,_0.1fr] items-center gap-4 mb-4 max-sm:hidden">
                <span className="text-[12px] text-white/70">Название</span>
                <span className="text-[12px] text-white/70">Описание</span>
                <span className="text-[12px] text-white/70">Стоимость</span>
                <span className="text-[12px] text-white/70">Модерация</span>
                <span className="text-[12px] text-white/70">URL</span>
                <span className="text-[12px] text-white/70"></span>
              </div>
              <ul className="grid gap-4 max-sm:gap-6">
                {data?.length > 0 &&
                  data.map((ql, i) => {
                    const qlJsx = (
                      <QuickLinkTableView
                        setAlertProps={setAlertProps}
                        setStateAlertModal={setStateAlertModal}
                        setStateQuickLinksModal={setStateQuickLinksModal}
                        setSelectedQuicklink={setSelectedQuicklink}
                        ql={ql}
                      />
                    );
                    return (
                      <FreezeWrapper key={ql.id}>
                        <li
                          onClick={(e) => {
                            if (isFrozenUser) {
                              e.preventDefault();
                              return;
                            }
                            openQuickLinkDetailsModal(ql);
                          }}
                        >
                          {qlJsx}
                        </li>
                      </FreezeWrapper>
                    );
                  })}
              </ul>

              {/* </SimpleBar> */}
            </div>
          ) : (
            <div
              className={
                "flex items-center justify-center h-[100%] min-h-[300px]"
              }
            >
              {!isNotPassport && !quicklinks?.length ? (
                <Link
                  to={""}
                  onClick={(event) => {
                    setSelectedQuicklink(null);
                    setStateQuickLinksModal(true);
                  }}
                  className="text-white/70 text-center"
                >
                  <span className={"text-purple-500"}>Создайте</span> свою
                  первую ссылку и начните зарабатывать!
                </Link>
              ) : (
                <Link
                  to="/passport?warningModal=false"
                  className="text-white/70 text-center"
                >
                  <span className={"text-purple-500"}>Заполните профиль</span>,
                  чтобы создать свою первую ссылку!
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <LoadingWrapper isLoading={isLoading} skeleton={<SkeletonQuickLinks />}>
      <section className="pt-[80px] pb-[80px] max-sm:pb-[40px] max-sm:pt-[10px]">
        <QuickLinksFormModal
          edit={selectedQuicklink}
          isOpen={stateQuickLinksModal}
          setOpen={(isOpen) => {
            setStateQuickLinksModal(isOpen);
          }}
          onSuccess={async (edited, created) => {
            if (created) {
              setSelectedQuicklink(edited);
              setStateQuickLinksSuccessModal(true);
              setIsNotEditForm(edited?.isCreateAds);
            }
          }}
        />
        <QuickLinksInfoModal />

        <div className="container !px-[20px]">
          <h2 className="text-[32px] font-bold mb-4 max-md:text-2xl max-sm:text-[24px]">
            Добавление контента для продажи
          </h2>
          <div className="flex gap-4 max-lg:flex-col">
            <div className="w-[100%] max-w-[665px] max-lg:max-w-[100%]">
              <div className="lg:bg-color-vmire p-10 rounded-[32px] mb-4 relative z-[2] max-sm:p-0">
                <TabGroup>
                  {isMobile && (
                    <TabListUI>
                      {tabListTitles.map((title, i) => {
                        return (
                          <TabButtonUI key={`${i}-${title}`} text={title} />
                        );
                      })}
                    </TabListUI>
                  )}
                  <TabPanels>
                    {isMobile && (
                      <Tab.Panel className="!outline-none">
                        {allLinksLayout}
                      </Tab.Panel>
                    )}
                    <TabPanel className="!outline-none">
                      <h3 className="text-2xl font-bold mb-[16px] max-sm:text-base">
                        Создать платную ссылку на контент{" "}
                        {/*mt-[24px] //todo */}
                      </h3>
                      <QuickLinksForm
                        setStateQuickLinksModal={setStateQuickLinksModal}
                        edit={null}
                        onSuccess={async (edited, created) => {
                          if (created) {
                            setSelectedQuicklink(edited);
                            setStateQuickLinksSuccessModal(true);
                            setIsNotEditForm(edited?.isCreateAds);
                          }
                        }}
                      />
                    </TabPanel>
                    {/*      <TabPanel>
                                         //Todo пока не удаляем блок
                                         <h3 className='text-2xl font-bold mb-[16px] mt-[24px]  max-sm:text-base'>
                                         Создать платную ссылку на контент
                                         </h3>
                                         <QuickLinksResellForm
                                         onSuccess={async (edited, created) => {
                                         if (created) {
                                         await refetch();
                                         setSelectedQuicklink(edited);
                                         setStateQuickLinksSuccessModal(true);
                                         }
                                         }}
                                         />
                                         </TabPanel>*/}
                  </TabPanels>
                </TabGroup>
                <QuickLinksSuccesModal
                  edit={selectedQuicklink}
                  isOpen={stateQuickLinksSuccessModal}
                  setOpen={setStateQuickLinksSuccessModal}
                  handleCloseModal={() => {
                    setStateAdsModal(isNotEditForm);
                  }}
                />
              </div>
            </div>
            {!isMobile && allLinksLayout}
          </div>
        </div>
      </section>
      <AlertModal
        classNameModalContainer={"p-[37px]"}
        hasCloseBtn={false}
        title={alertProps.title}
        text={alertProps.text}
        okButtonText={alertProps.okButtonText}
        onOkButtonClick={alertProps.onOkButtonClick}
        isOpen={stateAlertModal}
        setOpen={setStateAlertModal}
      />
      {/*      <AlertModal
                title="Маркировка рекламы"
                text="Далее вы можете установить рекламный маркер для вашего объявления"
                okButtonText="Подробнее"
                isOpen={stateAdsModal}
                setOpen={setStateAdsModal}
                onCloseModal={() => setIsNotEditForm(false)}
                onOkButtonClick={() =>
                    navigate(
                        `/ads?step=2&linkType=quicklink&linkId=${selectedQuicklink?.id}`,
                    )
                }
            />*/}
    </LoadingWrapper>
  );
};

export default Quicklinks;

/*
    const [ isOpenPaymentAlert, setIsOpenPaymentAlert ] = useState(false)
<AlertModal
maxWidth={ 800 }
classNameModalContainer={ "p-[37px]" }
title={ '' }
text={ <div className={ 'flex flex-col gap-[10px]' }>
    <h3>Ссылки стоимостью менее 39 рублей не могут быть проданы! Вы можете изменить стоимость или удалить контент.</h3>
</div> }
okButtonText={ 'OK' }
onOkButtonClick={ () => {
    setIsOpenPaymentAlert(false)
} }
hasCanselBtn={ false }
isOpen={ isOpenPaymentAlert }
/>*/
