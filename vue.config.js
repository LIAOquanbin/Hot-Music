const path = require("path");
module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "src/scss/*.scss")]
    }
  },
  // devServer: {
  //   proxy: {
  // //   //   // "/api2": {
  // //   //   //   target: "http://localhost:3000",
  // //   //   //   changeOrigin: true
  // //   //   // },
  //     "/api": {
  //       target: "https://api.imjad.cn",
  //       changeOrigin: true,
  //       '^api':'api'
  //     }
  //   }
  // }
};
