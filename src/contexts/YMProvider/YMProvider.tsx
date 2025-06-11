import {
    createContext,
    FunctionComponent,
    ReactNode,
    useMemo,
    useState,
} from 'react'

export interface IYMTagIDContext {
    tagId: number | null
    yandexCID: string | null
    setYandexCID?: (cid: string) => void
    isDev: boolean
}

export const YMTagIdContext = createContext<IYMTagIDContext>({
    tagId: null,
    yandexCID: null,
    isDev: true,
})

interface IYMProvider {
    children: ReactNode
}

export const YMProvider: FunctionComponent<IYMProvider> = ({ children }) => {
    const [yandexCID, setYandexCID] = useState<string | null>(null)

    const isDev =
        import.meta.env.DEV || window.location.origin === 'https://dev.clickcontent.eu'

    const tagId = 97412201

    const data = useMemo(
        () => ({
            yandexCID,
            tagId,
            setYandexCID,
            isDev,
        }),
        [isDev, tagId, yandexCID],
    )

    if (!data.tagId || isDev) return children

    return (
        <YMTagIdContext.Provider value={data}>
            {children}
        </YMTagIdContext.Provider>
    )
}
