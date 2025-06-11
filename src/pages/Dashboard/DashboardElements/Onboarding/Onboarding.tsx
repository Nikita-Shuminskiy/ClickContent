import React, { memo, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { onboardingData, OnboardingKey } from "@/constants/onboarding.ts";
import { useWindowWidth } from "@/hooks/useWindowWidth.ts";
import OnboardDetailInfoModal from "@/pages/Dashboard/DashboardElements/Onboarding/OnboardDetailInfoModal.tsx";

type OnboardingProps = {
  onSlideChange: (swiper) => void;
  onOpenQuickLinksModal: () => void;
  setSelectedQuicklink: (data) => void;
};
const Onboarding = ({
  onSlideChange,
  onOpenQuickLinksModal,
  setSelectedQuicklink,
}: OnboardingProps) => {
  const { isMobile } = useWindowWidth();
  const [onboardKey, setCurrentOnboardKey] = useState<OnboardingKey | null>(
    null,
  );
  const onClickSwiperSlide = (data: OnboardingKey) => {
    setCurrentOnboardKey(data);
  };
  const onOpenModalQuickLink = () => {
    setCurrentOnboardKey(null);
    setSelectedQuicklink(null);
    onOpenQuickLinksModal();
  };
  return (
    <div
      className={`mb-[12px] overflow-hidden w-[100%] ${
        isMobile ? "fixed bottom-0 z-[999]" : ""
      }`}
    >
      <Swiper
        navigation={!isMobile}
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView="auto"
        className={"!overflow-visible swiper-onboard"}
        onSlideChange={onSlideChange}
      >
        {onboardingData.map((onboard, i) => {
          const { image, name, background } = onboard;
          return (
            <SwiperSlide
              className="cursor-pointer max-w-[275px] h-[86px] !mr-[8px]"
              key={`${i}-${name}`}
              onClick={() => onClickSwiperSlide(onboard.key)}
            >
              <div
                style={{ background }}
                className={
                  "rounded-[16px] flex center justify-between  w-[275px] h-[86px]"
                }
              >
                <div
                  className={"py-[16px] pl-[32px] flex flex-col justify-center"}
                >
                  <h3 className="text-base font-bold max-xs:text-sm">{name}</h3>
                  <span className={"text-xs font-['TTFirsNeue']"}>
                    Узнай как использовать
                  </span>
                </div>
                <img
                  className="w-[75px] h-[75px] py-[6px]"
                  src={image}
                  aria-hidden="true"
                  alt={name}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {!!onboardKey && (
        <OnboardDetailInfoModal
          onOpenQuickLinksModal={onOpenModalQuickLink}
          from={onboardKey}
          isOpen={true}
          onClose={() => setCurrentOnboardKey(null)}
        />
      )}
    </div>
  );
};

export default memo(Onboarding);
