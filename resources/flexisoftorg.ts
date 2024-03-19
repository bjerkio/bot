import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';
import { getToken } from 'get-pulumi-secret';

export const flexisoftGitHubToken = pulumi.secret(
  getToken({
    name: 'flexisoftorg-token',
    namespace: 'github',
  }),
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
