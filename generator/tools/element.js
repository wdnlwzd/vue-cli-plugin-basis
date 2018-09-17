const helpers = require('../utils/helpers');

module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'element-ui': '^2.4.6',
    },
  });

  if (opts.import === 'partial') {
    api.extendPackage({
      devDependencies: {
        'babel-plugin-component': '^1.1.1',
      },
    });
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
          'styleLibraryName': 'theme-chalk',
        }];

        cfg.plugins = cfg.plugins || [];

        // Prevent duplication
        for (let i = 0, len = cfg.plugins.length; i < len; i += 1) {
          const temp = cfg.plugins[i];
          if (temp[0] === 'component' &&
            temp[1] &&
            temp[1].libraryName === 'element-ui' &&
            temp[1].styleLibraryName) {
            return cfg;
          }
        }

        cfg.plugins.push(pluginComponent);
        return cfg;
      });
    }
  });
};
