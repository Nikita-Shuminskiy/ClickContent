import {useMutation, useQueryClient} from '@tanstack/react-query';
import {MutationKey} from '@/core/api/api-types/mutation-key.ts';
import {authBySmsVerify} from '@/core/api/endpoints/auth-api.ts';
import {QueryKey} from "@/core/api/api-types/query-key.ts";
import {navToMarket, setIsAuthCookie, setUserCookie} from "@/helpers/NavigateToMarket.ts";
import {useNavigate} from "react-router-dom";
import {getUser} from "@/core/api/endpoints/user-api.ts";

export const useAuthBySmsVerify = ({
                                       onError,
                                       isFromMarket,
                                       setStateConfirmMobileIDModall,
                                       setIsOpenLogin,
                                       isFromPayment
                                   }) => {
    const nav = useNavigate();
    const client = useQueryClient();

    return useMutation({
        mutationKey: [MutationKey.AUTH_BY_SMS_VERIFY],
        mutationFn: authBySmsVerify,
        onSuccess: async () => {
            const user = await getUser();
            client.setQueryData([QueryKey.GET_USER, []], (oldData) => ({
                ...user
            }));

            setUserCookie({user});
            setIsAuthCookie('auth');
            localStorage.setItem('userLoggedIn', 'logIn'); // todo для логина во всех вкладках
            setStateConfirmMobileIDModall(false);
            if (isFromMarket) return navToMarket({user}); // Редирект на маркет
            if (isFromPayment) return setIsOpenLogin(false);

            nav('/dashboard');
        },
        onError
    });
};
