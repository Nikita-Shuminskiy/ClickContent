import {
  ICreateQuickLinkDto,
  ICreateQuickLink,
  IEditQuickLink,
  IQuickLinkDto,
} from "@/data-contracts.ts";
import { ApiRequest } from "../types";
import { api } from "../api";
import { uiInstance } from "@/core/api/config.ts";

type CreateQuickLinkRequest = ApiRequest<
  "QUICK_LINK.CREATE",
  void,
  ICreateQuickLink,
  ICreateQuickLinkDto
>;

export const createQuickLink = async (
  data: ICreateQuickLink,
): Promise<ICreateQuickLinkDto> => {
  const response = await api.post<CreateQuickLinkRequest>(uiInstance, {
    url: "quicklink/create",
    body: data,
  });

  return response.data;
};

type CreateQuickLinkValidationRequest = ApiRequest<
  "QUICK_LINK.VALIDATION",
  void,
  ICreateQuickLink,
  any
>;

export const createQuickLinkValidation = async (
  data: ICreateQuickLink,
): Promise<any> => {
  const response = await api.post<CreateQuickLinkValidationRequest>(
    uiInstance,
    {
      url: "quicklink/precreate",
      body: data,
    },
  );

  return response.data;
};

type EditQuickLinkRequest = ApiRequest<
  "QUICK_LINK.EDIT",
  { id: string },
  Omit<IEditQuickLink, "id">,
  ICreateQuickLinkDto
>;

export const editQuickLink = async (
  data: IEditQuickLink,
): Promise<ICreateQuickLinkDto> => {
  const { id, ...rest } = data;
  const response = await api.put<EditQuickLinkRequest>(uiInstance, {
    url: "quicklink/:id",
    urlVariables: { id },
    body: { ...rest },
  });

  return response.data;
};

type DeleteQuickLinkRequest = ApiRequest<
  "QUICK_LINK.DELETE",
  { id: string },
  void,
  void
>;

export const deleteQuickLink = async (id: string) => {
  await api.delete<DeleteQuickLinkRequest>(uiInstance, {
    url: "quicklink/:id",
    urlVariables: { id },
  });
};

type GetOwnerQuickLinksRequest = ApiRequest<
  "QUICK_LINK.GET_LINKS_BY_OWNER",
  void,
  void,
  IQuickLinkDto[]
>;

export const getOwnerQuickLinks = async () => {
  const response = await api.get<GetOwnerQuickLinksRequest>(uiInstance, {
    url: "quicklink/all",
  });

  return response.data;
};

type GetQuickLinkRequest = ApiRequest<
  "QUICK_LINK.GET_LINK",
  { id?: string },
  { paymentId?: string },
  IQuickLinkDto
>;

export const getQuickLink = async (id?: string, paymentId?: number) => {
  const response = await api.get<GetQuickLinkRequest>(uiInstance, {
    url: "quicklink/:id",
    urlVariables: { id },
    urlParams: { paymentId },
  });
  return response.data;
};
