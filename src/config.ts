import { GroupLabel, SortOrder } from './changelog';

type Config = {
  typeLabels: GroupLabel[];
  bumpLabels: GroupLabel[];
  issuesUrl: string;
  sortOrder?: SortOrder;
};

export const getConfig = (configFile: string): Config => {
  const { typeLabels, bumpLabels, issuesUrl, sortOrder } = require(configFile);
  return { typeLabels, bumpLabels, issuesUrl, sortOrder };
};
