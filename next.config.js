/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    apiKey: process.env.FIREBASE_APPKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID,
  },
};

module.exports = nextConfig;
