import { createClient } from '@1password/sdk';
import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config();
const token = config.require('op:service-account-token');

const client = await createClient({
  auth: token,
  integrationName: 'bjerk-bot',
  integrationVersion: '1.0.0',
});

export async function getToken(path: string): Promise<string> {
  const secret = await client.secrets.resolve(path + '/credential');
  const expires = await client.secrets.resolve(path + '/expires');
  const expiresAt = new Date(expires);
  if (expiresAt < new Date()) {
    throw new Error(
      `Token at path ${path} has expired at ${expiresAt.toISOString()}`,
    );
  }

  return secret;
}
