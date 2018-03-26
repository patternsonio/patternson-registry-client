import { WebIdentityCredentials } from 'aws-sdk';

function fetchToken({ registryUrl, accessToken }) {
  if (accessToken) {
    return fetch(`${registryUrl}/getCredentials`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return fetch(`${registryUrl}/getGuestCredentials`);
}

export default async function getCredentials({ registryUrl, accessToken }) {
  const res = await fetchToken({ registryUrl, accessToken });

  if (res.status !== 200) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }

  const { credentials, apiUrl, region } = await res.json();

  return {
    credentials: new WebIdentityCredentials(credentials),
    apiUrl,
    region,
  };
}
