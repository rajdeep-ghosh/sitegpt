import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function isHTML(url: string) {
  const response = await fetch(url, { method: 'HEAD' });
  if (!response) throw new Error('HTTP Error');

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('text/html')) return true;
  return false;
}
