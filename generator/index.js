const updatePremain = require('./pre-main');
const updateMain = require('./main');
const updateFiles = require('./utils/files');
const updateEslintrc = require('./utils/eslintrc');
const prettier = require('prettier');

module.exports = (api, opts, rootOptions) => {
  api.render('./template', opts);

  api.extendPackage({
    dependencies: {
      'element-ui': '^2.4.6',
      'vue-resource': '^1.5.1',
    },
    devDependencies: {

    },
  });

  console.log('opts', opts);
  updatePremain(api, opts);
  if (opts.i18n !== 'none') {
    require('./plugins/i18n')(api, opts, rootOptions);
  }

  opts.hamlet && require('./tools/vue-hamlet')(api, opts);
  opts.moment && require('./tools/moment')(api);
  api.onCreateComplete(() => {
    // update main.js
    updateMain(api);

    // update .eslintrc.js
    updateEslintrc(api);
  });

  if (api.invoking) {
    api.postProcessFiles(files => {
      // updateFiles(api, opts, files);

      // console.log('files', Object.keys(files));
      files['src/main.js'] = prettier.format(files['src/main.js'], {
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        parser: 'babylon',
        trailingComma: 'all',
      });
      const needDeleteFiles = [
        'router.js',
        'store.js',
        'views/About.vue',
        'views/Home.vue',
      ];
      needDeleteFiles.forEach(name => {
        delete files[`src/${name}`];
      });
    });
  }
}
