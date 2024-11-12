module.exports = [
  {
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    // test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
    test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/,
    use: ['file-loader', 'url-loader'],
  //   loader: "url-loader",
  //   options: { limit: false },
  // },
  // {
  //   test: /\.(png|jpe?g|gif)$/i,
  //   use: [
  //     {
  //       loader: 'file-loader',
  //     },
  //   ],
  },
  {
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader'],
  }
];