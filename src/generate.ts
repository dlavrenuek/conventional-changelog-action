import path from 'path';
import { getConfig } from './config';
import { getCommits, getIssuesPath } from './git';
import { Changelog, generateChangelog } from './changelog';

type Generate = (params: {
  from: string;
  to: string;
  configFile: string;
}) => Promise<Changelog>;

const generate: Generate = async ({ from, to, configFile }) => {
  const config = getConfig(
    configFile || path.join(__dirname, 'defaultConfig.json')
  );
  const issuesUrl = config.issuesUrl || (await getIssuesPath());
  const commits = await getCommits({ from, to });
  return generateChangelog({
    ...config,
    commits,
    issuesUrl,
  });
};

export default generate;
