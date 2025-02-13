// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "storage.cloud.google.com",
//       },
//       {
//         protocol: "https",
//         hostname: "storage.googleapis.com",
//       },
//     ],
//   },
// };

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "storage.cloud.google.com",
//       },
//       {
//         protocol: "https",
//         hostname: "storage.googleapis.com",
//       },
//     ],
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.cloud.google.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      net: false,
      fs: false,
      child_process: false,
    };
    return config;
  },
};

export default nextConfig;
