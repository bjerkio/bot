import * as pulumi from '@pulumi/pulumi';
import * as github from '@pulumi/github';
import { repositories } from './repositories';

const config = new pulumi.Config();

const githubToken = config.requireSecret('bjerkbot-github-token');

const invites = repositories
  .filter(r => r.invitationId)
  .map(({ repo, invitationId }) => {
    return new github.UserInvitationAccepter(repo, {
      invitationId: String(invitationId),
    });
  });

const reposWithToken = repositories.filter(r => r.token);
const providers = new Map();

reposWithToken.map(({ repo }) => {
  const [org] = repo.split('/');
  if (!providers.has(org)) {
    providers.set(
      org,
      new github.Provider(org, {
        owner: org,
        organization: org,
        token: githubToken,
      }),
    );
  }
});

reposWithToken.map(({ repo }) => {
  const [org, repository] = repo.split('/');
  return new github.ActionsSecret(
    `${org}-${repository}`,
    {
      secretName: 'BJERKBOT_GITHUB_TOKEN',
      plaintextValue: githubToken,
      repository,
    },
    { provider: providers.get(org), dependsOn: invites },
  );
});

const organizations = config.requireObject<string[]>('organizations');

organizations.map(org => {
  if (!providers.has(org)) {
    providers.set(
      org,
      new github.Provider(org, {
        owner: org,
      }),
    );
  }
});

organizations.map(
  org =>
    new github.ActionsOrganizationSecret(
      org,
      {
        secretName: 'BJERKBOT_GITHUB_TOKEN',
        plaintextValue: githubToken,
        visibility: 'all',
      },
      { provider: providers.get(org) },
    ),
);
