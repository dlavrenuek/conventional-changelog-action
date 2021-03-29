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
  } catch (error) {
    const git = simpleGit();
    setFailed(JSON.stringify(await git.listConfig()));
    //setFailed(error.message);
  }
};

run();
