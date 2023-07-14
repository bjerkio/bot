import * as github from '@pulumi/github';
import { githubToken, getGithubProvider } from './github';

const provider = getGithubProvider('getbranches');

new github.ActionsOrganizationSecret(
  'getbranches-github-token',
  {
    plaintextValue: githubToken,
    secretName: 'BJERKBOT_GITHUB_TOKEN',
    visibility: 'all',
  },
  { provider },
);
