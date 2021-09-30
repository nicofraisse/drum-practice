const path = require('path')

module.exports = {
  webpack: (config, options) => {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['context'] = path.join(__dirname, 'context')
    config.resolve.alias['data'] = path.join(__dirname, 'data')
    config.resolve.alias['lib'] = path.join(__dirname, 'lib')
    config.resolve.alias['styles'] = path.join(__dirname, 'styles')
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      include: [options.dir],
      exclude: /node_modules/,
      use: [
        {
          loader: 'graphql-tag/loader'
        }
      ]
    })
    return config
  }
}
