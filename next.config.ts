import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@meshsdk/core",
    "@meshsdk/common",
    "@meshsdk/wallet",
    "@meshsdk/transaction"
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "node:buffer": "buffer",
        "node:crypto": "crypto-browserify",
        "node:process": "process/browser"
      };

      config.resolve.fallback = {
        ...config.resolve.fallback,
        assert: require.resolve("assert/"),
        buffer: require.resolve("buffer/"),
        crypto: require.resolve("crypto-browserify"),
        events: require.resolve("events/"),
        fs: false,
        net: false,
        process: require.resolve("process/browser"),
        stream: require.resolve("stream-browserify"),
        tls: false,
        util: require.resolve("util/")
      };

      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
          resource.request = resource.request.replace(/^node:/, "");
        }),
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser"
        })
      );
    }

    return config;
  }
};

export default nextConfig;
