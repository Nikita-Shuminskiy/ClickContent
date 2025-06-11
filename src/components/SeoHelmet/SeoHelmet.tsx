import { FC } from 'react'
import { Helmet } from 'react-helmet'

interface HelmetProps {
    title: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    noIndex?: boolean;
}

const SEOHelmet: FC<HelmetProps> = ({
                                        title,
                                        description,
                                        keywords,
                                        ogTitle,
                                        ogDescription,
                                        ogImage,
                                        ogUrl,
                                        noIndex
                                    }) => {
    return (
        <Helmet>
            <title>{title}</title>
            {/** Запрещаем индексацию, пока страница в разработке*/}
            {noIndex && <meta name="robots" content="noindex, nofollow"/>}
            {description && <meta name="description" content={description}/>}
            {keywords && <meta name="keywords" content={keywords}/>}
            {ogTitle && <meta property="og:title" content={ogTitle}/>}
            {ogDescription && <meta property="og:description" content={ogDescription}/>}
            {ogImage && <meta property="og:image" content={ogImage}/>}
            {ogUrl && <meta property="og:url" content={ogUrl}/>}
        </Helmet>
    )
}

export default SEOHelmet