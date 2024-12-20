import { JSDOM } from 'jsdom';

export const isServer = typeof window === 'undefined' ? false : true;

export async function isHTML(url: string) {
  const response = await fetch(url, { method: 'HEAD' });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('text/html')) return true;
  return false;
}

export async function extractSiteTitle(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  const html = await response.text();
  const { document } = new JSDOM(html).window;
  const title = document.querySelector('title')?.textContent ?? 'Untitled';
  return title;
}
