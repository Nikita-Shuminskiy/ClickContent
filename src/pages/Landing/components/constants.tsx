import housImg from "@assets/images/all-img/landing/hous.png";
import worldImg from "@assets/images/all-img/landing/world.png";
import bookMoneyImg from "@assets/images/all-img/landing/book-money.png";
import agrementImg from "@assets/images/all-img/landing/agrement.png";
import rectangleImg from "@assets/images/all-img/landing/rectangle.png";
import telegramImg from "@assets/images/all-img/landing/telegram.png";

export enum ActivePageEnum {
  MAIN = "MAIN",
  ABOUT = "ABOUT",
  USEFUL = "USEFUL",
  CONTACTS = "CONTACTS",
}

export const links = [
  {
    name: "Главная",
    to: ActivePageEnum.MAIN,
    icon: "homeIco",
  },
  {
    name: "О нас",
    to: ActivePageEnum.ABOUT,
    icon: "aboutIco",
  },
  {
    name: "Полезное",
    to: ActivePageEnum.USEFUL,
    icon: "fireIco",
  },
  {
    name: "Контакты",
    to: ActivePageEnum.CONTACTS,
    icon: "commentIco",
  },
];

export const cardsAbout = [
  {
    title: "МОМЕНТАЛЬНО",
    text: "Полученные деньги с продажи можно выводить сразу, без задержек",
    color: "bg-[#F078A4]",
    classNameImg: "w-[173px] absolute bottom-[0px]   md:!bottom-[-10px]",

    img: rectangleImg,

    animation: { rotate: [0, 6, -2, 0], duration: 5.5, delay: 1 },
  },
  {
    title: (
      <>
        ВЫГОДНЫЕ <br /> ПОКУПКИ
      </>
    ),
    text: (
      <>
        {" "}
        Покупатели получают кэшбек благодаря MCC-коду «оплата цифровых товаров»
      </>
    ),
    color: "bg-[#3DD15E]",
    classNameImg:
      "w-[313px] h-[313px] relative bottom-[170px] max-sm:bottom-[140px] max-2xl:bottom-[120px]",

    img: agrementImg,
    animation: { rotate: [0, 2, -2, 0], duration: 4, delay: 0.3 },
  },
  {
    title: "РАБОТАЙ ЧЕРЕЗ ТЕЛЕГРАМ",
    text: (
      <>
        {" "}
        Телеграм бот позволяет управлять Вашим личным кабинетом в мессенджере
      </>
    ),
    color: "bg-[#00B6EC]",
    classNameImg:
      "h-[313px] relative bottom-[210px] max-sm:bottom-[180px] max-2xl:bottom-[140px]",

    img: telegramImg,
    isClick: true,
    animation: { rotate: [0, 2, -2, 0], duration: 4, delay: 0.3 },
  },
  {
    title: "ВЕСЬ МИР",
    text: "Быстрые платежи и вывод с карты любой страны мира (Скоро)",
    color: "bg-[#71AEF6]",
    classNameImg: "w-[287px] ",

    img: worldImg,
    animation: { rotate: [0, 4, -4, 0], duration: 6, delay: 0.5 },
  },
  {
    title: "СВОБОДНАЯ МОНЕТИЗАЦИЯ",
    text: "Продавайте консультации, цифровые товары или принимайте донаты без ограничений.",
    color: "bg-[#F0826C]",
    classNameImg: "w-[371px] h-[371px] relative left-[33px] bottom-[245px]",

    img: bookMoneyImg,
    animation: { rotate: [0, 5, -5, 0], duration: 4.5, delay: 0.8 },
  },
  {
    title: "БЕЗОПАСНО",
    text: "Мы не передаем данные третьим лицам. Ваш доход — только ваше дело.",
    color: "bg-[#7571F6]",
    classNameImg: "w-[277px] h-[181px] relative bottom-[30px]",

    img: housImg,
    animation: { rotate: [0, 3, -3, 0], duration: 5, delay: 0.2 },
  },
];
