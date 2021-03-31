# Generic Conventional Changelog GitHub Action

<a href="https://github.com/dlavrenuek/conventional-changelog-action/actions"><img alt="javscript-action status" src="https://github.com/dlavrenuek/conventional-changelog-action/workflows/development/badge.svg"></a>

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

  - uses: dlavrenuek/conventional-changelog-action@v1.1.0
    id: changelog
    with:
      from: v1.0.0
      to: HEAD
```

The changelog can be accessed in other steps by `${{ steps.changelog.outputs.body }}`

### Input Variables

Inputs available through `with`:

| Input       | Description                                                      | Required |
| ----------- | ---------------------------------------------------------------- | -------- |
| from        | Commit SHA, tag or reference as starting point for the changelog | ✔        |
| to          | Commit SHA, tag or reference as ending point for the changelog   | ✔        |
| config-file | Path to the configuration file to override default configuration |          |

The default configuration can be found in [`defaultConfig.json`](https://github.com/dlavrenuek/conventional-changelog-action/master/src/defaultConfig.json)

### Output Variables

Inputs available through `outputs`:

| Output | Description                                          |
| ------ | ---------------------------------------------------- |
| body   | The changelog body                                   |
| bump   | Recommended bump based on the provided configuration |

### Complete workflow

A complete workflow for creating a draft release can be found [here](https://github.com/dlavrenuek/conventional-changelog-action/blob/master/.github/workflows/draft-release.yml).

### Example output

```markdown
## ⚡️ Breaking Changes

- finalize v1 release ([#5](https://github.com/dlavrenuek/conventional-changelog-action/issues/5))

## 🚀 New Features

- Add a feature

## 💊 Bugfixes

- fix some bug
- fix another bug

## 🧹 Chore

- add deps-dev as commit scope
```

## Contribute

If you want to contribute, feel free to [open an issue](https://github.com/dlavrenuek/conventional-changelog-action/issues) or a [pull request](https://github.com/dlavrenuek/conventional-changelog-action/pulls).
