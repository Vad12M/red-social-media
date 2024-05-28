import { useSession } from 'next-auth/react'
import { IUser } from "../../types/user.types";

export function useAuth() {
  const { data, status } = useSession()

  return {
    user: data?.user as IUser,
    isLoggedIn: status === 'authenticated',
  }
}
