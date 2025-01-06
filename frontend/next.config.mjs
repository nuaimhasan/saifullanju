const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.saifullanju.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    PORT: process.env.PORT || 2500,
  },
};

export default nextConfig;
