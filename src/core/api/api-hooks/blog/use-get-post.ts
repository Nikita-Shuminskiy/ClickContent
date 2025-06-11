import {useAppQuery} from "@/core/api/api-hooks/use-app-query.ts";
import {QueryKey} from "@/core/api/api-types/query-key.ts";
import {getPost} from "@/core/api/endpoints/blog-api.ts";


export const useGetPost = (id: string) => {
    return useAppQuery(QueryKey.GET_POST,
        [id],
        () => getPost(id), {enabled: !!id}
    )
}
