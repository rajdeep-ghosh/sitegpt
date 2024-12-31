import { useContext } from 'react';

import { ChatContext } from '@/components/chat-provider';

export function useChatData() {
  const chatData = useContext(ChatContext);

  if (!chatData) {
    throw new Error('useChatData must be used within a ChatProvider');
  }

  return chatData;
}
