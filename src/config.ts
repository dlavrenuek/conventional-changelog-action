import { GroupLabel, SortOrder } from './changelog';
import { debug } from '@actions/core';
import { readFileSync } from 'fs';

type Config = {
  typeLabels: GroupLabel[];
  bumpLabels: GroupLabel[];
  issuesUrl: string;
  sortOrder?: SortOrder;
};

export const getConfig = (configFile: string): Config => {
  debug(`Loading config file: ${configFile}`);

  const config = JSON.parse(readFileSync(configFile, { encoding: 'utf8' }));

  debug(`Loaded config: ${config}`);

  const { typeLabels, bumpLabels, issuesUrl, sortOrder } = config;
  return { typeLabels, bumpLabels, issuesUrl, sortOrder };
};
