import { z } from 'zod';

/*
  match all urls according to follwing conditions
  - must start with either http:// or https://
  - domain and subdomain with allowed characters (alphanumeric, hyphen)
  - requires at least 2 alphabetic characters for the TLD
  - optional path
  - optional query parameters
*/
const urlRegex =
  /^(https?:\/\/)([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/[^\s]*)?(\?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?$/g;

export const createChatReqSchema = z.object({
  knowledge_src: z.string().regex(urlRegex, 'Invalid URL')
});

export const updateChatReqSchema = {
  params: z.object({
    id: z.string().uuid()
  }),
  body: z.object({
    title: z.string()
  })
};
