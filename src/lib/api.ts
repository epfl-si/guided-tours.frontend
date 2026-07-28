import type { UserType } from './types.tsx';

interface ApiCallOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: Record<string, any>;
  bearerToken?: string;
  basicAuth?: {
    username: string;
    password?: string;
  };
}

async function callExternalApi(
  url: string,
  options: ApiCallOptions = {}
) {
  const method = options.method || 'GET';
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  if (!headers.has('Authorization')) {
    if (options.bearerToken) {
      headers.set('Authorization', `Bearer ${options.bearerToken}`);
    } else if (options.basicAuth) {
      const authString = btoa(`${options.basicAuth.username}:${options.basicAuth.password || ''}`);
      headers.set('Authorization', `Basic ${authString}`);
    }
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (options.body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, fetchOptions);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Failed to fetch external API: ${url} (${response.status})`);
  }
}

export async function fetchConnectedUser(
  address: string | undefined,
  authToken: string | undefined
): Promise<UserType> {
  const url = `${address}/api/user/me`;

  return await callExternalApi(url, {
    bearerToken: authToken || ''
  });
}

export async function postRegistration(
  address: string | undefined,
  data: Record<string, any>
): Promise<UserType> {
  const url = `${address}/api/visit/register`;
  if (!data) {
    throw new Error('Data is required to post registration');
  }
  return await callExternalApi(url, {
    method: 'POST',
    body: {
      data
    }
  });
}

export async function fetchVisitTitle(
  address: string | undefined,
  authToken: string | undefined,
  placeId: number | undefined
): Promise<string> {
  const url = `${address}/api/visit/${placeId}/details`;
  if (!placeId) {
    throw new Error('placeId is required to fetch visit title');
  }

  return await callExternalApi(url, {
    bearerToken: authToken,
    method: 'GET',
  });
}
