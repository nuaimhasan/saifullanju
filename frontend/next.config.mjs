const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.saifullanju.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  env: {
    PORT: process.env.PORT || 2550,
  },
};

export default nextConfig;
