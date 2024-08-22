import { CognitoUser,CognitoUserPool } from 'amazon-cognito-identity-js';
import { poolData } from '../../../cognitoConfig';

// Initialize the User Pool
const userPool = new CognitoUserPool(poolData);

export const logout = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    return new Promise((resolve, reject) => {
      cognitoUser.signOut();
      resolve();
    });
  } else {
    return Promise.resolve();
  }
};