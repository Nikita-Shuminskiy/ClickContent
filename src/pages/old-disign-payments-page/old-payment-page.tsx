import { CSSProperties, lazy, Suspense, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"
import { useGetQuickLink } from '@/core/api/api-hooks/ui/quick-link/use-get-quick-link'
import AlertModal from "@/components/AlertModal"
import bgLand from "@/assets/images/all-img/bg-land_test.webp"
import { AxiosError } from "axios";
import {BackgroundCircle} from "@/pages/payment-page/components/background-circle.tsx";

const PublicationPage = lazy(() => import("./publication-page/publication-page"))
// const DonatePage = lazy(() => import("./DonatePage"))

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
}

const OldPaymentPage = ( { type }: { type: string } ) => {

    const { quickLinkId, aimId } = useParams()

    const [ isOpenAlertModal, setOpenAlertModal ] = useState(false)
    const navigate = useNavigate()
    const { data: quickLink, isLoading: quickLinkLoading, error } = useGetQuickLink(quickLinkId)

    useEffect(() => {
        error && (error as AxiosError).response.status === 400 && navigate('/not-found')
    }, [ error ]);

    return (
        <section className="pt-[20px] pb-[20px] max-sm:pt-[40px] max-sm:pb-[40px] h-screen ">
            <div className="container">
                <h2 className="sr-only">Страница покупки контента</h2>
                <div className="fixed -z-[1] left-0 right-0 top-0 bottom-0 w-full h-full min-h-screen bg-[#0E0E0E]">
                  {/*  <img
                        className="w-full h-full object-cover max-xs:hidden"
                        src={ bgLand }
                        aria-hidden="true"
                        alt="Фон"
                    />*/}
                </div>
                <BackgroundCircle
                    className='top-[-255px] left-[845px] max-lg:top-[-255px] max-lg:left-[578px] mobile:top-[-223px] mobile:left-[160px]'/>
                <BackgroundCircle className='top-[631px] left-[-102px] mobile:top-[581px] mobile:left-[-102px]'/>
                <AlertModal
                    title="Внимание!"
                    text="Вы не можете отправить кликсы, пока адресат не верифицирует паспортные данные"
                    okButtonText="Ок"
                    onOkButtonClick={ () => navigate('/dashboard') }
                    hasCanselBtn={ false }
                    isOpen={ isOpenAlertModal }
                    setOpen={ setOpenAlertModal }
                />


                { quickLink && type !== "donate" && (
                    <Suspense
                        fallback={
                            <ClipLoader cssOverride={ override }
                                        size={ 150 }
                                        color={ "#123abc" }
                                        loading={ true }
                                        speedMultiplier={ 1.5 }
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                            />
                        }
                    >
                        <PublicationPage data={ quickLink } id={ quickLinkId }/>
                    </Suspense>
                ) }

                { quickLinkLoading && !quickLink && (
                    <div className="w-full flex items-center justify-center">
                        <ClipLoader
                            cssOverride={ override }
                            size={ 150 }
                            color={ "#123abc" }
                            loading={ true }
                            speedMultiplier={ 1.5 }
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) }
            </div>
        </section>
    )
}


export default OldPaymentPage
