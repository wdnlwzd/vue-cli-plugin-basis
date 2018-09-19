const helpers = require('../utils/helpers');
const polyfill = require('../utils/polyfill');
const alaCarte = require('../utils/alaCarte');
const fonts = require('./fonts');

function addAbsoluteImports(lines) {
  let lastImportIndex = lines.findIndex(line => line.match(/^import Vue/));
  lines.splice(lastImportIndex += 1, 0, `import '@babel/polyfill';`);
  return lines;
}

module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      vuetify: '^1.2.3',
    },
    devDependencies: {

    },
  });

  polyfill.addDependencies(api);
  opts.import === 'partial'&& alaCarte.addDependencies(api)
  opts.installFonts && fonts.addDependencies(api, opts.iconFont);
  opts.installFonts && fonts.addImports(api, opts.iconFont);

  api.injectImports(api.entryFile, `import './plugins/vuetify';`);
  const files = {
    './src/plugins/vuetify.js': '../plugins/vuetify/index.js',
    './src/components/snackbar/index.js': '../plugins/vuetify/components/snackbar/index.js',
    './src/components/snackbar/src/main.js': '../plugins/vuetify/components/snackbar/src/main.js',
    './src/components/snackbar/src/Main.vue': '../plugins/vuetify/components/snackbar/src/Main.vue',
  };

  api.render(files, { opts });
  if (opts.customTheme) {
    const files = {
      './src/stylus/main.styl': '../plugins/vuetify/template/stylus/main.styl',
    };

    api.render(files, opts);
    api.extendPackage({
      dependencies: {

      },
      devDependencies: {
        'css-loader': '^1.0.0',
        'stylus': '^0.54.5',
        'stylus-loader': '^3.0.2',
      },
    });
  }

  api.onCreateComplete(() => {
    polyfill.updateBabelConfig(api);
    polyfill.updateBrowsersList(api);
    polyfill.addImports(api);
    opts.import === 'partial' && alaCarte.updateBabelConfig(api)
    !opts.installFonts && fonts.addLinks(api, opts.iconFont);
  });
};
