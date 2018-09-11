module.exports = (api, opts = {}) => {
  if (opts.ui === 'element-ui') {
    api.injectImports(api.entryFile, `import './plugins/element-ui'`);
  }

  api.injectImports(api.entryFile, `import API from './api';`);
  api.injectImports(api.entryFile, `import * as consts from './utils/consts';`);
  api.injectImports(api.entryFile, `import './utils/compatible-ie';`);
}
