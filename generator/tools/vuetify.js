const helpers = require('../utils/helpers');
const polyfill = require('../utils/polyfill');
const fonts = require('./fonts');

function addAbsoluteImports(lines) {
  let lastImportIndex = lines.findIndex(line => line.match(/^import Vue/));
  lines.splice(lastImportIndex += 1, 0, `import '@babel/polyfill';`);
  return lines;
}

module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'vuetify': '^1.2.3',
    },
    devDependencies: {

    },
  });

  polyfill.addDependencies(api);
  opts.installFonts && fonts.addDependencies(api, opts.iconFont);
  opts.installFonts && fonts.addImports(api, opts.iconFont);

  api.injectImports(api.entryFile, `import './plugins/vuetify';`);
  api.render({
    ['./src/plugins/vuetify.js']: '../plugins/template/src/plugins/vuetify.js',
  }, { opts });

  if (opts.customTheme) {
    api.render({
      './src/stylus': '../plugins/vuetify/template/stylus',
    });
    api.extendPackage({
      dependencies: {

      },
      devDependencies: {
        'css-loader': '^1.0.0',
        // 'style-loader': '^0.23.0',
        'stylus': '^0.54.5',
        'stylus-loader': '^3.0.2',
      },
    });
  }

  api.onCreateComplete(() => {
    polyfill.updateBabelConfig(api);
    polyfill.updateBrowsersList(api);
    polyfill.addImports(api);
    !opts.installFonts && fonts.addLinks(api, opts.iconFont);
  });
};
