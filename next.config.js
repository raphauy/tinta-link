/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,    
  },  
  images: {    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        port: "",
      },      
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
        port: "",
      },      
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },      
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },      
    ],
  },    

}

module.exports = nextConfig
