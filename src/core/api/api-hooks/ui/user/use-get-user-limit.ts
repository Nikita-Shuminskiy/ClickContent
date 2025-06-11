import { UseQueryResult } from "@tanstack/react-query";
import { getUserLimit } from "@/core/api/endpoints/user-api.ts";
import { useAppQuery } from "@/core/api/api-hooks/use-app-query.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";
import { IUserLimitDto } from "@/data-contracts.ts";

export const useGetUserLimit = (): UseQueryResult<IUserLimitDto> => {
  return useAppQuery(QueryKey.GET_USER_LIMIT, [], getUserLimit);
};
