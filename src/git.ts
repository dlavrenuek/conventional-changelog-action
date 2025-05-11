import {
  type ConventionalChangelogCommit,
  parser,
  toConventionalChangelogFormat,
} from "@conventional-commits/parser";
import simpleGit, { type DefaultLogFields } from "simple-git";

const git = simpleGit();

export type Commit = DefaultLogFields & {
  parsed: ConventionalChangelogCommit;
};

type Git = (params: { from: string; to: string }) => Promise<Commit[]>;

export const getCommits: Git = async ({ from, to }) => {
  const log = await git.log({
    from,
    to,
  });
  const parsed = log.all.map(({ message, body, ...commit }) => {
    try {
      return {
        ...commit,
        parsed: toConventionalChangelogFormat(
          parser(`${message}${body && `\n${body}`}`),
        ),
      };
    } catch (e) {
      // unconventional commits are ignored
    }
    return null;
  });
  return parsed.filter((commit): commit is Commit => commit !== null);
};

export const getRepositoryUrl = async (): Promise<string | null> => {
  const {
    values: {
      ".git/config": { "remote.origin.url": remotes },
    },
  } = await git.listConfig();

  const remote = Array.isArray(remotes) ? remotes[0] : remotes;
  const sshRegex = /git@github\.com:(.+)\.git/;
  const httpRegex = /https:\/\/github\.com\/(.+)/;
  const replace = "https://github.com/$1";

  for (const testRegx of [sshRegex, httpRegex]) {
    if (testRegx.test(remote)) {
      return remote.replace(sshRegex, replace);
    }
  }

  return null;
};

export const getIssuesPath = async (): Promise<string> => {
  const repositoryUrl = await getRepositoryUrl();

  if (!repositoryUrl) {
    throw new Error(
      "Repository url can not be determined from local git config",
    );
  }

  return `${repositoryUrl}/issues/`;
};
