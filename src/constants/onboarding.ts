import music from '@assets/images/all-img/onboarding/music.png'
import camera from '@assets/images/all-img/onboarding/camera.png'
import tea from '@assets/images/all-img/onboarding/tea-cup.png'
import crow from '@assets/images/all-img/onboarding/crow.png'
import notebook from '@assets/images/all-img/onboarding/notebook.png'
/*import megaphone from '@assets/images/all-img/onboarding/megaphone.png'
import wallet from '@assets/images/all-img/onboarding/wallet.png'
import picture from '@assets/images/all-img/onboarding/picture.png'
import target from '@assets/images/all-img/onboarding/target.png'*/
import photographerImg from '@assets/images/all-img/onboarding/detailInfo/photographer/photo.png'
import photographerImg1 from '@assets/images/all-img/onboarding/detailInfo/photographer/photo.png'
import musicianImg from '@assets/images/all-img/onboarding/detailInfo/music/photo_1.png'
import musicianImg1 from '@assets/images/all-img/onboarding/detailInfo/music/photo_1.png'
import chefImg from '@assets/images/all-img/onboarding/detailInfo/chef/photo_1.png'
import chefImg1 from '@assets/images/all-img/onboarding/detailInfo/chef/photo_1.png'
import modelImg from '@assets/images/all-img/onboarding/detailInfo/model/photo_1.png'
import modelImg1 from '@assets/images/all-img/onboarding/detailInfo/model/photo_1.png'
import teacherImg from '@assets/images/all-img/onboarding/detailInfo/teacher/photo_1.png'
import teacherImg1 from '@assets/images/all-img/onboarding/detailInfo/teacher/photo_1.png'
import photographerImg2 from '@assets/images/all-img/onboarding/detailInfo/photographer/photo_1.png';
import photographerImg3 from '@assets/images/all-img/onboarding/detailInfo/photographer/photo_2.png';
import photographerImg4 from '@assets/images/all-img/onboarding/detailInfo/photographer/photo_3.png';
import musicianImg2 from '@assets/images/all-img/onboarding/detailInfo/music/photo_2.png';
import musicianImg3 from '@assets/images/all-img/onboarding/detailInfo/music/photo_3.png';
import musicianImg4 from '@assets/images/all-img/onboarding/detailInfo/music/photo_4.png';
import chefImg2 from '@assets/images/all-img/onboarding/detailInfo/chef/photo_2.png';
import chefImg3 from '@assets/images/all-img/onboarding/detailInfo/chef/photo_3.png';
import chefImg4 from '@assets/images/all-img/onboarding/detailInfo/chef/photo_4.png';
import modelImg2 from '@assets/images/all-img/onboarding/detailInfo/model/photo_2.png';
import modelImg3 from '@assets/images/all-img/onboarding/detailInfo/model/photo_3.png';
import modelImg4 from '@assets/images/all-img/onboarding/detailInfo/model/photo_4.png';
import teacherImg2 from '@assets/images/all-img/onboarding/detailInfo/teacher/photo_2.png';
import teacherImg3 from '@assets/images/all-img/onboarding/detailInfo/teacher/photo_3.png';
import teacherImg4 from '@assets/images/all-img/onboarding/detailInfo/teacher/photo_4.png'

export enum OnboardingKey {
    teacher = 'teacher',
    model = 'model',
    chef = 'chef',
    musician = 'musician',
    photographer = 'photographer',
}

export const onboardingData: OnboardingDataType[] = [
    {
        name: 'Для фотографов и блогеров',
        image: camera,
        background: 'linear-gradient(174.68deg, #ED81FF -7.22%, #A331CB 96.67%)',
        key: OnboardingKey.photographer
    },
    {
        name: 'Для музыкантов',
        image: music,
        background: 'linear-gradient(235.59deg, #F5CD64 -16.68%, #EB8B4C 56.42%)',
        key: OnboardingKey.musician
    },
    {
        name: 'Для кулинарных блогеров',
        image: tea,
        background: 'linear-gradient(18.51deg, #53AE0C -1.39%, #3DB7FC 101.04%)',
        key: OnboardingKey.chef
    },
    {
        name: 'Для моделей',
        image: crow,
        background: 'linear-gradient(38deg, #EC7938 2.45%, #873BD3 77.68%)',
        key: OnboardingKey.model
    },
    {
        name: 'Для педагогов и репетиторов',
        image: notebook,
        background: 'linear-gradient(42.38deg, #4C66EE 18.46%, #6288E9 76.05%)',
        key: OnboardingKey.teacher
    },
    /*
        {
            name: 'Маркировка рекламы',
            image: megaphone,
            background: 'linear-gradient(42.38deg, #E63EE9 18.46%, #C662E9 76.05%)',
        },
        {
            name: 'Перепродажа контента',
            image: wallet,
            background: 'linear-gradient(42.38deg, #6296FA 18.46%, #78E7FF 76.05%)',
        },
        {
            name: 'Продавай свой контент',
            image: picture,
            background: 'linear-gradient(42.38deg, #90CB14 18.46%, #58C33D 76.05%)',
        },
        {
            name: 'Создавай цели и копи',
            image: target,
            background: 'linear-gradient(42.38deg, #E99D2C 18.46%, #EC6042 76.05%)',
        },*/
]

