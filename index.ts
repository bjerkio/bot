import * as pulumi from '@pulumi/pulumi';
import * as github from './resources/github';
import './resources/bjerkorg';
import './resources/getbranches';
import './resources/github';
import './resources/npm';

export const githubToken = pulumi.secret(github.githubToken);
