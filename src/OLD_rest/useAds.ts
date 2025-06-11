import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { get, post } from "./api";

export interface IAdsPerson {
  id?: string;

  name: string;
  type: string;

  inn: number;
  roles: string[];

  authorizationToken?: string;
}

export interface IAdsContract {
  id?: string;
  type: string;
  actionType: string;
  subjectType: string;
  flags: string[];

  amount: number;
  serial: string;
  contractorId: string;
}

export function useGetPersons() {
  const { data, error, isLoading, mutate } = useSWR(`/v2/ads/persons`, get);

  return { persons: data, error, isLoading, mutate };
}

export function useGetAdsToken() {
  const { data, error, isLoading, mutate } = useSWR(`/v2/ads/token`, get, {
    shouldRetryOnError: false,
  });

  return { adsToken: data, error, isLoading, mutate };
}

export function useGetCreatives() {
  const { data, error, isLoading, mutate } = useSWR(`/v2/ads/creatives`, get);

  return { creatives: data, error, isLoading, mutate };
}

export function useGetCreativeLink(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/v2/ads/creatives/link/${id}` : null,
    get,
  );

  return { creativeLinks: data, error, isLoading, mutate };
}

export function useGetContracts() {
  const { data, error, isLoading, mutate } = useSWR(`/v2/ads/contracts`, get);

  return { contracts: data, error, isLoading, mutate };
}

export function useGetOkveds(search: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/v2/ads/okved?search=${search}`,
    get,
  );

  return { okveds: data, error, isLoading, mutate };
}

export function useCreateToken(token) {
  const {
    trigger: createTokenAds,
    error,
    isMutating,
  } = useSWRMutation(`/v2/ads/token?token=${token}`, post);

  return { createTokenAds, error, isMutating };
}

export function useCreatePerson() {
  const {
    trigger: createPerson,
    error,
    isMutating,
  } = useSWRMutation<IAdsPerson>("/v2/ads/persons/create", post);
  // } = useSWRMutation<IAdsPerson>("/v2/ads/persons/create", post);
  return { createPerson, error, isMutating };
}

export function useCreateContract() {
  const {
    trigger: createContract,
    error,
    isMutating,
  } = useSWRMutation<IAdsContract>("/v2/ads/contracts/create", post);

  return { createContract, error, isMutating };
}

export function useCreateCreative() {
  const {
    trigger: createCreative,
    error,
    isMutating,
  } = useSWRMutation<IAdsContract>("/v2/ads/creatives/create", post);

  return { createCreative, error, isMutating };
}
