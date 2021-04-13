// import * as pulumi from '@pulumi/pulumi';
import * as github from '@pulumi/github';
import { repositories } from './repositories';

repositories.map(
  ({ repo, invitationId }) =>
    new github.UserInvitationAccepter(repo, {
      invitationId: String(invitationId),
    }),
);
