import * as github from '@pulumi/github';
import { githubToken } from '../../config';

export const provider = new github.Provider('bjerkorg', {
  owner: 'bjerkio',
  token: githubToken,
});
