<div align="center">
# :atom_symbol: create-sumup-react-app :atom_symbol:

The easiest way to get started writing a React app with SumUp's standard frontend toolchain.
</div>

## Prerequisites

- You should have Node.js installed at a version equal or above v9.10.0. If you cannot to that, see the Troubleshooting section for ways around this requirement.
- At the moment this project reqires `yarn` to be installed on your system. Yarn is a package manager for JavaScript. You can read how to install the Yarn CLI in [their documentation](https://yarnpkg.com/en/docs/install).

## Setting up a new SumUp React project

1. Open your terminal.
2. Navigate to the directory you would like to place your project in.
3. Run `yarn create sumup-react-app {my-app}` where `my-app` is the name of your project.

This will create the folder `my-app` and initialize a new project inside. The project will be base on [`create-react-app`](https://github.com/facebook/create-react-app) and will use the SumUp's [`Circuit UI`](https://circuit.sumup.com/#/) component library and [Foundry](https://github.com/sumup/foundry) toolkit.

## Development workflow

### Firing up the tools

### Adding a new component

## Useful resources

- The [docs](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents) for `create-react-app` have contain a lot of solutions for common problems when writing a React application.
- Foundry [docs](https://github.com/sumup/foundry#table-of-contents).
- Circuit UI [docs](https://circuit.sumup.com/#/) and [storybook](https://circuit.sumup.com/storybook/).

## Troubleshooting

### Engine node is incompatible
```
error eslint@5.0.1: The engine "node" is incompatible with this module. Expected version "^6.14.0 || ^8.10.0 || >=9.10.0".
error Found incompatible module
```

Use a version of node that is compatible with ESLint. This is easy to accomplish with [nvm](https://github.com/creationix/nvm).

### Error watching file for changes
```
2017-05-02 09:49 node[8980] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2017-05-02 09:49 node[8980] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2017-05-02 09:49 node[8980] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
events.js:163
      throw er; // Unhandled 'error' event
      ^

Error: Error watching file for changes: EMFILE
    at exports._errnoException (util.js:1050:11)
    at FSEvent.FSWatcher._handle.onchange (fs.js:1376:11)
error Command failed with exit code 1.
```

Make sure you have watchman installed.

```
brew install watchman
```
