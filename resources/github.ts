import * as github from '@pulumi/github';
import * as pulumi from '@pulumi/pulumi';

export const providers = new Map();

const config = new pulumi.Config('github');
export const githubToken = config.requireSecret('token');

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
