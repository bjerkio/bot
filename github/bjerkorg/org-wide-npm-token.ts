import * as github from '@pulumi/github';
import { isAfter, subDays } from 'date-fns';
import { orgWideNpmToken, orgWideNpmExpiresAt } from './config';
import { provider } from './provider';

const expiresAt = new Date(orgWideNpmExpiresAt);

// fail if the is going to expires in less than 14 days
const fourteenDaysBefore = subDays(expiresAt, 14).getTime();

if (isAfter(new Date(), fourteenDaysBefore)) {
  throw new Error(
    'The npm token is going to expire in less than 14 days. Please update it.',
  );
}

const token = orgWideNpmToken;

new github.ActionsOrganizationSecret(
  'bjerkio-npm-token',
  {
    plaintextValue: token,
    secretName: 'NPM_TOKEN',
    visibility: 'all',
  },
  { provider },
);
