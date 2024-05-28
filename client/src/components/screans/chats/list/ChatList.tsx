'use client';

import Field from "@/ui/field/Field";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { $fetch } from "@/$api/api.fetch";
import { Loader } from "@/ui/loader/Loader";
import { ChatListItem } from "@/components/screans/chats/list/ChatListItem";
import { useAuth } from "@/hooks/useAuth";
import { IChat } from "../../../../../types/chat.types";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";


export default function ChatList() {
  const { user, isLoggedIn } = useAuth()

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['chats', debouncedSearchTerm],
    queryFn: () =>
      $fetch.get<{ data: IChat[] }>(
        `/chats?sort=createdAt:desc
				&populate[messages]=*
				&populate[participants][populate][avatar]=*
				&filters[participants][email][$eq]=${user?.email}
				&filters[$or][0][participants][username][$contains]=${debouncedSearchTerm}
				&filters[$or][1][messages][text][$contains]=${debouncedSearchTerm}
				`,
        true
      ),
    enabled: isLoggedIn
  })

  console.log(data, 'data')

  return (
    <div>
      <div className="border-t border-b border-border p-layout">
        <Field
          placeholder={'Search chats'}
          Icon={Search}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {isLoading || isFetching ? (
          <div className='p-layout'>
            <Loader/>
          </div>
        ) : (
          data?.data.map(chat => {
            return <ChatListItem key={chat.id} chat={chat}/>
          })
        )}
      </div>
    </div>
  )
}
