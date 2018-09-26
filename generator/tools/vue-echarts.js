module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      'vue-echarts': '^3.1.3',
    },
  });

  const files = {
    './src/plugins/echarts.js': '../plugins/echarts/index.js',
  };

  api.render(files, { opts });
  api.injectImports(api.entryFile, "import './plugins/echarts';");
};
