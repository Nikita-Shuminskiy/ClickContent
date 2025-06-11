import { useAppQuery } from "@/core/api/api-hooks/use-app-query.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";
import { getOwnerQuickLinks } from "@/core/api/endpoints/quick-link-api.ts";

export const useGetOwnerQuickLinks = () =>
  useAppQuery(QueryKey.GET_OWNER_QUICK_LINKS, [], getOwnerQuickLinks);
