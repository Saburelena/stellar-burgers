const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
      '@ui-pages': path.resolve(__dirname, 'src/components/ui/pages'),
      '@utils-types': path.resolve(__dirname, 'src/utils/types'),
      '@api': path.resolve(__dirname, 'src/utils/burger-api.ts'),
      '@slices': path.resolve(__dirname, 'src/slices'),
      '@selectors': path.resolve(__dirname, 'src/services/selectors')
    }
  }
};
