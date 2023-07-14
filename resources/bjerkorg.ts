import * as github from '@pulumi/github';
import { githubToken, getGithubProvider } from './github';
import { npmToken } from './npm';

const provider = getGithubProvider('bjerkio');

new github.ActionsOrganizationSecret(
  'bjerkio-github-token',
  {
    plaintextValue: githubToken,
    secretName: 'BJERKBOT_GITHUB_TOKEN',
    visibility: 'all',
  },
  { provider },
);

new github.ActionsOrganizationSecret(
  'bjerkio-npm-token',
  {
    plaintextValue: npmToken,
    secretName: 'NPM_TOKEN',
    visibility: 'all',
  },
  { provider },
);
