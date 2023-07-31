module.exports = {
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: './public/images/:path*',
      },
      {
        source: '/layout/css/:path*',
        destination: './public/layout/css/:path*',
      },
      {
        source: '/layout/javascript/:path*',
        destination: './public/layout/javascript/:path*',
      },
    ];
  },
};
