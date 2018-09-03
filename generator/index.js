const updateMain = require('./main');
const updateFiles = require('./tools/files');

module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'element-ui': '^2.4.6',
      'vue-resource': '^1.5.1',
    },
    devDependencies: {

    },
  });


  api.onCreateComplete(() => {
    // update main.js
    // api.injectImports(api.entryFile, `import Element from 'element-ui';`);
    updateMain(api, opts);
  });

  api.render('./template');

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
