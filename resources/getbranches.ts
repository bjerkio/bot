import * as github from '@pulumi/github';
import { getToken } from 'get-pulumi-secret';

export const branchesGitHubToken = getToken({
  name: 'getbranches-token',
  namespace: 'github',
});

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
