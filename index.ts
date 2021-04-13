import * as pulumi from '@pulumi/pulumi';
import * as github from '@pulumi/github';
import { repositories } from './repositories';

const config = new pulumi.Config();

const invites = repositories
  .filter(r => r.token)
  .map(({ repo, invitationId }) => {
    return new github.UserInvitationAccepter(repo, {
      invitationId: String(invitationId),
    });
  });

const reposWithToken = repositories.filter(r => r.token);
const providers = new Map();

reposWithToken.map(({repo}) => {
  const [org] = repo.split('/');
  if (!providers.has(org)) {
    providers.set(
      org,
      new github.Provider(org, {
        organization: org,
      }),
    );
  }
});

reposWithToken.map(({ repo }) => {
  const [org, repository] = repo.split('/');
  return new github.ActionsSecret(
    repository,
    {
      secretName: 'BJERKBOT_GITHUB_TOKEN',
      plaintextValue: config.requireSecret('bjerkbot-github-token'),
      repository,
    },
    { provider: providers.get(org), dependsOn: invites },
  );
});