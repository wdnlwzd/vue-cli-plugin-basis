module.exports = (api, opts = {}) => {

  api.injectImports(api.entryFile, `import API from './api';`);
  api.injectImports(api.entryFile, `import * as consts from './utils/consts';`);
  api.injectImports(api.entryFile, `import './utils/compatible-ie';`);
}
