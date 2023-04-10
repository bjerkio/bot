import * as github from '@pulumi/github';
import { githubToken } from '../../config';
import { provider } from './provider';

// TODO: Add a check to see if the token is going to expire.

new github.ActionsOrganizationSecret(
  'bjerkio-github-token',
  {
    plaintextValue: githubToken,
    secretName: 'BJERKBOT_GITHUB_TOKEN',
    visibility: 'all',
  },
  { provider, aliases: [{ name: 'bjerkio' }] },
);
