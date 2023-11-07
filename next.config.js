/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [
      'objectstorage.sa-saopaulo-1.oraclecloud.com'
    ]
  },
  eslint: {
    dirs: ["/src/client", "/src/app", "/src/shared"]
  }
}