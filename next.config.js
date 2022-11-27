// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   compiler: {
//     styledComponents: true,
//   },
// };

// module.exports = nextConfig;

module.exports = {
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: {
      displayName: true,
      ssr: false,
    },
  },
};
