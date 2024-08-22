import { CognitoUser,CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { poolData } from '../../../cognitoConfig';

// Initialize the User Pool
const userPool = new CognitoUserPool(poolData);

export const login = (email, password) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};
