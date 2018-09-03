module.exports = (api, opts = {}) => {
  api.injectImports(api.entryFile, `import API from './api';`);
}
