import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { poolData } from '../../../cognitoConfig';
// Initialize the User Pool
const userPool = new CognitoUserPool(poolData);

export const signUp = (email, name, password, address, birthdate, companyName, website, companySize, companyIndustry, jobTitle) => {
  const attributeList = [
    new CognitoUserAttribute({ Name: 'email', Value: email }),
    new CognitoUserAttribute({ Name: 'name', Value: name }),
    new CognitoUserAttribute({ Name: 'address', Value: address }),
    new CognitoUserAttribute({ Name: 'birthdate', Value: birthdate }),
    new CognitoUserAttribute({ Name: 'website', Value: website }), // Custom attribute
    new CognitoUserAttribute({ Name: 'custom:companyName', Value: companyName }), // Custom attribute
    new CognitoUserAttribute({ Name: 'custom:companyIndustry', Value: companyIndustry }),
    new CognitoUserAttribute({ Name: 'custom:companySize', Value: companySize }),
    new CognitoUserAttribute({ Name: 'custom:jobTitle', Value: jobTitle }),
    new CognitoUserAttribute({ Name: 'custom:acctType', Value: 'Admin' })
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(name, password, attributeList, null, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
