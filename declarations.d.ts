declare global {
    interface Window {
        ym: (id: number, action: string, params: string, options?: { referer: string }) => void;
    }
}

declare module '*.svg' {
    import * as React from 'react'

    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >
    const src: string
    export default src
}

export {}