export type OnboardingDataType = {
    name: string,
    image: string,
    background: string,
    key?: OnboardingKey,
}

export const OnboardingModalInfo = {
    [OnboardingKey.photographer]: {
        to: '/quicklinks',
        '1': {
            img: photographerImg,
            mobileImgPatch: photographerImg1,
            imgText: 'Фотограф, увеличь свой доход с ClickContent!',
            title: 'Ты - начинающий фотограф и хочешь зарабатывать на своем контенте?',
            body: 'С ClickContent процесс займет всего пару минут!'
        },
        '2': {
            img: photographerImg,
            mobileImgPatch: photographerImg2,
            imgText: 'Фотограф, увеличь свой доход с ClickContent!',
            title: 'Как монетизировать фотографу?',
            body: [
                'Продавай свои фото, доступы к закрытым альбомам, бэки',
                'Проводи консультации и продавай видеоуроки по фотографии',
                'Создавай ссылку для благодарности за свое творчество',
                'Продавай платные пресеты',
                'Создавай ссылку на оплату фотосессий'
            ]
        },
        '3': {
            img: photographerImg,
            mobileImgPatch: photographerImg3,
            imgText: 'Фотограф, увеличь свой доход с ClickContent!',
            title: 'ClickContent это:',
            body: [
                'Быстро',
                'Легально',
                'С минимальной комиссией 9%',
                'Моментальный вывод средств на карту!'
            ]
        },
        '4': {
            mobileImgPatch: photographerImg4,
            img: photographerImg,
            imgText: 'Фотограф, увеличь свой доход с ClickContent!',
            title: 'Монетизируйте свое творчество с ClickContent'
        },
    },
    [OnboardingKey.musician]: {
        to: '/quicklinks',
        '1': {
            img: musicianImg,
            mobileImgPatch: musicianImg1,
            imgText: 'Хочешь зарабатывать на музыкальном таланте?',
            title: 'Ты - начинающий музыкант и хочешь зарабатывать на своем таланте?',
            body: 'С ClickContent процесс займет всего пару минут!'
        },
        '2': {
            img: musicianImg,
            mobileImgPatch: musicianImg2,
            imgText: 'Хочешь зарабатывать на музыкальном таланте?',
            title: 'Как монетизировать музыканту?',
            body: [
                'Продавай свои треки, альбомы или доступы к эксклюзивным записям',
                'Проводи онлайн-уроки и мастер-классы',
                'Создавай ссылки для благодарности за поддержку твоего творчества',
                'Продавай платные сэмплы и звуковые библиотеки',
                'Создавай ссылки на оплату живых выступлений и онлайн-концертов'
            ]
        },
        '3': {
            img: musicianImg,
            mobileImgPatch: musicianImg3,
            imgText: 'Хочешь зарабатывать на музыкальном таланте?',
            title: 'ClickContent это:',
            body: [
                'Быстро',
                'Легально',
                'С минимальной комиссией 9%',
                'Моментальный вывод средств на карту!'
            ]
        },
        '4': {
            img: musicianImg,
            mobileImgPatch: musicianImg4,
            imgText: 'Хочешь зарабатывать на музыкальном таланте?',
            title: 'Монетизируйте свое творчество с ClickContent'
        },
    },
    [OnboardingKey.chef]: {
        to: '/quicklinks',
        '1': {
            img: chefImg,
            mobileImgPatch: chefImg1,
            imgText: 'Любишь готовить и делиться рецептами?',
            title: 'Ты - начинающий блогер-кулинар и мечтаешь зарабатывать на своем таланте?',
            body: 'С ClickContent процесс займет всего пару минут!'
        },
        '2': {
            img: chefImg,
            mobileImgPatch: chefImg2,
            imgText: 'Любишь готовить и делиться рецептами?',
            title: 'Как монетизировать кулинарный блог?',
            body: [
                'Продавай свои эксклюзивные рецепты и кулинарные видеоуроки',
                'Проводи онлайн-мастер-классы по готовке и кулинарии',
                'Создавай ссылки для благодарности за твои рецепты',
                'Продавай платные подборки рецептов и меню',
                'Создавай ссылки на оплату кулинарных мастер-классов и гастрономических вечеров'
            ]
        },
        '3': {
            img: chefImg,
            mobileImgPatch: chefImg3,
            imgText: 'Любишь готовить и делиться рецептами?',
            title: 'ClickContent это:',
            body: [
                'Быстро',
                'Легально',
                'С минимальной комиссией 9%',
                'Моментальный вывод средств на карту!'
            ]
        },
        '4': {
            img: chefImg,
            mobileImgPatch: chefImg4,
            imgText: 'Любишь готовить и делиться рецептами?',
            title: 'Монетизируйте свое творчество с ClickContent'
        },
    },
    [OnboardingKey.model]: {
        to: '/quicklinks',
        '1': {
            img: modelImg,
            mobileImgPatch: modelImg1,
            imgText: 'Не знаешь как можно заработать больше, если ты модель?',
            title: 'Ты - начинающая модель и мечтаешь зарабатывать на своем таланте?',
            body: 'С ClickContent процесс займет всего пару минут!'
        },
        '2': {
            img: modelImg,
            mobileImgPatch: modelImg2,
            imgText: 'Не знаешь как можно заработать больше, если ты модель?',
            title: 'Как начать монетизировать твой талант?',
            body: [
                'Продавай доступ к эксклюзивным фотосессиям и видеообзорам',
                'Проводи онлайн-уроки по фотопозированию и моделингу',
                'Создавай ссылки для получения пожертвований от твоих фанатов',
                'Продавай платные фотоальбомы',
                'Создавай ссылки на оплату участия в модельных проектах и фотосессиях'
            ]
        },
        '3': {
            img: modelImg,
            mobileImgPatch: modelImg3,
            imgText: 'Не знаешь как можно заработать больше, если ты модель?',
            title: 'ClickContent это:',
            body: [
                'Быстро',
                'Легально',
                'С минимальной комиссией 9%',
                'Моментальный вывод средств на карту!'
            ]
        },
        '4': {
            img: modelImg,
            mobileImgPatch: modelImg4,
            imgText: 'Не знаешь как можно заработать больше, если ты модель?',
            title: 'Монетизируйте свое творчество с ClickContent'
        },
    },
    [OnboardingKey.teacher]: {
        to: '/quicklinks',
        '1': {
            img: teacherImg,
            mobileImgPatch: teacherImg1,
            imgText: 'Обучаешь новым знаниям, но не можешь заработать больше обычного?',
            title: 'Ты - репетитор или педагог и хочешь зарабатывать на своих знаниях?',
            body: 'С ClickContent процесс займет всего пару минут!'
        },
        '2': {
            img: teacherImg,
            mobileImgPatch: teacherImg2,
            imgText: 'Обучаешь новым знаниям, но не можешь заработать больше обычного?',
            title: 'Как начать монетизировать твой талант?',
            body: [
                'Продавай доступ к онлайн- и видеоурокам',
                'Проводи онлайн-курсы и мастер-классы',
                'Продавай платные учебные материалы: гайды, чек-листы, тесты, лекции',
                'Создавай ссылки на оплату индивидуальных уроков и консультаций'
            ]
        },
        '3': {
            img: teacherImg,
            mobileImgPatch: teacherImg3,
            imgText: 'Обучаешь новым знаниям, но не можешь заработать больше обычного?',
            title: 'ClickContent это:',
            body: [
                'Быстро',
                'Легально',
                'С минимальной комиссией 9%',
                'Моментальный вывод средств на карту!'
            ]
        },
        '4': {
            img: teacherImg,
            mobileImgPatch: teacherImg4,
            imgText: 'Обучаешь новым знаниям, но не можешь заработать больше обычного?',
            title: 'Монетизируйте свое творчество с ClickContent'
        }
    }
};
