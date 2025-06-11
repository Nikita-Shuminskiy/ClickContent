import useSWRMutation from "swr/mutation";

const fetcher = async (url: string, { arg }: any) => {
  const fullPath = `https://clickcontent-landing-page-api.vmirecloud.eu${url}`;
  const response = await fetch(fullPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const data = await response.json();
  if (data.errors) {
    throw new Error(data.errors);
  }
  return data;
};
export const uploadFileFetcher = async (path: string, { arg }: any) => {
  const formData = new FormData();
  arg.file.forEach((file) => {
    formData.append("productFiles", file, file.name);
  });
  const response = await fetch(path, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export function useSendForm() {
  const { data, error, isMutating, trigger, reset } = useSWRMutation(
    `/form/addForm`,
    fetcher,
  );
  const sendForm = (data: any) => trigger(data);
  return { error, isMutating, sendForm, reset, formData: data };
}

export function useUploadFileDocument() {
  const { data, error, isMutating, trigger } = useSWRMutation<
    [{ file: File; id: string }],
    any,
    string,
    { file: File[] }
  >(
    `https://clickcontent-landing-page-api.vmirecloud.eu/form/uploadFiles`,
    uploadFileFetcher,
  );

  return {
    uploadFileDataDocument: data,
    documentFileError: error,
    isDocumentFileLoading: isMutating,
    uploadDocumentFile: (payload: { file: File[] }) => trigger(payload),
  };
}

export function useUploadProductFile() {
  const { data, error, isMutating, trigger } = useSWRMutation<
    [{ file: File; id: string }],
    any,
    string,
    { file: File[] }
  >(
    `https://clickcontent-landing-page-api.vmirecloud.eu/form/uploadFiles`,
    uploadFileFetcher,
  );

  return {
    uploadFileProductData: data,
    productFileError: error,
    isProductFileLoading: isMutating,
    uploadProductFile: (payload: { file: File[] }) => trigger(payload),
  };
}
