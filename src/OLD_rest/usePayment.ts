import useSWRMutation from "swr/mutation";
import {post} from "./api";

export function usePaymentDonate() {
    const {
        trigger: payDonate,
        error,
        isMutating,
    } = useSWRMutation("/payment/purchase/ArbitraryDonate", post);
    return {payDonate, error, isMutating};
}
