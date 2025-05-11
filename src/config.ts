import { readFileSync } from "node:fs";
import type { GroupLabel, SortOrder } from "./changelog";

type Config = {
  typeLabels: GroupLabel[];
  bumpLabels: GroupLabel[];
  issuesUrl: string;
  sortOrder?: SortOrder;
};

export const getConfig = (configFile: string): Config => {
  const config = JSON.parse(readFileSync(configFile, { encoding: "utf8" }));

  const { typeLabels, bumpLabels, issuesUrl, sortOrder } = config;
  return { typeLabels, bumpLabels, issuesUrl, sortOrder };
};
