import { defineConfig } from 'umi';
import theme from '../src/theme';
import routes from './routes';
import proxy from './proxy';
const isSourceMapEnabled = process.env.NODE_ENV !== 'production' || process.argv.indexOf('--sourcemap') !== -1;

const config = defineConfig({
  routes,
  nodeModulesTransform: {
    type: 'none'
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  devtool: isSourceMapEnabled ? 'source-map' : false,
  chainWebpack: function(config: any, { webpack }: any) {
    if (process.env.NODE_ENV === 'production') {
      config.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              reactVendor: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'reactVendor',
                enforce: true,
                priority: 5,
              },
              antd: {
                test: /[\\/]node_modules[\\/](antd)[\\/]/,
                name: 'antd',
                enforce: true,
                priority: 4,
              },
              umiVendor: {
                test: /[\\/]node_modules[\\/](umi).*[\\/]/,
                name: 'umiVendor',
                enforce: true,
                priority: 3,
              },
              // dzgVendors: {
              //   name: 'dzgVendors',
              //   enforce: true,
              //   priority: 2,
              //   test: /[\\/]node_modules[\\/](@dzg)[\\/]/,
              // },
              vendors: {
                name: 'vendors',
                enforce: true,
                priority: 1,
                test: /[\\/]node_modules[\\/]((?!(@dzg|antd|react|react-dom|umi)).*)[\\/]/,
              },
              default: {
                test: /[\\/]src[\\/]((?!(pages)).*)[\\/]/,
                name: 'default',
                enforce: true,
              },
            },
          },
        },
      });
    }
  },
  antd: {},
  title: 'dzg-learn',

  locale: {

    antd: true,
    default: 'zh-CN',
    baseNavigator: true,
  },
  chunks:
    process.env.NODE_ENV === 'production' ? [
      'reactVendor', 
      'antd', 
      'umiVendor', 
      // 'dzgVendors', 
      'vendors', 
      'default', 
      'umi'
    ]
    : ['umi'],
  history: { type: 'hash' },
  hash: true,
  publicPath: '/dzg-learn/',
  proxy,
  ignoreMomentLocale: true,
  copy: ['static'],
    theme: theme,
  mountElementId: 'dzg-learn',
});

export default config;
