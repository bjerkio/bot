import { getToken } from "get-pulumi-secret";

export const npmToken = getToken({
  name: 'token',
  namespace: 'npm',
});