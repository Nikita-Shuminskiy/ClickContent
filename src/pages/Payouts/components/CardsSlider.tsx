import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { formatCard } from "@/helpers/cardFormatters.ts";
import deleteCard from "@assets/images/icons/delete-card.svg";
import plusIcon from "@assets/images/icons/plus.svg";
import React, { useCallback } from "react";
import { useGetUser } from "@/core/api/api-hooks/ui/user/use-get-user.ts";
import { ICardDto } from "@/data-contracts.ts";
import { useUnlinkPaymentCard } from "@/core/api/api-hooks/finance/use-unlink-payment-card.ts";
import { useModal } from "@/contexts/ModalProvider/useModal.ts";
import { ModalKey } from "@/core/types/modal-key.ts";
import { Icon } from "@components/ui/icon/icon.tsx";

export const CardsSlider = () => {
  const { openModal } = useModal(ModalKey.UNLINK_PAYMENT_CARD);
  const { openModal: openAddCardModal } = useModal(ModalKey.ADD_CARD);

  const cards = useGetUser().data?.cards;

  /** отвязка платежной карты */
  const { mutateAsync: unlinkPaymentCard } = useUnlinkPaymentCard();

  const onSlideChange = useCallback((swiper) => {
    if (swiper?.isEnd) {
      swiper.el.classList.add("swiper-last-slide");
    } else {
      swiper.el.classList.remove("swiper-last-slide");
    }
  }, []);

  const handleOpenUnlinkCardModal = useCallback(
    (card: ICardDto) => {
      openModal({
        title: "Удалить карту?",
        text: formatCard(card),
        okButtonText: "Удалить",
        onOkButtonClick: () => unlinkPaymentCard(card.id),
      });
    },
    [openModal, unlinkPaymentCard],
  );

  const handleOpenAddCard = useCallback(
    () => openAddCardModal("addCard"),
    [openAddCardModal],
  );

  return (
    <Swiper
      modules={[Navigation]}
      onSlideChange={onSlideChange}
      slidesPerView="auto"
      watchOverflow={true}
      spaceBetween={10}
      className="w-full items-center flex flex-wrap gap-4 after:hidden !p-0"
      wrapperClass="items-center"
    >
      {cards?.map((card, i) => (
        <SwiperSlide className="max-w-[450px]">
          <div
            className="flex items-center justify-between gap-4 rounded-[32px] p-8 pt-[30px] pb-[30px] bg-color-vmire max-md:p-6 max-md:rounded-[20px]"
            key={i}
          >
            {/* <span className='checkboxUI__label max-xs:text-xs'></span> */}
            <span className="font-bold max-xs:font-normal max-xs:text-sm">
              {formatCard(card)}
            </span>
            <hr className=" w-[1px] h-[16px] border border-[#2b2b2b] flex" />
            <button
              className="w-7 h-7 flex-shrink-0 flex justify-center items-center"
              aria-label="Удалить карту"
              onClick={() => handleOpenUnlinkCardModal(card)}
            >
              <div>
                <Icon
                  name={"deleteCard"}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          </div>
        </SwiperSlide>
      ))}
      <SwiperSlide className="max-xs:hidden max-w-[257px]">
        <button
          className="flex items-center gap-5 justify-between text-base font-bold rounded-[32px] p-8 border border-solid border-white/10 text-left max-md:p-6 max-md:rounded-[20px]"
          onClick={handleOpenAddCard}
        >
          <span>Добавить карту</span>
          <Icon name={"plus"} />
        </button>
      </SwiperSlide>
    </Swiper>
  );
};
