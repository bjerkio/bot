import * as github from '@pulumi/github';
import { githubToken } from '../../config';

export const provider = new github.Provider('getbranches', {
  owner: 'getbranches',
  token: githubToken,
});
