import React from 'react'
import SEOHelmet from '@components/SeoHelmet/SeoHelmet.tsx'
import { seoVariables } from '@/constants/seo-variables.ts'

const About = () => {
    return (
        <section className="pt-28 pb-8">
            <SEOHelmet
                title={seoVariables.ABOUT.title}
                description={seoVariables.MAIN.description}
                keywords={seoVariables.ABOUT.keywords}
                ogTitle={seoVariables.MAIN.ogTitle}
                ogDescription={seoVariables.MAIN.ogDescription}
                ogUrl={seoVariables.ABOUT.ogUrl}
            />
            <div className="container max-md:text-xs">
                <div  className="flex flex-col gap-[5px]">
                    <h1 className={'text-2xl text-center font-bold mb-10 max-sm:text-2xl max-sm:mb-6'}></h1>
                </div>
                <p style={{marginBottom: "0.28cm"}}>
                    <span className="font-bold text-xl max-sm:text-base">Информация о деятельности: </span>
                    <br/>
                    разработка компьютерного программного обеспечения
                </p>
                <p className="flex flex-col gap-1" style={{marginBottom: "0.28cm"}}>
                    <span className="font-bold text-xl max-sm:text-base">Контакты:</span>


                    <a className="hover:underline" href="mailto:support@clickcontent.eu">support@clickcontent.eu</a>
                </p>
                <p style={{marginBottom: '0.28cm'}}>
                    <span className="font-bold text-xl max-sm:text-base">Технологический стек: </span>
                    <br/>
                    .NET, React, Postgresql, другое
                </p>
                <p style={{marginBottom: '0.28cm'}}>
                    <span className="font-bold text-xl max-sm:text-base">Реализованные проекты:</span>
                    <br/>
                    <a className="hover:underline" href="https://clickcontent.eu/"> https://clickcontent.eu/</a>
                </p>
            </div>
        </section>
    )
}

export default About
