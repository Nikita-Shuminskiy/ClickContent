import { ApiRequest } from "@/core/api/types.ts";
import { api } from "@/core/api/api.ts";
import { uiInstance } from "@/core/api/config.ts";
import { IAddFeedback, IUploadFileDto } from "@/data-contracts.ts";

type UploadFileRequest = ApiRequest<
  "COMMON.UPLOAD_FILE",
  any,
  any,
  IUploadFileDto[]
>;

export const uploadFile = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  const response = await api.post<UploadFileRequest>(uiInstance, {
    url: "upload",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  return response.data;
};

type SendToBuyersEmailRequest = ApiRequest<
  "COMMON.SEND_TO_BUYERS_EMAIL",
  { email?: string },
  number | string,
  void
>;

export const sendToBuyersEmail = async ({
  paymentId,
  email,
}: {
  paymentId: number | string;
  email?: string;
}) => {
  await api.post<SendToBuyersEmailRequest>(uiInstance, {
    url: "sendmail",
    urlParams: {
      email,
    },
    body: paymentId,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

type AddFeedbackRequest = ApiRequest<
  "COMMON.ADD_FEEDBACK",
  IAddFeedback,
  IAddFeedback,
  void
>;

export const addFeedback = async (payload: IAddFeedback) => {
  await api.post<AddFeedbackRequest>(uiInstance, {
    url: "feedback",
    body: payload,
  });
};

type SendContentMaleRequest = ApiRequest<
  "FINANCE.SEND_CONTENT_MALE",
  void,
  { id: number; male: string },
  any
>;

export const sendContentMale = async ({ id, male }): Promise<any> => {
  const response = await api.post<SendContentMaleRequest>(uiInstance, {
    url: `sendmail?email=${male}`,
    body: id,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
