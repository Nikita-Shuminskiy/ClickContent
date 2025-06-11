import { useContext, useEffect } from 'react'
import { YMTagIdContext } from './YMProvider'


export const useYMScript = () => {
    const { tagId, isDev } = useContext(YMTagIdContext)
    console.log('isDev', isDev)
    const defaultParams = {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
    }

    useEffect(() => {
        if (!isDev) {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.id = 'ym-script'
            script.innerHTML = `
             (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
             m[i].l=1*new Date();
             for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
             k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,k.id="ym-boot-script",a.parentNode.insertBefore(k,a)})
             (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
             ym(${tagId}, "init", ${JSON.stringify({ ...defaultParams })})
                `
            document.head.appendChild(script)

            return () => {
                document.head.removeChild(script)
            }
        }
    }, [defaultParams, isDev, tagId])
}
