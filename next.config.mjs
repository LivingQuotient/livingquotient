import { withContentlayer } from 'next-contentlayer';
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['@xata.io/client']
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  }
};

export default withContentlayer(nextConfig);
