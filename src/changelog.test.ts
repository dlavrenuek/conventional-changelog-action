import loadFixtures, { Fixture } from './test/loadFixtures';
import {
  calculateBump,
  generateChangelog,
  GroupLabel,
  indexByType,
  SortOrder,
} from './changelog';
import { Commit } from './git';

const startsWith = (value: string) => ({ fileName }: Fixture) =>
  fileName.includes(value);

describe('changelog.ts', () => {
  describe('indexByType', () => {
    loadFixtures(__filename)
      .filter(({ fileName }) => fileName.includes('commits-'))
      .forEach(({ fileName, content }) => {
        it(`correctly indexes commits from ${fileName}`, () => {
          expect(indexByType(content() as Commit[])).toMatchSnapshot();
        });
      });
  });

  describe('calculateBump', () => {
    const fixtures = loadFixtures(__filename);
    const commitFixtures = fixtures.filter(startsWith('commits-'));
    const bumpFixtures = fixtures.filter(startsWith('bump-'));

    commitFixtures.forEach(({ fileName, content }) => {
      bumpFixtures.forEach(
        ({ fileName: bumpFileName, content: bumpContent }) => {
          it(`correctly calculates version bump of ${fileName} with ${bumpFileName}`, () => {
            expect(
              calculateBump(
                indexByType(content() as Commit[]),
                bumpContent() as GroupLabel[]
              )
            ).toMatchSnapshot();
          });
        }
      );
    });
  });

  describe('generateChangelog', () => {
    const fixtures = loadFixtures(__filename);
    const commitFixtures = fixtures.filter(startsWith('commits-'));
    const bumpFixtures = fixtures.filter(startsWith('bump-'));
    const typeFixtures = fixtures.filter(startsWith('type-'));

    commitFixtures.forEach(({ fileName, content }) => {
      bumpFixtures.forEach(
        ({ fileName: bumpFileName, content: bumpContent }) => {
          typeFixtures.forEach(
            ({ fileName: typeFileName, content: typeContent }) => {
              ['asc', 'desc'].forEach((sortOrder) => {
                it(`correctly generates the changelog with: ${fileName}, ${bumpFileName}, ${typeFileName}, sortOrder: ${sortOrder}`, () => {
                  expect(
                    generateChangelog({
                      commits: content() as Commit[],
                      issuesUrl: 'https://github.com/some/repository/issues/',
                      typeLabels: typeContent() as GroupLabel[],
                      bumpLabels: bumpContent() as GroupLabel[],
                      sortOrder: sortOrder as SortOrder,
                    })
                  ).toMatchSnapshot();
                });
              });
            }
          );
        }
      );
    });
  });
});
