export interface Repository {
  repo: string;
  invitationId?: number;
  token?: boolean;
}
export const repositories: Repository[] = [
  // { repo: 'bjerkio/bot', invitationId: 44182036, token: true },
  { repo: 'basssene/infra', token: true },
  { repo: 'Eggedosis/infra-core', token: true },
  { repo: 'btoolsorg/infra', token: true },
  { repo: 'veltolini/fresh-oyatel', token: true, invitationId: 48116656 },
];
