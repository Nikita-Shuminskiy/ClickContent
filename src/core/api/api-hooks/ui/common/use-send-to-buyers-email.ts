import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key.ts";
import { sendToBuyersEmail } from "@/core/api/endpoints/common-api";
import { useAlert } from "@/contexts/AlertProvider/AlertProvider.tsx";

export const useSendToBuyersEmail = () => {
  const { showAlert } = useAlert();
  const client = useQueryClient();

  return useMutation({
    mutationKey: [MutationKey.SEND_TO_BUYERS_EMAIL],
    mutationFn: sendToBuyersEmail,
    onSuccess: () => {
      client.removeQueries({ queryKey: [MutationKey.SEND_TO_BUYERS_EMAIL] });
      showAlert("Отправлено на почту", "success");
    },
    onError: (error: any) => {
      showAlert(`${error?.info?.error}`, "error");
    },
  });
};
