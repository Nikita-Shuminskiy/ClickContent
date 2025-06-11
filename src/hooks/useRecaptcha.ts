import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useFormContext } from 'react-hook-form'

export const useRecaptcha = (onSubmit?: (data: any) => void) => {
    const [captchaToken, setCaptchaToken] = useState<string>('')
    const recaptchaRef = useRef<ReCAPTCHA | null>(null)
    const [showRecaptcha, setShowRecaptcha] = useState(false)
    const methods = useFormContext()


    const handleRecaptcha = (token: string | null) => {

        setCaptchaToken(token || '')
        if (token) {
            setShowRecaptcha(false)
        }
    }

    useEffect(() => {
        if (captchaToken) {
            onSubmit && methods.handleSubmit(onSubmit)()
        }
    }, [captchaToken])

    useEffect(() => {
        const refreshCaptcha = () => {
            if (recaptchaRef.current && captchaToken) {
                recaptchaRef.current.reset()
                setCaptchaToken('')
            }
        }

        let tokenRefreshTimeout: NodeJS.Timeout | null = null

        if (captchaToken) {
            tokenRefreshTimeout = setTimeout(refreshCaptcha, 110000) // 110 seconds
        }

        return () => {
            if (tokenRefreshTimeout) {
                clearTimeout(tokenRefreshTimeout)
            }
        }
    }, [captchaToken])

    return { captchaToken, setCaptchaToken, recaptchaRef, handleRecaptcha, setShowRecaptcha, showRecaptcha }
}

