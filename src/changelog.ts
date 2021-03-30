import { Commit } from './git';

const BREAKING_CHANGE_TITLE = 'BREAKING CHANGE';

type IndexedByType = Record<string, Commit[]>;

export const indexByType = (commits: Commit[]): IndexedByType =>
  commits.reduce<IndexedByType>((indexed, commit) => {
    const {
      parsed: { type, notes },
    } = commit;
    const isBreaking = notes.some(
      ({ title }) => title === BREAKING_CHANGE_TITLE
    );
    const determinedType = isBreaking ? 'breaking' : type;
    const typeArray = [...(indexed[determinedType] || []), commit];

    return {
      ...indexed,
      [determinedType]: typeArray,
    };
  }, {});

export const commitToChagelogLine = (
  { parsed: { subject, scope } }: Commit,
  issuesUrl: string
) => {
  const message = subject.replace(
    /(.+)\(#([0-9]+)\)/,
    `$1([#$2](${issuesUrl}$2))`
  );

  return `* ${scope ? `**${scope}**: ` : ''}${message}`;
};

export const calculateBump = (
  indexedByType: IndexedByType,
  bumpLabels: GroupLabel[]
): string => {
  if (!bumpLabels.length) {
    return '';
  }
  for (let i = 0; i < bumpLabels.length; i++) {
    const { title, types } = bumpLabels[i];
    if (
      types.some((type) => indexedByType[type] && indexedByType[type].length)
    ) {
      return title;
    }
  }
  return bumpLabels[bumpLabels.length - 1].title;
};

type CommitSorter = (a: Commit, b: Commit) => -1 | 1;

export type CommitSortOrder = 'asc' | 'desc';

const commitSortBy: Record<CommitSortOrder, CommitSorter> = {
  asc: ({ date: dateA }, { date: dateB }) => (dateA < dateB ? -1 : 1),
  desc: ({ date: dateA }, { date: dateB }) => (dateA > dateB ? -1 : 1),
};

export type Changelog = {
  body: string;
  bump: string;
};

export type GroupLabel = {
  title: string;
  types: string[];
};

export type SortOrder = 'asc' | 'desc';

type GenerateChangelog = (params: {
  commits: Commit[];
  issuesUrl: string;
  typeLabels: GroupLabel[];
  bumpLabels: GroupLabel[];
  sortOrder?: SortOrder;
}) => Changelog;

export const generateChangelog: GenerateChangelog = ({
  commits,
  issuesUrl,
  typeLabels,
  bumpLabels,
  sortOrder = 'desc',
}) => {
  const indexedByType = indexByType(commits);
  const mapCommit = (commit: Commit) => commitToChagelogLine(commit, issuesUrl);
  const body = typeLabels
    .map(({ title, types }) => {
      const typeCommits = types
        .map((type) => indexedByType[type] || [])
        .flat()
        .sort(commitSortBy[sortOrder]);

      if (!typeCommits.length) {
        return null;
      }

      return [`## ${title}`, ...typeCommits.map(mapCommit)].join('\n');
    })
    .filter((block) => block !== null)
    .join('\n\n');
  const bump = calculateBump(indexedByType, bumpLabels);

  return {
    body,
    bump,
  };
};
