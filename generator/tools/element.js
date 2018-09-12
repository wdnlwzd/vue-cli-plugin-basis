const helpers = require('../utils/helpers');

module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'element-ui': '^2.4.6',
    }
  });

  if (opts.import === 'partial') {
    api.extendPackage({
      devDependencies: {
        'babel-plugin-component': '^1.1.1'
      }
    })
  }

  api.injectImports(api.entryFile, `import './plugins/element';`);
  api.render({
    ['./src/plugins/element.js']: '../plugins/template/src/plugins/element.js',
  }, { opts });

  api.onCreateComplete(() => {
    if (opts.import === 'partial') {
      helpers.updateBabelConfig(api, cfg => {
        const pluginComponent = ['component', {
          'libraryName': 'element-ui',
          'styleLibraryName': 'theme-chalk'
        }]
        cfg.plugins = cfg.plugins || []
        cfg.plugins.push(pluginComponent)
        return cfg;
      });
    }
  });
};
