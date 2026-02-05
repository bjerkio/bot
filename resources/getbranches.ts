import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';
import { getToken } from './op-secret.js';

const config = new pulumi.Config('op');

export const branchesGitHubToken = pulumi.secret(
  await getToken(config.require('getbranches-github-token-path')),
);

export const branchesGitHubProvider = new github.Provider('getbranches', {
  owner: 'getbranches',
  token: branchesGitHubToken,
});

new github.ActionsOrganizationSecret(
  'getbranches-github-token',
  {
    plaintextValue: branchesGitHubToken,
    secretName: 'BJERKBOT_GITHUB_TOKEN',
    visibility: 'all',
  },
  { provider: branchesGitHubProvider },
);
