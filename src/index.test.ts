import process from "node:process";
import cp from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

const exec = promisify(cp.exec);

describe("index.ts", () => {
  test("The action is executed without an error", async () => {
    const env = {
      ...process.env,
      INPUT_FROM: "",
      INPUT_TO: "HEAD",
    };

    const ip = path.join(__dirname, "index.ts");
    const { stdout, stderr } = await exec(`pnpm exec ts-node ${ip}`, {
      env,
    });

    console.log("stdout", stdout);
    console.log("stderr", stderr);

    expect(stderr).toBeFalsy();
    expect(stdout).toBeTruthy();
  });
});
