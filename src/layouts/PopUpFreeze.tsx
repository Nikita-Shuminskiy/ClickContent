import { useUserInfoContext } from "@/contexts/UserProvider"
import { useNavigate } from "react-router-dom"
import { useModal } from '@/contexts/ModalProvider/useModal.ts'
import { ModalKey } from '@/core/types/modal-key.ts'

export const PopUpFreeze = () => {

    const navigate = useNavigate()
    const { openModal: openCardModal } = useModal(ModalKey.ADD_CARD)
    const { isNotPassport, isNotCards, isNotCardsAndPassport } =
        useUserInfoContext()

    const handleUnFreeze = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (isNotPassport) {
            navigate("/passport?warningModal=false")
            return
        }

        if (isNotCards) {
            openCardModal("addCard")
            return
        }
    }

    return (
        <div
            className={
                "absolute right-0 bottom-10 z-10 mt-2 origin-top-right rounded-[16px] overflow-hidden bg-[#202020] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            }
        >
            <div
                className={
                    "p-3 text-left w-[250px] max-sm:max-w-[150px] lg:w-[290px] max-sm:p-2"
                }
            >
                <p
                    className={
                        "text-xs flex flex-col gap-[2px] text-white font-manrope font-normal"
                    }
                >
                    Ссылка заморожена. <br/>
                    {isNotPassport && <span> Необходимо пройти верификацию</span>}
                    {isNotCards && <span> Необходимо добавить банковскую карту</span>}
                </p>
                <div className={"mt-1"}>
                    <button
                        autoFocus={true}
                        onClick={handleUnFreeze}
                        className={
                            "font-bold text-sm max-sm:text-xs text-purple-500 font-manrope outline-none"
                        }
                    >
                        {isNotPassport || isNotCardsAndPassport
                            ? "Пройти верификацию"
                            : "Добавить"}
                    </button>
                </div>
            </div>
        </div>
    )
}
