import {OnboardingKey} from "@/constants/onboarding.ts";

export type FooterPanelProps = {
    currStep: number
    stepsLength: number
    stepData: any
    className?: string
    isMobile?: boolean
    setStep: (step: number) => void
    onOpenQuickLinksModal: () => void
    onClose: () => void
}
export type StepViewProps = {
    currStep: number
    stepsLength: number
}

export type OnboardDetailInfoModalProps = {
    isOpen: boolean
    onClose: () => void
    onOpenQuickLinksModal: () => void
    from: OnboardingKey
}
