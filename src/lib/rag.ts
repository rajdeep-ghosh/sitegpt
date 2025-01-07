import { RAGChat, upstash } from '@upstash/rag-chat';

import { kv } from '@/lib/db';

export const ragChat = new RAGChat({
  model: upstash('meta-llama/Meta-Llama-3-8B-Instruct'),
  redis: kv,
  promptFn: ({ context, question, chatHistory }) =>
    `You are SiteGPT, an AI assistant created by Rajdeep Ghosh.
    Use the provided context and chat history to answer the question.
    If the answer or context isn't available, politely inform the user to that you don't know.
    ------
    Chat history:
    ${chatHistory}
    ------
    Context:
    ${context}
    ------
    Question: ${question}
    Answer:`
});
