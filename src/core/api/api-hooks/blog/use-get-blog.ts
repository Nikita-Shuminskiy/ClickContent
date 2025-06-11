import { useAppQuery } from "@/core/api/api-hooks/use-app-query.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";
import { getBlog } from "@/core/api/endpoints/blog-api.ts";

export const useGetBlog = (search?: string) => {
  return useAppQuery(QueryKey.GET_BLOG, [search], () => getBlog(search), {});
};
