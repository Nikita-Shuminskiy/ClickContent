import { useMutation } from '@tanstack/react-query'
import { MutationKey } from '@/core/api/api-types/mutation-key.ts'
import {uploadFile} from "@/core/api/endpoints/common-api.ts";


//файл должен быть предварительно загружен на S3
export const useUploadFile = () => {
    return useMutation({
        mutationKey: [MutationKey.UPLOAD_FILE],
        mutationFn: uploadFile,
        onSuccess: () => {
            // do something
        },
    })
}
