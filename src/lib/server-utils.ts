import { JSDOM } from 'jsdom';
import { generateErrorMessage } from 'zod-error';

import type { Index } from '@upstash/vector';
import type { ZodIssue } from 'zod';
import type { ErrorMessageOptions } from 'zod-error';

export const isServer = typeof window === 'undefined' ? true : false;

export function validationErrorMessage(
  issues: ZodIssue[],
  options?: ErrorMessageOptions
) {
  return generateErrorMessage(issues, {
    maxErrors: 1,
    delimiter: { component: ': ' },
    code: { enabled: false },
    path: { enabled: true, type: 'objectNotation', label: '' },
    message: { enabled: true, label: '' },
    ...options
  });
}

export async function isHTML(url: string) {
  const response = await fetch(url, { method: 'HEAD' });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('text/html')) return true;
  return false;
}

export function escapeLink(link: string) {
  return link.replace(/[:/.]/g, '_');
}

export async function extractSiteTitle(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  const html = await response.text();
  const { document } = new JSDOM(html).window;
  const title = document.querySelector('title')?.textContent ?? 'Untitled';
  return title;
}

export async function awaitUntilIndexed(client: Index, timeoutMillis = 20_000) {
  const start = performance.now();

  do {
    const info = await client.info();
    if (info.pendingVectorCount === 0) {
      // OK, nothing more to index.
      return;
    }

    // Not indexed yet, sleep a bit and check again if the timeout is not passed.
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } while (performance.now() < start + timeoutMillis);

  throw new Error(`Timeout: Indexing is not completed in ${timeoutMillis} ms.`);
}
