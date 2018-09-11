module.exports = (api, opts = {}) => {
  if (opts.ui === 'element-ui') {
    api.injectImports(api.entryFile, `import './plugins/element-ui'`);
    // api.render('./plugins/template/src/plugins/element-ui', opts);
    api.render({
      [`src/plugins/element-ui.js`]: './plugins/template/src/plugins/element-ui.js',
    }, opts);
  }

  api.injectImports(api.entryFile, `import API from './api';`);
  api.injectImports(api.entryFile, `import * as consts from './utils/consts';`);
  api.injectImports(api.entryFile, `import './utils/compatible-ie';`);
}
