import { ApiRequest } from "@/core/api/types.ts";
import { api } from "@/core/api/api.ts";
import { uiInstance } from "@/core/api/config.ts";
import { API_ENDPOINTS } from "@/core/api/constants/api-endpoints.ts";
import {
  IChunkCompleteDto,
  IChunkInitDto,
  IChunkUploadCompleteRequest,
  IChunkUploadDto,
  IChunkUploadRequest,
} from "@/core/api/api-hooks/ui/upload/type.ts";

type initRequest = ApiRequest<"UPLOAD.INIT", void, void, IChunkInitDto>;

export const sendInitUpload = async () => {
  const response = await api.post<initRequest>(uiInstance, {
    url: API_ENDPOINTS.UPLOAD.INIT,
  });

  return response.data;
};

type ChunkUploadRequest = ApiRequest<
  "UPLOAD.CHUNK_UPLOAD",
  void,
  IChunkUploadRequest,
  IChunkUploadDto
>;

export const sendChunkUpload = async (data: IChunkUploadRequest) => {
  const formData = new FormData();
  formData.append("fileId", data.fileId);
  formData.append("files", data.files);
  const response = await api.post<ChunkUploadRequest>(uiInstance, {
    url: API_ENDPOINTS.UPLOAD.CHUNK_UPLOAD,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData as any,
  });

  return response.data;
};

type ChunkCompleteRequest = ApiRequest<
  "UPLOAD.COMPLETE_UPLOAD",
  void,
  IChunkUploadCompleteRequest,
  IChunkCompleteDto
>;

export const sendChunkCompleteUpload = async (
  data: IChunkUploadCompleteRequest,
) => {
  const formData = new FormData();
  data.chunkList.forEach((id) => {
    formData.append("chunkList", id);
  });
  formData.append("fileId", data.fileId);

  const response = await api.post<ChunkCompleteRequest>(uiInstance, {
    url: API_ENDPOINTS.UPLOAD.COMPLETE_UPLOAD,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData as any,
  });

  return response.data;
};
