/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  async headers() {
    return [
      { 
        source: "/api/auth/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin",value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT"}, 
	      ],
      },{ 
        source: "/",
        headers: [
          { key: "Access-Control-Allow-Origin",value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET"}, 
	      ],
      },
    ];
  },
  async rewrites(){
    return [
      {
        source: '/api:path*',
        destination: 'http://localhost:3001/api/path*'
      }
    ]
  }
};

module.exports = nextConfig;
