// src/config/cognito.js
import { Amplify } from 'aws-amplify';
import Config from 'react-native-config';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: Config.COGNITO_USER_POOL_ID,
      userPoolClientId: Config.COGNITO_USER_POOL_CLIENT_ID,
    },
  },
});
