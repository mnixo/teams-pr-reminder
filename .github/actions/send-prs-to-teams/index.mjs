import { Octokit } from 'octokit';
import axios from 'axios';

const octokit = new Octokit({
  auth: process.env.TOKEN,
});

// get the PRs that are open and have a review requested to the authenticated user
const response = await octokit.rest.search.issuesAndPullRequests({
  q: 'is:pr is:open review-requested:@me',
  per_page: 100,
  headers: {
    'x-github-api-version': '2022-11-28',
  },
});

// group the PRs by repository
const prs = {};
response.data.items.forEach((pr) => {
  const repository = pr.repository_url.replace('https://api.github.com/repos/', '');
  if (!prs[repository]) {
    prs[repository] = [];
  }
  prs[repository].push(pr);
});

// create the message to send to Teams
let message = '';
Object.keys(prs).forEach((repository) => {
  message += `### \`${repository}\`:\n`;
  prs[repository].forEach((pr) => {
    message += `  * [${pr.title}](${pr.html_url})\n`;
  });
});

const messagePayload = {
  text: message,
};

// send the message to Teams
await axios.post(process.env.TEAMS_WEBHOOK_URL, messagePayload, {
  headers: { 'Content-Type': 'application/json' },
});
