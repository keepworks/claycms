Clay CMS
=====================

### Dependencies

- [Yarn](https://yarnpkg.com/en/docs/install)
- [ImageOptim](https://imageoptim.com/mac)

### Installation

1. Copy and modify the .env file: `cp .env.example .env`
2. Run `yarn install` to install npm dependencies.
3. Edit your hosts file (`subl /etc/hosts`) and add: `127.0.0.1 claycms-dev.io`
4. Run `yarn start` to start the development web server.

### Profiling

We use the [Webpack Bundle Analyzer](https://github.com/th0r/webpack-bundle-analyzer) plugin to identify bundle size issues. To use, either:

1. Use the `PROFILE` environment variable

    ```
    PROFILE=true yarn start
    ```

2. Use the `profile` npm script

    ```
    yarn run profile
    ```

Note that this plugin needs to run against the production build to determine 'parsed' and 'gzipped' sizes.

### List of Screen Resolutions (width x height)

  * 24 inch Desktop - 1920 x 1050
  * 15 inch Laptop - 1400 x 710
  * 13 inch Laptop - 1280 x 650
