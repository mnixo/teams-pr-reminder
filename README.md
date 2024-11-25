# teams-gh-pr-reminder

A GitHub Actions workflow that automatically sends an MS Teams message with the list of PRs awaiting review for user, on a cron schedule.

## Requirements

Two secrets are required:
- `TOKEN`: The GitHub token for the user, with the appropriate access. Example: A classic GitHub token with `repo` access.
- `TEAMS_WEBHOOK_URL`: The webhook URL to an MS Teams channel with the [Incoming Webhook](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) connector enabled.
