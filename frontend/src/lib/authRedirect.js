export function sanitizeInternalRedirect(value, fallback = '/dashboard') {
  if (typeof value !== 'string') return fallback;

  const candidate = value.trim();

  if (
    !candidate.startsWith('/')
    || candidate.startsWith('//')
    || candidate.includes('\\')
  ) {
    return fallback;
  }

  try {
    const url = new URL(candidate, 'https://ecomlanka.local');

    if (url.origin !== 'https://ecomlanka.local') {
      return fallback;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function loginUrlFor(returnUrl, reason) {
  const params = new URLSearchParams({
    redirect: sanitizeInternalRedirect(returnUrl, '/dashboard'),
  });

  if (reason) {
    params.set('reason', reason);
  }

  return `/login?${params.toString()}`;
}
