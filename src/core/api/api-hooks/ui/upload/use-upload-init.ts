import { useAppQuery } from "@/core/api/api-hooks/use-app-query.ts";
import { QueryKey } from "@/core/api/api-types/query-key.ts";
import { sendInitUpload } from "@/core/api/api-hooks/ui/upload/api.ts";

export const useUploadInit = () =>
  useAppQuery(QueryKey.UPLOAD_INIT, [], sendInitUpload);
