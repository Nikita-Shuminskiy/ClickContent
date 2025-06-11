import React from "react";
import SEOHelmet from "@components/SeoHelmet/SeoHelmet.tsx";
import { seoVariables } from "@/constants/seo-variables.ts";
import { motion } from "framer-motion";
import { cardsAbout } from "@/pages/Landing/components/constants.tsx";
import { ButtonUI } from "@components/ui/ButtonUI";

const About = ({}) => {
  const onOpenTelegram = () => {
    window.open("https://t.me/clickcontenteu_bot", "_blank");
  };

  return (
    <section className="pt-[68px] max-sm:pt-[40px] pb-[50px] max-sm:px-[10px]">
      <SEOHelmet
        title={seoVariables.ABOUT.title}
        description={seoVariables.MAIN.description}
        keywords={seoVariables.ABOUT.keywords}
        ogTitle={seoVariables.MAIN.ogTitle}
        ogDescription={seoVariables.MAIN.ogDescription}
        ogUrl={seoVariables.ABOUT.ogUrl}
      />
      <div className=" flex flex-col gap-[10px] items-center max-sm:!width-[100%]">
        <div
          style={{ gridTemplateColumns: "40% 30% 30%" }}
          className="grid  max-semi-lg:grid-cols-2  gap-[9px] auto-rows-fr max-md:flex max-md:flex-col-reverse  max-md:w-full"
        >
          {cardsAbout.slice(0, 3).map((card, index) => (
            <Card
              key={index}
              {...card}
              onClick={card?.isClick && onOpenTelegram}
            />
          ))}
        </div>
        <div
          style={{ gridTemplateColumns: "30% 30% 40%" }}
          className="grid  max-semi-lg:grid-cols-2  gap-[9px] auto-rows-fr max-md:flex max-md:flex-col-reverse max-md:w-full"
        >
          {cardsAbout.slice(3).map((card, index) => (
            <Card
              key={index}
              {...card}
              onClick={card?.isClick && onOpenTelegram}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({
  title,
  text,
  color,
  img,
  classNameImg,
  classNameContainer,
  animation,
  onClick,
}) => {
  return (
    <motion.div
      className={`rounded-[60px] text-white ${color} relative h-[343px] ${classNameContainer} h-[343px] overflow-hidden `}
      initial={{ rotate: 0 }}
      animate={{ rotate: animation.rotate }}
      transition={{
        duration: animation.duration,
        repeat: Infinity,
        repeatType: "reverse",
        delay: animation.delay,
      }}
    >
      <div
        className={"py-[42px] px-[35px] flex flex-col gap-[20px] items-start"}
      >
        <h2
          className="text-[46px] max-xl:text-[32px] font-bold font-PPNeueMachina z-[9] "
          style={{ lineHeight: "100%" }}
        >
          {title}
        </h2>
        <p className="text-sm font-firstNeue text-[16px] relative z-[99]">
          {text}
        </p>
        {onClick && (
          <ButtonUI
            onClick={onClick}
            className={"!bg-[#F8F8F8] !text-black max-w-[139px] z-[9]"}
          >
            Перейти
          </ButtonUI>
        )}
      </div>

      <div className={"w-[100%] flex items-end justify-end"}>
        <img
          className={`${classNameImg} object-contain`}
          src={img}
          alt={title}
        />
      </div>
    </motion.div>
  );
};

export default About;
