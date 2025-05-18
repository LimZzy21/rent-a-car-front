import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler:{
    styledComponents:true
  },
  images: {
    domains: ['rent-a-car-uploads.s3.amazonaws.com']
  }
};

export default nextConfig;
