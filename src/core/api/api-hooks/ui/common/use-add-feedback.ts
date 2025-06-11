import {useMutation} from "@tanstack/react-query"
import {MutationKey} from '@/core/api/api-types/mutation-key.ts'
import {addFeedback} from "@/core/api/endpoints/common-api"


export const useAddFeedback = () => {

    return useMutation({
        mutationKey: [MutationKey.ADD_FEEDBACK],
        mutationFn: addFeedback,
    })
}
