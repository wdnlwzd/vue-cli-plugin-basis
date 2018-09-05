const updatePremain = require('./pre-main');
const updateMain = require('./main');
const updateFiles = require('./tools/files');
const vueHamlet = require('./tools/vue-hamlet');

module.exports = (api, opts, rootOptions) => {
  api.render('./template');

  api.extendPackage({
    dependencies: {
      'element-ui': '^2.4.6',
      'vue-resource': '^1.5.1',
      'moment': '^2.22.2',
    },
    devDependencies: {

    },
  });


  console.log('opts', opts);
  updatePremain(api, opts);
  if (opts.i18n) {
    require('./i18n')(api, opts, rootOptions);
  }

  if (1 || opts.hamlet) {
    vueHamlet(api, opts);
  }

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
