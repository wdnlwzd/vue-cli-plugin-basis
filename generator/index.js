const updateMain = require('./main');
const updateFiles = require('./tools/files');

module.exports = (api, opts) => {
  api.render('./template');

  api.extendPackage({
    dependencies: {
      'element-ui': '^2.4.6',
      'vue-resource': '^1.5.1',
    },
    devDependencies: {

    },
  });


  console.log('opts', opts);
  // api.injectImports(api.entryFile, `import Element from 'element-ui';`);
  if (opts.i18n) {
    require('./i18n')(api, opts);
  }

  api.onCreateComplete(() => {
    // update main.js
    updateMain(api, opts);
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
