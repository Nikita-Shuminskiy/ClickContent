import bgLand from '@assets/images/all-img/bg-land.jpg'
import { SkeletonUI } from '@components/ui/SkeletonUI'

export const ReceiptSkeleton = () => {
    return (
        <section className="pt-[80px] pb-[80px] max-sm:pt-[40px] max-sm:pb-[40px]">
            <div className="container">
                <h2 className="sr-only">Покупка</h2>
                <div className="fixed -z-[1] left-0 right-0 top-0 bottom-0 w-full h-full">
                    <img
                        className="w-full h-full object-cover"
                        src={bgLand}
                        aria-hidden="true"
                        alt="Фон"
                    />
                </div>
                <div className="max-w-[800px] w-full mx-auto mb-9">
                    <div className="w-14 h-14 rounded-full mb-8 mx-auto overflow-hidden">
                        <SkeletonUI/>
                    </div>
                    <div className="block h-5 rounded-lg overflow-hidden mb-4">
                        <SkeletonUI/>
                    </div>
                    <div className="block h-5 rounded-lg overflow-hidden">
                        <SkeletonUI/>
                    </div>
                </div>
                <div className="max-w-[800px] mx-auto w-full h-[500px] rounded-[35px] overflow-hidden">
                    <SkeletonUI/>
                </div>
            </div>
        </section>
    )
}
