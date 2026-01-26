// src/api/auth/cognito.js
import {
  signUp as amplifySignUp,
  signIn as amplifySignIn,
  getCurrentUser as amplifyGetCurrentUser,
  signOut as amplifySignOut,
  fetchUserAttributes as amplifyFetchUserAttributes,
} from 'aws-amplify/auth';

export async function signUp({ firstName, lastName, email, phone, password }) {
  try {
    // Basic phone number formatting to ensure E.164 compliance if not already present
    // This assumes the user inputs a number that just needs a country code or is plain digits
    // Ideally, UI should handle this
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;

    const { isSignUpComplete, userId, nextStep } = await amplifySignUp({
      username: email,
      password,
      options: {
        userAttributes: {
          given_name: firstName,
          family_name: lastName,
          email,
          phone_number: formattedPhone, // Must be in E.164 format
          'custom:is_onboarded': 'false'
        },
        autoSignIn: false, // optional
      },
    });

    return { success: true, data: { isSignUpComplete, userId, nextStep } };
  } catch (error) {
    let message = error.message || 'Something went wrong';
    if (error.name === 'UsernameExistsException') message = 'Email already exists';
    if (error.name === 'InvalidPasswordException') message = 'Password does not meet requirements';
    if (error.name === 'InvalidParameterException') message = 'Invalid input parameters';

    console.log('SignUp Error:', error);
    return { success: false, error: message };
  }
}

export async function signIn({ email, password }) {
  try {
    const { isSignedIn, nextStep } = await amplifySignIn({ username: email, password });
    return { success: true, data: { isSignedIn, nextStep } };
  } catch (error) {
    let message = error.message || 'Something went wrong';
    if (error.name === 'UserNotConfirmedException') message = 'User is not confirmed';
    if (error.name === 'NotAuthorizedException') message = 'Incorrect username or password';

    console.log('SignIn Error:', error);
    return { success: false, error: message };
  }
}

export async function getCurrentUser() {
  try {
    const user = await amplifyGetCurrentUser();
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function signOut() {
  try {
    await amplifySignOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function fetchUserDetails() {
  try {
    const user = await amplifyFetchUserAttributes();
    console.log('user', JSON.stringify(user, null, 2));
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}