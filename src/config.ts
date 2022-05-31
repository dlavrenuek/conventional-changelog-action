import { GroupLabel, SortOrder } from './changelog';
import { debug } from '@actions/core';
import { readFile } from 'node:fs/promises';

type Config = {
  typeLabels: GroupLabel[];
  bumpLabels: GroupLabel[];
  issuesUrl: string;
  sortOrder?: SortOrder;
};

export const getConfig = async (configFile: string): Promise<Config> => {
  debug(`Loading config file: ${configFile}`);

  const config = JSON.parse(await readFile(configFile, { encoding: 'utf8' }));

  debug(`Loaded config: ${config}`);

  const { typeLabels, bumpLabels, issuesUrl, sortOrder } = config;
  return { typeLabels, bumpLabels, issuesUrl, sortOrder };
};
