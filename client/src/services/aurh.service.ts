import { $fetch } from "@/$api/api.fetch";
import { IUser } from "../../types/user.types";
import { User } from "next-auth";
import { IAuthFormState } from "@/components/screans/auth/auth.types";

export async function register(credentials: IAuthFormState) {
  try {
    const data = await $fetch.post<{
      user: IUser
      jwt: string
    }>(`/auth/local/register?populate[avatar]=*`, credentials)

    return {
      id: data.user.id.toString(),
      email: data.user.email,
      avatar: data.user.avatar?.url,
      username: data.user.username,
      jwt: data.jwt,
    } as User
  } catch (e) {
    return Promise.reject({
      message: 'Register error, not valid data!',
    })
  }
}

export async function login(email: string, password: string): Promise<User> {
  try {
    const data = await $fetch.post<{
      user: IUser
      jwt: string
    }>(`/auth/local?populate[avatar]=*`, {
      identifier: email,
      password: password,
    })

    return {
      id: data.user.id.toString(),
      email: data.user.email,
      avatar: data.user.avatar?.url,
      username: data.user.username,
      jwt: data.jwt,
    } as User
  } catch (e) {
    return Promise.reject({
      message: 'Login error, not valid data!',
    })
  }
}
