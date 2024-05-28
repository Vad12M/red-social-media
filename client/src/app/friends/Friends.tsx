'use client'
import { $fetch } from '@/$api/api.fetch'
import { useProfile } from '@/hooks/useProfile'
import { useMutation, useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import Image from 'next/image'
import { Loader } from "@/ui/loader/Loader";
import { IUser } from "../../../types/user.types";
import { getImageUrl } from "@/app/config/get-image-url.config";
import toast from "react-hot-toast";

export function Friends() {
  const { data: authUser, refetch: refetchProfile } = useProfile()

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => $fetch.get<IUser[]>('/users?populate=avatar', true),
  });

  return (
    <div className='w-7/12'>
      <h1 className='p-layout border-r border-b border-border'>People</h1>
      {isLoading || isFetching ? (
        <div className='p-layout'>
          <Loader/>
        </div>
      ) : (
        <div className='grid grid-cols-3'>
          {data?.map(user => {
            const isFriend = authUser?.friends?.some(u => u.id === user.id)
            return (
              <div
                key={user.id}
                className={cn(
                  'text-center border border-l-0 border-t-0 border-border p-layout'
                )}
              >
                <Image
                  width={100}
                  height={100}
                  alt={user.username}
                  src={getImageUrl(user.avatar?.url) || '/no-avatar.png'}
                  priority
                  className='mx-auto'
                />
                <div className='mt-3 text-xl font-medium'>{user.username}</div>
                <button className={`${isFriend ? 'border-redDark bg-red hover:bg-redDark' : 'bg-primary border-primary hover:bg-primaryDark'}
								    border transition-colors cursor-pointer mt-2 px-6 py-1 rounded-2xl`}>
                  {isFriend ? 'Remove from friends' : 'Add to friends'}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
