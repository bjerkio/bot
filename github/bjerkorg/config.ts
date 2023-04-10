import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config('bjerkio');

export const orgWideNpmExpiresAt = config.require('org-wide-npm-expires-at');
export const orgWideNpmToken = config.requireSecret('org-wide-npm-token');
