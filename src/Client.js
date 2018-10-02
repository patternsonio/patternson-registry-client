/* eslint-disable import/first */

import AWSAppSyncClient from 'aws-appsync';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import getCredentials from './getCredentials';

async function getClient(
  {
    registryUrl = 'https://registry.patternson.io',
    accessToken,
    disableOffline,
  },
  apolloClientOptions,
) {
  const { credentials, apiUrl: url, region } = await getCredentials({
    registryUrl,
    accessToken,
  });

  const c = new AWSAppSyncClient(
    {
      url,
      region,
      disableOffline,
      auth: {
        type: AUTH_TYPE.AWS_IAM,
        credentials,
      },
    },
    apolloClientOptions,
  );

  return c.hydrated();
}

export default class PatternsonRegistryClient {
  constructor(config = {}, apolloClientOptions) {
    this.appSyncClient = getClient(config, apolloClientOptions);
  }

  async mutate(...args) {
    const client = await this.appSyncClient;

    return client.mutate(...args);
  }

  async query(...args) {
    const client = await this.appSyncClient;

    return client.query(...args);
  }

  async subscribe(...args) {
    const client = await this.appSyncClient;

    return client.subscribe(...args);
  }
}
