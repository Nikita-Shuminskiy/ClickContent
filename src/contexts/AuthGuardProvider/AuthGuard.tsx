import {FunctionComponent, PropsWithChildren} from "react";
import StorageService from "@/core/service/storage-service.ts";
import {useAuth} from "@/core/api/api-hooks/auth/use-auth.ts";

interface IProps extends PropsWithChildren {
    authRequired?: boolean
}

export const AuthGuard: FunctionComponent<IProps> = ({authRequired, children}) => {
    const isAuth = useAuth()
    if (!isAuth && authRequired) return null

    return children
}
