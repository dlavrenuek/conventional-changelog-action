import generate from "./generate";

// @ts-ignore
global.AbortSignal = () => null;

describe("generate.ts", () => {
  it("generates the correct changelog", async () => {
    const changelog = await generate({
      from: "3a145b38feb6c24e9d54b507aa121676b1f184ea",
      to: "34ead995676dcc41c5cf8d9400af67c432a58333",
      configFile: "",
    });

    expect(changelog).toMatchSnapshot();
  });
});
