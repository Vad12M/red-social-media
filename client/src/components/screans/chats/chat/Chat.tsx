'use client'
import { $fetch } from '@/$api/api.fetch'
import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { Message } from './Message'
import { IChat } from "../../../../../types/chat.types";
import { Loader } from "@/ui/loader/Loader";
import MessageField from "@/components/screans/chats/chat/MessageField";
import { ChatHeader } from "@/components/screans/chats/chat/ChatHeader";

export function Chat({ id }: { id: string }) {
  const { user } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['chat', id],
    queryFn: () =>
      $fetch.get<{ data: IChat }>(
        `/chats/${id}
        ?populate[messages][sort]=createdAt:asc
				&populate[messages][populate][sender][populate][avatar]=*
				&populate[participants][populate][avatar]=*`,
        true
      ),
    select: data => data.data,
    enabled: !!id,
  });

  const correspondent = data?.participants.find(u => u.email !== user?.email)

  return (
    <div className='w-8/12 border-r border-border h-full flex flex-col justify-between'>
      {isLoading ? (
        <div className='flex items-center justify-center h-full'>
          <Loader />
        </div>
      ) : (
        <div className='flex flex-col h-full justify-between'>
          <ChatHeader correspondent={correspondent} />
          <div className='p-layout'>
            {data?.messages.map(message => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        </div>
      )}
      <MessageField />
    </div>
  )
}
