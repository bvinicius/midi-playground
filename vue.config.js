module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .loader("ts-loader")
      .tap((options) => {
        return options;
      });
  },
};
