import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';
import { getToken } from './op-secret.js';

const config = new pulumi.Config('op');

export const flexisoftGitHubToken = pulumi.secret(
  await getToken(config.require('flexisoftorg-github-token-path')),
);

export const flexisoftGitHubProvider = new github.Provider('flexisoftorg', {
  owner: 'flexisoftorg',
  token: flexisoftGitHubToken,
});

new github.ActionsOrganizationSecret(
  'flexisoftorg-github-token',
  {
    plaintextValue: flexisoftGitHubToken,
    secretName: 'BOT_GITHUB_TOKEN',
    visibility: 'all',
  },
  { provider: flexisoftGitHubProvider },
);
