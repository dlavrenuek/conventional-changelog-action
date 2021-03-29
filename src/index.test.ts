import process from 'process';
import cp from 'child_process';
import path from 'path';
import { promisify } from 'util';

const exec = promisify(cp.exec);

test('test runs', async () => {
  process.env['INPUT_FROM'] = '';
  process.env['INPUT_TO'] = 'HEAD';

  const ip = path.join(__dirname, 'index.ts');
  const { stdout, stderr } = await exec(`ts-node ${ip}`, {
    env: process.env,
  });

  expect(stderr).toBeFalsy();
  expect(stdout).toBeTruthy();
});
