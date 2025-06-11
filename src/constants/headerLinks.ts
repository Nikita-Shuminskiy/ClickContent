export type HeaderLinksType = {
    to: string,
    text: string,
    img: string,
    authRequired?: boolean,
    additionalLinks?: string[]
}
export const authorizedHeaderLinks: HeaderLinksType[] = [
    {
        to: "/dashboard",
        text: "Дашборд",
        img: 'homeIcon',
    },
    {
        to: "/quicklinks",
        text: "Ссылки",
        img: 'copyIcon',
    },
    /*  { //todo пока на стопе
        to: "/targetlinks",
        text: "Цели",
        img: watchIcon,
      },*/
    /* {//todo пока на стопе
       to: "/settings",
       text: "Кликсы",
       img: coinsIcon,
     },*/
    {
        to: "/payouts",
        text: "Платежи",
        img: 'purseIcon',
    },
    {
        to: "/feedback",
        text: "Поддержка",
        img: 'questIcon',
    },
];

export const landingHeaderLinks: HeaderLinksType[] = [
    {
        to: "/dashboard",
        text: "Дашборд",
        img: 'homeIcon',
        authRequired: true,
    },
    /* {
       to: "/#about",
       text: "О сервисе",
       img: copyIcon,
     },
     {
       to: "/#possibilities",
       text: "Возможности",
       img: watchIcon,
     },
     {
       to: "/#security",
       text: "Безопасность",
       img: coinsIcon,
     },
     {
       to: '/#how-it-works',
       text: 'Как это работает?',
       additionalLinks: ['/tips'],
       img: purseIcon,
     },
     {
       to: '/#blog',
       text: 'Статьи',
       img: questIcon,
     }*/
];
