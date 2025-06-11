import React, {useState} from 'react';
import clsx from 'classnames';
import {motion} from 'framer-motion';
import {useWindowWidth} from '@/hooks/useWindowWidth.ts';
import {Icon} from "@components/ui/icon/icon.tsx";

type IProps = {};

const items = [
    {
        title: 'Какие цифровые товары или услуги можно продавать через сервис?',
        content: 'Сервис не ограничивает вас в форматах для монетизации и подойдёт для любой задачи. Принимайте донаты от подписчиков, продавайте курсы, гайды, чек-листы, фото, видео, создавайте ссылку для оплаты услуг онлайн или на вступление в закрытые чаты!',
    },
    {
        title: 'Как работают «ссылки»?',
        content: 'Вы создаете ссылку (добавляете описание, стоимость и цифровой товар), ссылка для оплаты генерируется автоматически – скопируйте её и разместите в любом источнике или отправьте покупателю в личные сообщения. Покупатель оплачивает ссылку в 2 клика без регистрации, моментально получает оплаченный контент, а вам в личный кабинет зачисляются средства от продажи.',
    },
    {
        title: 'Работает ли оплата иностранными картами?',
        content: 'Да, оплата работает любыми банковскими картами, вывод средств доступен как на иностранные, так и российские банковские карты. Сервис работает по всему миру!',
    },
    {
        title: 'Сколько времени занимает вывод средств на карту?',
        content: 'Вывод средств на карту моментальный, но зависит от скорости зачисления средств вашим банком. Деньги могут поступить сразу или с небольшой банковской задержкой.',
    },
    {
        title: 'Как работает телеграмм бот?',
        content: 'Покупатель может выбрать куда придет контент: на почту или в телеграм бот. Перейдите в телеграмм после опты и нажмите «Start». В телеграмме купленный контент всегда под рукой и будет видна история покупок, не нужно тратить время на поиск контента.',
    },
    {
        title: 'Действуют ли лимиты по суммам продажи и вывода?',
        content: 'Нет, вы можете установить любую желаемую сумму за свои цифровые товары или услуги и выводить средства моментально за свою карту.',
    },
    {
        title: 'Как быстро проходит модерация ссылки?',
        content: 'Модерация проходит автоматически при создании ссылки, если у вас возникли вопросы по модерации - пишите нам через форму обратной связи или в телеграмм @clickcontent_support , мы поможем пройти модерацию!',
    },
    {
        title: 'Сервис работает с физ.лицами?',
        content: 'Сервис работает с физ.лицами, при этом сервис не является налоговым агентом и не несет ответственность за уплату налогов пользователей и не передает данные в ФНС. ',
    },
    {
        title: 'Возможно ли понизить комиссию?',
        content: 'В сервисе действует единая комиссия 9% за весь функционал. Это минимальное значение для функционирования сервиса, поэтому понизить комиссию невозможно.',
    },
    {
        title: 'Какой код поступления средств на карту?',
        content: 'Средства на карту зачисляются по МСС коду 6536 «Денежные переводы на карту – зачисление (внутри страны)» ',
    },
    {
        title: 'Где находится юридический адрес компании?',
        content: 'Компания находится в Лондоне (Великобритания), работаем по всему миру, используя новейшие технологии.',
    },
];


const UseFul = ({}: IProps) => {
    const {isMobile} = useWindowWidth();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className="w-full flex flex-col text-white p-4 gap-[32px] pb-[116px] max-sm:pt-[40px]">
            {items.map((item, index) => {
                const isActive = activeIndex !== null && activeIndex !== index;

                return (
                    <React.Fragment key={index}>
                        <motion.div
                            layout
                            className={clsx(
                                'p-4 rounded-lg transition-all duration-300',
                                isActive ? 'opacity-60' : 'opacity-100'
                            )}
                            onMouseEnter={!isMobile ? () => setActiveIndex(index) : undefined}
                            onMouseLeave={!isMobile ? () => setActiveIndex(null) : undefined}
                            onClick={isMobile ? () => handleToggle(index) : undefined}
                        >
                            <div className="flex flex-row justify-between gap-[10px] items-center">
                                <h3 className="text-[32px] font-bold font-PPNeueMachina max-sm:text-[18px] flex-1">
                                    {item.title}
                                </h3>
                                {!isMobile ? (
                                    <motion.div
                                        animate={{backgroundColor: isActive ? '#FFF' : 'transparent'}}
                                        transition={{duration: 1}}
                                        className="h-[20px] w-[20px] rounded-[50px] border-2 border-white"
                                    />
                                ) : (
                                    <Icon name={'arrowBack'} className={clsx(
                                        'transform w-[24px] h-[24px] transition-transform duration-300 ',
                                        activeIndex === index ? 'rotate-90' : 'rotate-[-90deg]'
                                    )}/>
                                )}
                            </div>

                            <motion.div
                                initial={{opacity: 0, height: 0}}
                                animate={{
                                    opacity: activeIndex === index ? 1 : 0,
                                    height: activeIndex === index ? 'auto' : 0,
                                }}
                                transition={{duration: 0.5, ease: 'easeInOut'}}
                                className="overflow-hidden"
                            >
                                <p className="mt-2 text-[16px] text-[#F8F8F8]">{item.content}</p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            animate={{opacity: isActive ? 0.3 : 1}}
                            transition={{duration: 1}}
                            className="w-full h-[1px] !bg-white"
                        />
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default UseFul;
