/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ['.*'],
  serverDependenciesToBundle: [
    //   "../packages/prisma-client",
    //   "@xbo/prisma-client"
    '@xbo/common',
    '../packages/common',
  ],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  // devServerPort: 8002
}
