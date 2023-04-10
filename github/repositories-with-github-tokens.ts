import * as pulumi from '@pulumi/pulumi';
import * as github from '@pulumi/github';
import { githubToken, repositoriesWithGithubToken } from '../config';
import { getProvider } from './dynamic-github-providers';

repositoriesWithGithubToken.map(({ repo: fullName, invitationId }) => {
  const [org, repository] = fullName.split('/');

  const dependsOn: pulumi.Resource[] = [];

  const provider = getProvider(fullName);

  if (invitationId) {
    dependsOn.push(
      new github.UserInvitationAccepter(
        fullName,
        {
          invitationId: String(invitationId),
        },
        { provider },
      ),
    );
  }

  new github.ActionsSecret(
    `${org}-${repository}`,
    {
      secretName: 'BJERKBOT_GITHUB_TOKEN',
      plaintextValue: githubToken,
      repository,
    },
    { provider, dependsOn },
  );
});
