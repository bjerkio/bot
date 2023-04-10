import * as pulumi from '@pulumi/pulumi';
import { z } from 'zod';

const config = new pulumi.Config();

export const githubToken = config.requireSecret('bjerkbot-github-token');

const repositoriesWithGithubTokensConfigValue = config.requireObject(
  'repositories-with-github-token',
);

const repositoryZod = z.object({
  repo: z.string(),
  invitationId: z.number().optional(),
});

export const repositoriesWithGithubToken = z
  .array(repositoryZod)
  .parse(repositoriesWithGithubTokensConfigValue);
