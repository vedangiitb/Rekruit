import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Interview from './Interview';
import AcessDenied from '../../Pages/AccessDenied';
import LoadingScreen from '../../Pages/Loading';

export default function InterviewWrapper({ user }) {
    const { id } = useParams();

    const [allowed, setAllowed] = useState(null);

    const [isInterviewer, setIsInterviewer] = useState(false)

    useEffect(() => {
        const checkAllowed = async () => {
            try {
                const response1 = await fetch(`https://2ur410rhci.execute-api.us-east-1.amazonaws.com/dev/get-interview?id=${id}`);
                const response2 = await fetch('https://cognito-idp.us-east-1.amazonaws.com/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-amz-json-1.1',
                        'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser'
                    },
                    body: JSON.stringify({
                        "AccessToken": user.storage['CognitoIdentityServiceProvider.559co16dlu99kleqa9lrvj4q09.' + user.username + '.accessToken']
                    })
                });

                if (!response1.ok && !response2.ok) {
                    setAllowed('false');
                } else {
                    const resp = await response1.json();
                    const resp2 = await response2.json();
                    let allowedInterviewers = resp.Items[0].interviewers;
                    let allowedAdmins = [resp.Items[0].owner];
                    let allowedCandidates = [resp.Items[0].candidate];
                    console.log(allowedCandidates)
                    const allowedIds = [...allowedAdmins, ...allowedCandidates, ...allowedInterviewers];
                    const attributes = resp2.UserAttributes;
                    const userId = attributes[0].Value
                    console.log(allowedIds);
                    console.log(userId);
                    if (allowedIds && userId && allowedIds.includes(userId)) {
                        if (allowedInterviewers.includes(userId) || allowedAdmins.includes(userId)) {
                            setIsInterviewer(true)
                        }
                        setAllowed('true')
                    } else {
                        setAllowed('false');
                    }
                }
            } catch (error) {
                console.log(error);
                setAllowed('false');
            }
        };
        if (id && user) {
            checkAllowed();
        }
    }, [user, id]);


    if (allowed === null) {
        return <LoadingScreen/>
    }
    else if (allowed == 'true') {
        return <Interview user={user} isInterviewer={isInterviewer} />
    } else {
        return <AcessDenied user={user} />
    }
};