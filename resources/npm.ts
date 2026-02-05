import { getToken } from './op-secret';
import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config();

export const npmToken = await getToken(config.require('npm-token'));
