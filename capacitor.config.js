// import type { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'com.trackwise.www',
//   appName: 'TrackWise',
//   webDir: 'build'
// };

// export default config;


const config = {
  appId: 'com.trackwise.www',
  appName: 'TrackWise',
  webDir: 'build',
  server: {
    // For development
    url: 'https://track-wise-ten.vercel.app',
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
