import generate from './generate';

describe('generate.ts', () => {
  it('generates the correct changelog', async () => {
    const changelog = await generate({
      from: '3a145b38feb6c24e9d54b507aa121676b1f184ea',
      to: '35b249828f9aa88e3879aea50bbf450b2643342a',
      configFile: '',
    });

    expect(changelog).toMatchSnapshot();
  });
});
