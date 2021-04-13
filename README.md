<div style="text-align: center">
  <img src=".github/header.svg" width="200px">
</div>

# Bjerk Bot

This repository contains code that defines which repositories the [@bjerkbot][bjerkbot] accepts invites from.

_[@bjerkbot][bjerkbot] is a bot used internally at Bjerk._

## How to add [@bjerkbot][bjerkbot] to a new repository.

You'll probably want to install [Github CLI][github-cli]. That will help you to get the `inviteId` (e.g. `44182036`).

1. Run `gh api -XPUT repos/:owner/:repo/collaborators/bjerk-bot`
2. Copy the `"id"`.
3. Open a pull request where you add this `id` to `repositories.ts`.

* Remember to add the repository as a comment.

```typescript
export const repositories = [
  44182036, // bjerkio/bot
];
```

<img width="600" src="https://raw.githubusercontent.com/bjerkio/bot/main/.github/demo.svg" />

[bjerkbot]: https://github.com/bjerk-bot
[github-cli]: https://cli.github.com/
