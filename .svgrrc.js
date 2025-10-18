module.exports = {
  typescript: true,

  native: true,
  
  plugins: [
    '@svgr/plugin-svgo', 
    '@svgr/plugin-jsx',
  ],

  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
      },
      'removeXMLNS',
    ],
  },
};