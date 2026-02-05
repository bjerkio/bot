import { getToken } from './op-secret.js';
import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config('op');

export const npmToken = await getToken(config.require('npm-token-path'));
