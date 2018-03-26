import fetchMock from 'fetch-mock';
import Client from '../src';

describe('Client', () => {
  afterEach(fetchMock.restore);

  it('makes api requests using guest token', async () => {
    fetchMock.mock(
      'https://example.org/getGuestCredentials',
      JSON.stringify({
        credentials: {
          RoleArn: 'foo:bar',
          WebIdentityToken: '12345',
        },
        apiUrl: 'https://example.org/api',
        region: 'moria-central-1',
      }),
    );
    const client = new Client({ registryUrl: 'https://example.org' });

    await client.query();

    const appSyncClient = await client.appSyncClient;

    expect(appSyncClient.$constructor).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://example.org/api',
        region: 'moria-central-1',
      }),
    );
    const { auth } = appSyncClient.$constructor.mock.calls[0][0];
    expect(auth.type).toBe('AWS_IAM');
    expect(auth.credentials.params).toEqual(
      expect.objectContaining({
        RoleArn: 'foo:bar',
        WebIdentityToken: '12345',
      }),
    );
  });

  it('fails when auth returns with non-200 status code', async () => {
    expect.assertions(1);

    fetchMock.mock('https://example.org/getGuestCredentials', {
      body: 'Internal Server Error',
      status: 500,
    });

    const client = new Client({ registryUrl: 'https://example.org' });

    try {
      await client.query();
    } catch (err) {
      expect(err.message).toBe('500: Internal Server Error');
    }
  });

  it('receives authenticated credentials when access token is provided', async () => {
    const mock = fetchMock.mock(
      'https://example.org/getCredentials',
      JSON.stringify({
        credentials: {
          RoleArn: 'foo:baz',
          WebIdentityToken: '67890',
        },
        apiUrl: 'https://example.org/api',
        region: 'moria-central-1',
      }),
    );
    const client = new Client({
      registryUrl: 'https://example.org',
      accessToken: 'r00t',
    });

    await client.query();

    expect(mock.called()).toBe(true);
    expect(mock.lastCall()[1]).toEqual({
      headers: {
        Authorization: 'Bearer r00t',
      },
    });
  });

  it('proxies query', async () => {
    fetchMock.mock(
      'https://example.org/getGuestCredentials',
      JSON.stringify({
        credentials: {},
        apiUrl: 'https://example.org/api',
        region: 'moria-central-1',
      }),
    );
    const client = new Client({ registryUrl: 'https://example.org' });
    const query = Symbol('query');
    await client.query(query);

    const appSyncClient = await client.appSyncClient;

    expect(appSyncClient.query).toHaveBeenCalledWith(query);
  });

  it('proxies mutate', async () => {
    fetchMock.mock(
      'https://example.org/getGuestCredentials',
      JSON.stringify({
        credentials: {},
        apiUrl: 'https://example.org/api',
        region: 'moria-central-1',
      }),
    );
    const client = new Client({ registryUrl: 'https://example.org' });
    const mutate = Symbol('mutate');
    await client.mutate(mutate);

    const appSyncClient = await client.appSyncClient;

    expect(appSyncClient.mutate).toHaveBeenCalledWith(mutate);
  });

  it('proxies subscribe', async () => {
    fetchMock.mock(
      'https://example.org/getGuestCredentials',
      JSON.stringify({
        credentials: {},
        apiUrl: 'https://example.org/api',
        region: 'moria-central-1',
      }),
    );
    const client = new Client({ registryUrl: 'https://example.org' });
    const subscribe = Symbol('subscribe');
    await client.subscribe(subscribe);

    const appSyncClient = await client.appSyncClient;

    expect(appSyncClient.subscribe).toHaveBeenCalledWith(subscribe);
  });
});
