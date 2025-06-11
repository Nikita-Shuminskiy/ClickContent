import React, {useState} from 'react';
import {FormInputUI} from "@components/ui/InputUI";
import {ButtonUI} from "@components/ui/ButtonUI";
import {useForm} from "react-hook-form";
import {contactResolver} from "@/pages/Landing/components/shemes/shemes.ts";
import {useAddFeedback} from "@/core/api/api-hooks/ui/common/use-add-feedback.ts";
import {useAlert} from "@/contexts/AlertProvider/AlertProvider.tsx";
import {BackgroundCircle} from "@/pages/new-payment-page/components/background-circle.tsx";
import imgTelegram from "./telegram.png";
import {motion} from 'framer-motion';
import ModalTelegram from "@/pages/Landing/components/ModalTelegram.tsx";
import TelegramWidget from "@/pages/Landing/components/telegram-widget.tsx";
import {useWindowWidth} from "@/hooks/useWindowWidth.ts";

const Contacts = () => {
    const {mutateAsync: sendFeedback, isPending} = useAddFeedback();
    const {showAlert} = useAlert()
    const {isMobile} = useWindowWidth()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onSubmitForm = async (data) => {
        try {
            await sendFeedback(data);
            resetForm()
            showAlert('Заявка успешно отправлена', 'success')
        } catch (error) {
            console.error("error", error);
        }
    }

    const {
        control,
        handleSubmit,
        formState: {isValid, isSubmitSuccessful},
        reset: resetForm,
        watch,
    } = useForm({
        mode: "onChange",
        resolver: contactResolver,
        defaultValues: {
            type: 'MAIL',
        }
    });

    return (
        <div className="min-h-screen  text-white p-8">
            <div className="max-w-4xl ">
                <p className="text-lg mb-[56px] font-firstNeue text-[16px] text-white/30 max-sm:hidden">
                    У вас возникли вопросы? Свяжитесь с нами - мы поможем
                </p>

                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
                    <div className="space-y-6">
                        <div
                            className="flex items-center row justify-between max-sm:items-start max-sm:flex-col max-sm:gap-[2px] gap-6">
                            <h2 className="font-PPNeueMachina font-extrabold whitespace-normal text-[96px] max-3xl:text-[52px] max-sm:text-[32px]">МЕНЯ
                                ЗОВУТ</h2>
                            <div className="flex flex-col flex-1 w-full">
                                <FormInputUI
                                    control={control}
                                    name="name"
                                    className="w-full bg-transparent pb-2 focus:outline-none focus:border-white"
                                    placeholder="Введите ваше имя"
                                />
                                <div className="bg-[#575859] h-[1px] w-full"/>
                            </div>
                        </div>

                        <div
                            className="flex items-center row justify-between max-sm:items-start max-sm:flex-col max-sm:gap-[2px] gap-6">
                            <h2 className="font-PPNeueMachina font-extrabold whitespace-normal max-3xl:text-[52px] text-[96px] max-sm:text-[32px]">КОНТАКТ</h2>
                            <div className="flex flex-col flex-1 w-full">
                                <FormInputUI
                                    control={control}
                                    name="contact"
                                    className="w-full bg-transparent focus:outline-none focus:border-white"
                                    placeholder="Введите ваш email"
                                />
                                <div className="bg-[#575859] h-[1px] w-full"/>
                            </div>
                        </div>

                        <div
                            className="flex items-center row justify-between max-sm:items-start max-sm:flex-col max-sm:gap-[2px] gap-6">
                            <h2 className="font-PPNeueMachina font-extrabold whitespace-normal text-[96px] max-sm:text-[32px] max-3xl:text-[52px]">СООБЩЕНИЕ</h2>

                            <div className="flex flex-col flex-1 w-full">
                                <FormInputUI
                                    control={control}
                                    name="text"
                                    className="w-full bg-transparent focus:outline-none focus:border-white min-h-[100px]"
                                    placeholder="Комментарий"
                                    multiple
                                />
                                <div className="bg-[#575859] h-[1px] w-full"/>
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-4   max-sm:items-start max-sm:flex-col max-sm:w-[100%]">
                        <h2 className="font-PPNeueMachina font-extrabold  text-[96px] max-sm:text-[32px] max-3xl:text-[52px]">СПАСИБО!</h2>
                        <ButtonUI
                            type="submit"
                            className="bg-white  !w-[146px] max-sm:!w-full !text-black px-8 py-3 !bg-white/90 !bg-red rounded-full hover:!bg-white/90 transition-colors"
                        >
                            Отправить
                        </ButtonUI>
                    </div>
                </form>
            </div>

            <div onMouseEnter={() => setIsModalOpen(true)}
                 className={'fixed right-[20px] top-0 bottom-0 flex items-center justify-center w-[120px] max-md:hidden'}>
                <BackgroundCircle className={'absolute top-[100px] right-[-120px] max-md:hidden !bg-[#00B6EC]'}/>
                <div className={'flex flex-col items-center gap-[20px] z-10'}>
                    <motion.img
                        src={imgTelegram}
                        alt=""
                        className={'w-[66px] h-[66px] object-contain relative top-[-20px] right-[-20px]'}
                        initial={{rotate: 0}}
                        animate={{rotate: 30}}
                        transition={{duration: 1, repeat: Infinity, repeatType: "reverse", delay: 0}}
                    />
                    <motion.img
                        src={imgTelegram}
                        alt=""
                        className={'w-[102px] h-[104px] object-contain'}
                        initial={{rotate: 0}}
                        animate={{rotate: -30}}
                        transition={{duration: 2, repeat: Infinity, repeatType: "reverse", delay: 2}}
                    />
                    <motion.img
                        src={imgTelegram}
                        alt=""
                        className={'w-[66px] h-[66px] object-contain relative top-[20px] right-[-30px]'}
                        initial={{rotate: 0}}
                        animate={{rotate: 40}}
                        transition={{duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1}}
                    />
                </div>
            </div>
            {isMobile && <TelegramWidget/>}
            {isModalOpen && <ModalTelegram onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}/>}

            <div className={'absolute bottom-[50px] right-[80px]'}>
                <span className={'text-[16px] font-montserrat text-white/50'}>United Kingdom support@clickcontent.eu</span>
            </div>
        </div>
    );
};

export default Contacts;
