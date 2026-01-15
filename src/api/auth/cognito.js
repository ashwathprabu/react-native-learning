import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'YOUR_REGION',
    userPoolId: 'YOUR_POOL_ID',
    userPoolWebClientId: 'YOUR_CLIENT_ID',
  },
});
