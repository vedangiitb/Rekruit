import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { poolData } from '../../../cognitoConfig';
// Initialize the User Pool
const userPool = new CognitoUserPool(poolData);

export const signUpUser = (email, name, password) => {
    const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
        new CognitoUserAttribute({ Name: 'name', Value: name }),
        new CognitoUserAttribute({ Name: 'address', Value: 'none' }),
        new CognitoUserAttribute({ Name: 'birthdate', Value: '2024-01-01' }),
        new CognitoUserAttribute({ Name: 'website', Value: 'none' }), // Custom attribute
        new CognitoUserAttribute({ Name: 'custom:companyName', Value: 'none' }), // Custom attribute
        new CognitoUserAttribute({ Name: 'custom:companyIndustry', Value: 'none' }),
        new CognitoUserAttribute({ Name: 'custom:companySize', Value: '1' }),
        new CognitoUserAttribute({ Name: 'custom:jobTitle', Value: 'none' }),
        new CognitoUserAttribute({ Name: 'custom:acctType', Value: 'User' })
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
