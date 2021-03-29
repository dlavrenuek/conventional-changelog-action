import { getInput, setFailed, setOutput } from '@actions/core';
import { getConfig } from './config';
import { getCommits, getIssuesPath } from './git';
import { generateChangelog } from './changelog';
import path from 'path';

const run = async () => {
  try {
    const from = getInput('from');
    const to = getInput('to');
    const configFile =
      getInput('config-file') || path.join(__dirname, 'defaultConfig.json');
    const issuesUrl = getInput('issues-url') || (await getIssuesPath());
    const config = getConfig(configFile);
    const commits = await getCommits({ from, to });
    const { body, bump } = generateChangelog({
      ...config,
      commits,
      issuesUrl,
    });

    setOutput('body', body);
    setOutput('bump', bump);
  } catch (error) {
    setFailed(error.message);
  }
};

run();
