import type {
    QueryFunction,
    UseQueryResult,
    UseQueryOptions
} from "@tanstack/react-query"

import {
    useQuery
} from "@tanstack/react-query"

import type { QueryKey } from "../api-types/query-key"

const useAppQuery = <TQueryFnData = unknown,
    TData = TQueryFnData,
    TError = unknown>(
    queryKey: QueryKey,
    queryParameters: unknown[],
    queryFunction: QueryFunction<TQueryFnData>,
    options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>,
        'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> =>
    useQuery<TQueryFnData, TError, TData>({
            queryKey: [queryKey, [...queryParameters]],
            queryFn: queryFunction,
            ...options,
        },
    )

export { useAppQuery }

