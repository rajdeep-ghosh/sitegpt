import type { Chat, Chats } from '@/types';

export async function getChats(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    const err = (await res.json()) as Extract<
      Chats,
      { status: 'error' }
    >['message'];
    throw new Error(err);
  }

  return res.json() as unknown as Extract<Chats, { status: 'success' }>;
}

export async function getChat(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    const err = (await res.json()) as Extract<
      Chat,
      { status: 'error' }
    >['message'];
    throw new Error(err);
  }

  return res.json() as unknown as Extract<Chat, { status: 'success' }>;
}

export async function createChat(url: string, { arg }: { arg: string }) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ knowledge_src: arg })
  });

  if (!res.ok) {
    const err = (await res.json()) as Extract<
      Chat,
      { status: 'error' }
    >['message'];
    throw new Error(err);
  }

  return res.json() as unknown as Extract<Chat, { status: 'success' }>;
}

export async function updateChat(url: string, { arg }: { arg: string }) {
  const res = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({ title: arg })
  });

  if (!res.ok) {
    const err = (await res.json()) as Extract<
      Chat,
      { status: 'error' }
    >['message'];
    throw new Error(err);
  }

  return res.json() as unknown as Extract<Chat, { status: 'success' }>;
}

export async function deleteChat(url: string) {
  const res = await fetch(url, {
    method: 'DELETE'
  });

  if (!res.ok) {
    const err = (await res.json()) as Extract<
      Chat,
      { status: 'error' }
    >['message'];
    throw new Error(err);
  }

  return res.json() as unknown as Extract<Chat, { status: 'success' }>;
}
