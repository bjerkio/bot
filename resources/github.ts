import * as github from '@pulumi/github';
import { getToken } from 'get-pulumi-secret';
export const providers = new Map();

export const githubToken = getToken({
  name: 'token',
  namespace: 'github',
});

export function getGithubProvider(org: string): github.Provider {
  if (!providers.has(org)) {
    providers.set(
      org,
      new github.Provider(org, {
        owner: org,
        token: githubToken,
      }),
    );
  }

  return providers.get(org);
}
