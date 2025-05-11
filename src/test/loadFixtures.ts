import * as fs from "node:fs";
import * as path from "node:path";

export type Fixture = {
  fileName: string;
  content(): unknown;
};

const loadFixtures = (testSuite: string): Fixture[] => {
  const fixturesSubPath = path
    .resolve(testSuite)
    .substr(path.resolve(path.join(__dirname, "..")).length);
  const fixturesPath = path.join(__dirname, "fixtures", fixturesSubPath);

  return fs.readdirSync(fixturesPath).map((fileName) => ({
    fileName,
    content: () => require(path.join(fixturesPath, fileName)),
  }));
};

export default loadFixtures;
