import { useMutation } from "@tanstack/react-query";
import { MutationKey } from "@/core/api/api-types/mutation-key.ts";
import {
  sendChunkCompleteUpload,
  sendChunkUpload,
} from "@/core/api/api-hooks/ui/upload/api.ts";

export const useChunkUploadComplete = () => {
  return useMutation({
    mutationKey: [MutationKey.UPLOAD_COMPLETE],
    mutationFn: sendChunkCompleteUpload,
    onSuccess: () => {},
  });
};
