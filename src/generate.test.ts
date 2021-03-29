import generate from './generate';

describe('generate.ts', () => {
  it('generates the correct changelog', async () => {
    const changelog = await generate({
      from: '',
      to: '2ad9f0c03f0da4b485e82a53ea7a3ebdbc8f8647',
      configFile: '',
    });

    expect(changelog).toMatchSnapshot();
  });
});
