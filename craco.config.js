module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
        if (rule.oneOf) {
          rule.oneOf = rule.oneOf.filter((r) => {
            return !(r.loader && r.loader.includes('source-map-loader'));
          });
        }
        return rule;
      });
      return webpackConfig;
    },
  },
};