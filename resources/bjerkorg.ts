import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';
import { npmToken } from './npm';
import { getToken } from 'get-pulumi-secret';

export const bjerkGitHubToken = pulumi.secret(
  getToken({
    name: 'bjerkio-token',
    namespace: 'github',
  }),
);

export const bjerkGitHubProvider = new github.Provider('bjerkio', {
  owner: 'bjerkio',
  token: bjerkGitHubToken,
});

new github.ActionsOrganizationSecret(
  'bjerkio-github-token',
  {
    plaintextValue: bjerkGitHubToken,
    secretName: 'BJERKBOT_GITHUB_TOKEN',
    visibility: 'all',
  },
  { provider: bjerkGitHubProvider },
);

new github.ActionsOrganizationSecret(
  'bjerkio-npm-token',
  {
    plaintextValue: npmToken,
    secretName: 'NPM_TOKEN',
    visibility: 'all',
  },
  { provider: bjerkGitHubProvider },
);
