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
    ],
  },    

}

module.exports = nextConfig
