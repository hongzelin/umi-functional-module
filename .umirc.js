
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'umi-test',
      // dll: true,
      routes: {
        exclude: [],
      },
      hardSource: true,
    }],
  ],
  "proxy": {
    "/apis": {
      // "target": "https://jsonplaceholder.typicode.com/",
      "target": "http://localhost:8099/",
      "changeOrigin": true,
      // "pathRewrite": { "^/apis": "" }
    }
  },
  theme: {
    // "@primary-color": "#30b767"
    "@primary-color": "#1890FF",
    "@border-color": "#ebedf0"
  }
}
