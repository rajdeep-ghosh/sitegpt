import type { SelectChat } from '@/lib/db/schema';

type SuccessState = { status: 'success' };
type ErrorState = { status: 'error'; message: string };

export type Chats = (SuccessState & { data: SelectChat[] }) | ErrorState;
export type Chat = (SuccessState & { data: SelectChat }) | ErrorState;
