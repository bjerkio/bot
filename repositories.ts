export interface Repository {
  repo: string;
  invitationId?: number;
  token?: boolean;
}
export const repositories: Repository[] = [
  // { repo: 'bjerkio/bot', invitationId: 44182036, token: true },
  { repo: 'basssene/infra', token: true },
  { repo: 'btoolsorg/infra', token: true },
  { repo: 'veltolini/fresh-oyatel', token: true, invitationId: 48116656 },
  { repo: 'taksnor/infra', token: true, invitationId: 109726369 },
];
