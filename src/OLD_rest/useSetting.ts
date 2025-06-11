import { IAimsInfo } from "@/OLD_models/responses/IAimsInfo";
import useSWRMutation from "swr/mutation";
import { post } from "./api";

export function useEditDonate() {
  const {
    trigger: editDonate,
    error,
    isMutating,
  } = useSWRMutation<IAimsInfo>("/v2/donates", post);
  return { editDonate, error, isMutating };
}
