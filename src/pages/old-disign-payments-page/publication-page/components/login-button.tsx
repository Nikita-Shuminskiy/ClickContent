import { ButtonUI } from '@/components/ui/ButtonUI'
import { PublicationPageButtonProps } from '../types/types'

export const LoginButton = ({ handleLogin }: PublicationPageButtonProps) => {
    return (
        <div className="flex flex-wrap items-center gap-1 max-xs:justify-center">
            <ButtonUI className="text-[18px] font-bold" onClick={handleLogin}>
                Вход
            </ButtonUI>
        </div>
    )
}
