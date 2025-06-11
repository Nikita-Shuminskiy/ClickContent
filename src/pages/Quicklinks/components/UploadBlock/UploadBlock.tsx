import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { SpinerUI } from "@components/ui/SpinerUI";
import { useChunkUpload } from "@/core/api/api-hooks/ui/upload/use-upload-chunk.ts";
import { useChunkUploadComplete } from "@/core/api/api-hooks/ui/upload/use-upload-chunk-complete.ts";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@components/ui/icon/icon.tsx";

const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB

const UploadBlock = ({ fileIds, setFileIds }) => {
  const { mutateAsync: uploadChunkFile } = useChunkUpload();
  const { mutateAsync: uploadChunkComplete } = useChunkUploadComplete();

  const handleFileChange = async (files) => {
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files).map((file: any) => ({
      id: uuidv4(),
      name: file.name,
      file,
      load: true,
      isLoaded: false,
    }));

    setFileIds((prev) => [...prev, ...newFiles]);

    for (const { file, id } of newFiles) {
      let chunkList = [];
      try {
        const success = await uploadFileInChunks(file, id, chunkList);
        if (success) {
          await uploadChunkComplete({ fileId: id, chunkList });
          setFileIds((prev) =>
            prev.map((item) =>
              item.id === id
                ? {
                    ...item,
                    isLoaded: true,
                    load: false,
                  }
                : item,
            ),
          );
        }
      } catch {
        setFileIds((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  isLoaded: false,
                  load: false,
                }
              : item,
          ),
        );
      }
    }
  };

  const uploadFileInChunks = async (file, fileId, chunkList) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(
        i * CHUNK_SIZE,
        Math.min((i + 1) * CHUNK_SIZE, file.size),
      );
      try {
        const { chunkGuid } = await uploadChunkFile({ fileId, files: chunk });
        chunkList.push(chunkGuid);
      } catch (error) {
        console.error(`Ошибка загрузки чанка ${i + 1}:`, error);
        return false;
      }
    }
    return true;
  };

  const handleDeleteFile = (file) =>
    setFileIds((prev) => prev.filter((item) => item.id !== file.id));
  const handleReuploadFile = async (file) => handleFileChange([file.file]);

  return (
    <>
      <FileUploader handleChange={handleFileChange} name="file" multiple={true}>
        <div className=" min-h-[78px] w-full custom-border-download relative overflow-hidden cursor-pointer flex justify-center items-center p-5">
          <span className="text-[12px] text-center max-w-[100px] font-['TTFirsNeue']">
            Загрузить файлы
          </span>
        </div>
      </FileUploader>

      <div className="flex flex-col gap-5">
        {fileIds.map((item) => (
          <div
            key={item.id}
            className="flex justify-between gap-3 items-center border-b border-[#FFFFFF1A] pb-[18px]"
          >
            <div className="flex gap-[11px] items-center">
              <div className="w-7 h-7 p-1 bg-[#202020] rounded-[4px] flex">
                {item.load ? (
                  <SpinerUI />
                ) : (
                  <Icon
                    name={item.isLoaded ? "fileIcon" : "warningIcon"}
                    className="w-full h-full"
                  />
                )}
              </div>
              <span className="max-w-[239px] text-sm font-inter truncate">
                {item.name}
              </span>
            </div>
            <div className="flex gap-5 items-center">
              {!item.isLoaded && !item.load && (
                <Icon
                  name={"retryLoadIcon"}
                  className="cursor-pointer w-[16px] h-[16px]"
                  onClick={() => handleReuploadFile(item)}
                />
              )}

              <Icon
                name={"thrashIcon"}
                className="cursor-pointer w-[15px] h-[19px]"
                onClick={() => handleDeleteFile(item)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadBlock;
