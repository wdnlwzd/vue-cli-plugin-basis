module.exports = (api, opts = {}) => {
  api.injectImports(api.entryFile, `import Element from 'element-ui';`);

  api.render('./template');
}
