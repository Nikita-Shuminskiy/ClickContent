import { UseQueryResult } from '@tanstack/react-query'
import { getUser } from '@/core/api/endpoints/user-api.ts'
import { useAppQuery } from "@/core/api/api-hooks/use-app-query.ts"
import { QueryKey } from "@/core/api/api-types/query-key.ts"
import {IUserDto} from "@/data-contracts.ts";

export const useGetUser = (): UseQueryResult<IUserDto> => {
    return useAppQuery(
        QueryKey.GET_USER,
        [],
        getUser,
        {
            refetchOnMount: true,
          /*  gcTime: 30000,
            staleTime: 30000*/
        }
    )
}
