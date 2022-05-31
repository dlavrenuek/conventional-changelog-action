import { GroupLabel, SortOrder } from './changelog';
import { debug } from '@actions/core';
import { existsSync } from 'fs';

type Config = {
  typeLabels: GroupLabel[];
  bumpLabels: GroupLabel[];
  issuesUrl: string;
  sortOrder?: SortOrder;
};

export const getConfig = (configFile: string): Config => {
  debug(`Loading config file: ${configFile} (${existsSync(configFile)})`);

  const { typeLabels, bumpLabels, issuesUrl, sortOrder } = require(configFile);
  return { typeLabels, bumpLabels, issuesUrl, sortOrder };
};
