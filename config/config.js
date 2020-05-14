/* import MBPageRoutes from './mbRouter.config'; */
import MBPageRoutes from './router.config';

export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      dll: true,
      fastClick: false,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ]
      },
      title: {
        defaultTitle: '亚冠体育',
      },
    }],
  ],
  // 路由配置
  routes: MBPageRoutes,
  history: 'browser',
  hash: true,
 /* proxy: {
    "/test": {
      "target": "http://35.229.133.12:8090",
      "changeOrigin": true,
      "pathRewrite": { "^/test" : "/api/v1" }
    }
  }, */
}
