export interface IChunkUploadRequest {
  fileId: string;
  files: any;
}
export interface IChunkUploadDto {
  fileId: string;
  chunkId: string;
  chunkGuid: string;
}

export interface IChunkInitDto {
  stage: string;
  fileId: string;
}

export interface IChunkCompleteDto {
  id: string;
  link: string;
}
export interface IChunkUploadCompleteRequest {
  fileId: string;
  chunkList: string[];
}
