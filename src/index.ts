import { getInput, setFailed, setOutput } from '@actions/core';
import path from 'path';
import generate from './generate';
import simpleGit from 'simple-git';

const run = async () => {
  try {
    const from = getInput('from');
    const to = getInput('to');
    const configFile =
      getInput('config-file') || path.join(__dirname, 'defaultConfig.json');

    const { body, bump } = await generate({
      from,
      to,
      configFile,
    });

    setOutput('body', body);
    setOutput('bump', bump);

    const git = simpleGit();
    setOutput('test', JSON.stringify(await git.listConfig()));
  } catch (error) {
    setFailed(error.message);
  }
};

run();
