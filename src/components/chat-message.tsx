import { useUser } from '@clerk/nextjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import type { Message } from 'ai/react';

type ChatMessageProps = {
  message: Message;
};

export default function ChatMessage({ message }: ChatMessageProps) {
  const { user } = useUser();

  return (
    <div className='flex gap-3'>
      {message.role === 'user' ? (
        <Avatar className='size-7 rounded-lg'>
          <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? 'avatar'} />
          <AvatarFallback className='uppercase'>
            {`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className='size-7 rounded-lg'>
          <AvatarImage src='/apple-touch-icon.png' alt='sitegpt' />
          <AvatarFallback>SiteGPT</AvatarFallback>
        </Avatar>
      )}
      <div className='text-sm leading-6'>{message.content}</div>
    </div>
  );
}
