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
  });

  polyfill.addDependencies(api);
  opts.installFonts && fonts.addDependencies(api, opts.iconFont);
  opts.installFonts && fonts.addImports(api, opts.iconFont);

  api.injectImports(api.entryFile, `import './plugins/vuetify';`);
  api.render({
    ['./src/plugins/vuetify.js']: '../plugins/template/src/plugins/vuetify.js',
  }, { opts });

  api.onCreateComplete(() => {
    polyfill.updateBabelConfig(api);
    polyfill.updateBrowsersList(api);
    polyfill.addImports(api);
    !opts.installFonts && fonts.addLinks(api, opts.iconFont);
  });
};
