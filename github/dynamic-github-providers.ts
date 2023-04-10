import * as pulumi from '@pulumi/pulumi';
import * as github from '@pulumi/github';
import { githubToken, repositoriesWithGithubToken } from '../config';
import { invariant } from 'ts-invariant';

const dynamicProviders = new Map<string, github.Provider>();

export function getProvider(fullName: string): github.Provider {
  if (dynamicProviders.has(fullName)) {
    const provider = dynamicProviders.get(fullName);
    invariant(provider, 'Provider should exist');
    return provider;
  }

  const [owner] = fullName.split('/');

  const provider = new github.Provider(`dynamic-${fullName}`, {
    owner,
    token: githubToken,
  });

  dynamicProviders.set(fullName, provider);

  return provider;
}
