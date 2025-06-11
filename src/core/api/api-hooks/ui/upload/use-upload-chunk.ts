import {useMutation} from "@tanstack/react-query";
import {MutationKey} from "@/core/api/api-types/mutation-key.ts";
import {sendChunkUpload} from "@/core/api/api-hooks/ui/upload/api.ts";

export const useChunkUpload = () => {
    return useMutation({
        mutationKey: [MutationKey.UPLOAD_CHUNK],
        mutationFn: sendChunkUpload,
        onSuccess: () => {
        }
    })
}
