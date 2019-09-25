
import path from 'path';

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
    "@border-color": "#ebedf0",
    "vh1": "1vh",
    "vh2": "2vh",
    "vh3": "3vh",
    "vh4": "4vh",
    "vh5": "5vh",
    "vh6": "6vh",
    "vh7": "7vh",
    "vh8": "8vh",
    "vh9": "9vh",
    "vh10": "10vh",
  },
  alias: {
    // assets: path.resolve(__dirname, 'src/assets/'),
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils/'),
  },
}
