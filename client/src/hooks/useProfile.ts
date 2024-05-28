import { $fetch } from '@/$api/api.fetch'
import { useQuery } from '@tanstack/react-query'
import { IUser } from "../../types/user.types";

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => $fetch.get<IUser>('/users/me?populate=deep', true),
  })
}
