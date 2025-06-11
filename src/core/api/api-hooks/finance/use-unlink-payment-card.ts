import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key.ts";
import { unlinkPaymentCard } from "../../endpoints/finance-api";
import { IUserDto } from "@/data-contracts.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";

export const useUnlinkPaymentCard = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: [MutationKey.UNLINK_PAYMENT_CARD],
    mutationFn: unlinkPaymentCard,
    onSuccess: (_, id) => {
      client.setQueriesData<IUserDto>(
        { queryKey: [QueryKey.GET_USER] },
        (oldData) => {
          if (oldData) {
            return {
              ...oldData,
              cards: oldData?.cards.filter((el) => el.id !== id) || [],
            };
          }
        },
      );
      client.removeQueries({ queryKey: [MutationKey.UNLINK_PAYMENT_CARD] });
    },
  });
};
