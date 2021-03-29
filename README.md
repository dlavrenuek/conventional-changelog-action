# Generic Conventional Changelog GitHub Action

<a href="https://github.com/dlavrenuek/conventional-changelog-action/actions"><img alt="javscript-action status" src="https://github.com/dlavrenuek/conventional-changelog-action/workflows/unit-test/badge.svg"></a>

This GitHub action generates a changelog from git history using conventional commits without any other
requirements on your project versioning or labeling. It is intended to be used with other actions to make use of the
generated changelog.

## Example Usage

This example generates a changelog from the tag `v1.0.0` to HEAD

```yaml
steps:
  - uses: actions/checkout@v2
    with:
      fetch-depth: 0

  - uses: dlavrenuek/conventional-changelog-action
    id: changelog
    with:
      from: v1.0.0
      to: HEAD
```

The changelog can be accessed in other steps by `${{ steps.changelog.outputs.body }}`

### Input Variables

Inputs available through `with`:

| Input | Description | Required |
| ----- | ----------- | -------- |
| from | Commit SHA, tag or reference as starting point for the changelog | ✔ |
| to | Commit SHA, tag or reference as ending point for the changelog | ✔ |
| config-file | Path to the configuration file to override default configuration |  |

The default configuration can be found in [`defaultConfig.json`](https://github.com/dlavrenuek/conventional-changelog-action/master/src/defaultConfig.json)

### Output Variables

Inputs available through `outputs`:


| Output | Description |
| ----- | ----------- |
| body | The changelog body |
| bump | Recommended bump based on the provided configuration |
