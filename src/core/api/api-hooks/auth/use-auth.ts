import {useGetUser} from "@/core/api/api-hooks/ui/user/use-get-user.ts";

export const useAuth =  () => !!useGetUser()?.data
