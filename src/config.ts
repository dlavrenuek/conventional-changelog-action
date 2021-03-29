import { GroupLabel, SortOrder } from './changelog';

type Config = {
  typeLabels: GroupLabel[];
  bumpLabels: GroupLabel[];
  sortOrder?: SortOrder;
};

export const getConfig = (configFile: string): Config => {
  const { typeLabels, bumpLabels, sortOrder } = require(configFile);
  return { typeLabels, bumpLabels, sortOrder };
};
