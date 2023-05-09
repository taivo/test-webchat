// /** @type {import('next').NextConfig} */
const withBundleAnalyzer = bundleAnalyzerSetup({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  outputDir: 'analyze'
})

const nextConfig = withBundleAnalyzer({
  experimental: {
    appDir: true,
  }
})

module.exports = nextConfig

// like @next/bundle-analyzer but allow passing in more in webpack-bundle-analyzer args
function bundleAnalyzerSetup({ enabled = true, openAnalyzer = true, outputDir = null} = {}) {
  return (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack(config, options) {
        if (enabled) {
          const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

          const dotNextDir = !options.nextRuntime ? './' : (options.nextRuntime==='nodejs' ? '../../' : '../')
          const reportDir = `${dotNextDir}${outputDir ? '../' + outputDir : 'analyze'}`
          const runtime = options.nextRuntime ?? 'client'
          const reportFilename = `${reportDir}/${runtime}.html`
          //const statsFilename = `${reportDir}/${runtime}-stats.json`

          config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer,
              reportFilename,
              //generateStatsFile: true,
              //statsFilename
            })
          )
        }

        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, options)
        }
        return config
      },
    })
  }
}