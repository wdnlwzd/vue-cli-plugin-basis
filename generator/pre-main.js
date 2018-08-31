module.exports = (api, opts = {}) => {
  api.injectImports(api.entryFile, `import Element from 'element-ui';`);
  api.injectImports(api.entryFile, `import 'element-ui/lib/theme-chalk/index.css';`);

  api.render('./template');
}
