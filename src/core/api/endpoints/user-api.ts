import { api } from "@/core/api/api.ts";
import { uiInstance } from "@/core/api/config.ts";
import { ApiRequest } from "@/core/api/types.ts";
import { IUserDto, IUserLimitDto } from "@/data-contracts.ts";

type CreateUniqueNicknameRequest = ApiRequest<
  "QUICK_LINK.CREATE",
  any,
  string,
  null
>;

export const createUniqueNickname = async (nickname: string) => {
  const response = await api.post<CreateUniqueNicknameRequest>(uiInstance, {
    url: "user/nickname",
    body: nickname,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
  return response.data;
};

type AddUserAvatarRequest = ApiRequest<"QUICK_LINK.CREATE", any, string, any>;

export const addUserAvatar = async (id: string) => {
  const response = await api.post<AddUserAvatarRequest>(uiInstance, {
    url: "user/avatar",
    headers: {
      "Content-Type": "application/json",
    },
    body: id,
  });
  return response.data;
};

type GetUserRequest = ApiRequest<"USER.GET_USER", any, null, IUserDto>;

export const getUser = async () => {
  const response = await api.get<GetUserRequest>(uiInstance, {
    url: "user",
  });
  return response.data;
};

type GetUserLimitRequest = ApiRequest<
  "USER.GET_USER_LIMIT",
  any,
  null,
  IUserLimitDto
>;
export const getUserLimit = async () => {
  const response = await api.get<GetUserLimitRequest>(uiInstance, {
    url: "user/limits",
  });
  return response.data;
};

type DeleteUserAvatarRequest = ApiRequest<
  "USER.DELETE_USER_AVATAR",
  any,
  null,
  null
>;
export const deleteUserAvatar = async () => {
  const response = await api.delete<DeleteUserAvatarRequest>(uiInstance, {
    url: "user/avatar",
  });
  return response.data;
};
