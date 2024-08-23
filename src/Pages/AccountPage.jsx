import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignInPage from "./SigninPage";
import { toast } from "react-toastify";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Styles/AccountPage.css';
import {Amplify } from 'aws-amplify';
import { poolData } from "../cognitoConfig";


Amplify.configure(poolData);


export default function AccountPage({ user, logoutUser, loginUser }) {
    const [currentUser, setCurrentUser] = useState(user);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [interviewsByDate, setInterviewsByDate] = useState({});
    const [email, setEmail] = useState('Fetching data...');
    const [accountVerified, setAccountVerified] = useState('Fetching data...');
    const [name, setName] = useState('Fetching data...');
    const [address, setAddress] = useState('Fetching data...');
    const [website, setWebsite] = useState('Fetching data...');
    const [companyName, setCompanyName] = useState('Fetching data...');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
        if (user && user.interviewList && user.interviewTimeList && user.interviewLinkList) {
            const interviews = user.interviewList.reduce((acc, interviewId, index) => {
                const date = new Date(user.interviewTimeList[index]);
                const link = user.interviewLinkList[index]
                const dateString = date.toISOString().split('T')[0]; // 'YYYY-MM-DD' format
                if (!acc[dateString]) {
                    acc[dateString] = [];
                }
                acc[dateString].push({
                    id: interviewId,
                    link: link,
                    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                });
                return acc;
            }, {});
            setInterviewsByDate(interviews);
        }
    }, [user]);


    useEffect(() => {
        const getUserData = async () => {

            if (user && user.storage) {
                const response = await fetch('https://cognito-idp.us-east-1.amazonaws.com/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-amz-json-1.1',
                        'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser',
                        'Authorization': user.storage[user.userDataKey.slice(0, -8) + 'idToken']
                    },
                    body: JSON.stringify({
                        "AccessToken": user.storage['CognitoIdentityServiceProvider.559co16dlu99kleqa9lrvj4q09.' + user.username + '.accessToken']
                    })
                });

                const resp = await response.json();

                // const token = await Auth.currentSession();


                // const authToken = (await fetchUserAttributes())
                // console.log(authToken)

                const attributes = resp.UserAttributes;
                setEmail(attributes[0].Value)
                setAccountVerified(attributes[1].Value)
                setAddress(attributes[3].Value)
                setCompanyName(attributes[10].Value)
                setWebsite(attributes[4].Value)
                setName(attributes[2].Value)

                if (attributes[0].Value) {
                    const response = await fetch(`https://2ur410rhci.execute-api.us-east-1.amazonaws.com/dev/get-user-interviews?id=${attributes[0].Value}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': user.storage[user.userDataKey.slice(0, -8) + 'idToken']
                        }
                    });

                    const data = await response.json();

                    if (data && data.Items) {
                        const interviews = data.Items.reduce((acc, interview, index) => {
                            const date = new Date(interview.date);
                            const dateString = date.toISOString().split('T')[0]; // 'YYYY-MM-DD' format
                            if (!acc[dateString]) {
                                acc[dateString] = [];
                            }
                            acc[dateString].push({
                                id: interview.intName,
                                link: interview.id,
                                time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            });
                            return acc;
                        }, {});
                        setInterviewsByDate(interviews);
                    }
                }
            }
        }
        getUserData();
    }, [user])

    const logout = async () => {
        try {
            logoutUser().then(() => {
                setCurrentUser(null);
                toast.success('Logged out!');
                navigate('/');
            }).catch(err => {
                console.error('Error logging out', err)
            });

        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const onDateChange = date => {
        setSelectedDate(date);
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            return interviewsByDate[dateString] ? 'highlight' : null;
        }
        return null;
    };

    const renderInterviewsForSelectedDate = () => {
        const dateString = selectedDate.toISOString().split('T')[0];
        const interviews = interviewsByDate[dateString];
        if (interviews && interviews.length > 0) {
            return (
                <ul className="interview-list">
                    {interviews.map((interview, index) => (
                        <a href={`/interview/${interview.link}`} style={{ textDecoration: 'none', color: "black" }}>
                            <li key={index} className="interview-item">
                                <span className="interview-id">{interview.id}</span>
                                <span className="interview-time">Time: {interview.time}</span>
                            </li>
                        </a>
                    ))}
                </ul>
            );
        }
        return <p className="no-interviews">No interviews scheduled for this date.</p>;
    };

    if (currentUser) {
        return (
            <div className="account-page">
                <div className="account-info">
                    <h3>Welcome, {name}!</h3>
                    <ul className="info-list">
                        <li className="info-item"><strong>Email:</strong> {email}</li>
                        <li className="info-item"><strong>Account Type:</strong> {currentUser.type}</li>
                        <li className="info-item"><strong>Passkey:</strong> {currentUser.passkey}</li>
                        <li className="info-item"><strong>Account Verified:</strong>{accountVerified}</li>
                        <li className="info-item"><strong>Company Address:</strong>{address}</li>
                        <li className="info-item"><strong>Company Name:</strong>{companyName}</li>
                        <li className="info-item"><strong>Company Website:</strong><a href={website}>{website}</a></li>

                    </ul>
                    <div className="button-group">
                        <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                        <button className="btn btn-outline-danger">Change Password</button>
                    </div>
                </div>
                <div style={{ marginLeft: '20px', display: "flex", marginBottom: '20px' }}>
                    <Calendar
                        onChange={onDateChange}
                        value={selectedDate}
                        tileClassName={tileClassName}
                        className="custom-calendar"
                    />
                    <div className="interviews-info">
                        <h4>Interviews for {selectedDate.toDateString()}</h4>
                        {renderInterviewsForSelectedDate()}
                    </div>
                </div>
            </div>
        );
    } else {
        return (<SignInPage login={loginUser} />);
    }
}
