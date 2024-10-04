import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignInPage from "./SigninPage";
import { toast } from "react-toastify";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Styles/AccountPage.css';
import { Amplify } from 'aws-amplify';
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
    const [jobTitle, setJobTitle] = useState("Fetching data...")
    const [companySize, setCompanySize] = useState("Fetching data...")
    const [companyName, setCompanyName] = useState('Fetching data...');
    const [companyIndustry, setCompanyIndustry] = useState("Fetching data...")
    const navigate = useNavigate();
    const [selectedInfo, setSelInfo] = useState('account');

    useEffect(() => {
        if (user) {
            console.log(user)
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
                console.log(attributes)
                setEmail(attributes[0].Value)
                setAccountVerified(attributes[1].Value)
                setAddress(JSON.parse(attributes[3].Value).city + ', ' + JSON.parse(attributes[3].Value).state + ', ' + JSON.parse(attributes[3].Value).country)
                setCompanyName(attributes[10].Value)
                setWebsite(attributes[4].Value)
                setName(attributes[2].Value)
                setJobTitle(attributes[9].Value)
                setCompanySize(attributes[6].Value)
                setCompanyIndustry(attributes[8].Value)

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
                        console.log(interviews)
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
        const dateString = selectedDate.toLocaleDateString('en-CA');
        console.log(dateString)
        const interviews = interviewsByDate[dateString];
        if (interviews && interviews.length > 0) {
            return (
                <ul className="interview-list">
                    {interviews.map((interview, index) => (
                        <li key={index} className="interview-item">
                            <div>
                                <p className="interview-id">{interview.id}</p>
                                <p className="interview-time">Time: {interview.time}</p>
                            </div>
                            <a href={`/interview/${interview.link}`} style={{ textDecoration: 'none', color: "black" }}>
                                <button className="btn btn-primary ml-auto" style={{ color: "#00289F", backgroundColor: "white", marginLeft: "20px", justifySelf: "flex-end" }}>Join Now</button>
                            </a>
                        </li>

                    ))}
                </ul>
            );
        }
        return <p className="no-interviews">No interviews scheduled for this date.</p>;
    };

    const profileInfoItem = (type, name) => {
        return (
            <div className="profile-info-item">
                <p style={{ color: "#00289F", fontWeight: "600" }}>{type}</p>
                <p>{name}</p>
            </div>
        )
    }


    const renderInfo = (infoType) => {
        if (infoType === 'account') {
            return (
                <div>
                    <h3 className="selected">Personal Information</h3>
                    <br />
                    {profileInfoItem('Name', name)}

                    {profileInfoItem('Email', email)}

                    {profileInfoItem('Region', address)}

                    {profileInfoItem('Job Title', jobTitle)}

                </div>
            )
        } else if (infoType == 'company') {
            return (
                <div>
                    <h3 className="selected">Company Information</h3>
                    <br />
                    {profileInfoItem('Company Name', companyName)}

                    {profileInfoItem('Company Address', address)}

                    {profileInfoItem('Company Website', website)}

                    {profileInfoItem('Company Size', companySize)}

                    {profileInfoItem('Company Industry', companyIndustry)}

                </div>
            )
        } else if (infoType === 'payments') {
            return (
                <div>
                    <h3 className="selected">Payments History</h3>
                    <br />
                    <p>No payments history!</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h3 className="selected">Settings</h3>
                    <br />

                    <button className="btn btn-primary" style={{ backgroundColor: "white", color: "#00289F", }}>Change Password</button>

                </div>
            )
        }
    }

    if (currentUser) {
        return (
            <div className="account-page">
                <div className="side-bar">
                    <div style={{ marginBottom: "20px" }}>
                        <span class="material-symbols-outlined">
                            account_circle
                        </span>
                        <p>{name}, <span className="selected">{companyName}</span></p>

                    </div>

                    <div>
                        <h4 className={`side-bar-item ${selectedInfo === "account" ? "selected" : ""}`} onClick={() => setSelInfo('account')}>Personal Info</h4>
                        <h4 className={`side-bar-item ${selectedInfo === "company" ? "selected" : ""}`} onClick={() => setSelInfo('company')}>Company Info</h4>
                        <h4 className={`side-bar-item ${selectedInfo === "payments" ? "selected" : ""}`} onClick={() => setSelInfo('payments')}>Payments</h4>
                        <h4 className={`side-bar-item ${selectedInfo === "settings" ? "selected" : ""}`} onClick={() => setSelInfo('settings')}>Settings</h4>
                    </div>

                </div>

                <div className="selected-info">
                    {renderInfo(selectedInfo)}

                </div>

                <div className="calendar">

                    <div className="interviews-info">
                        <h5>Interviews for {selectedDate.toDateString()}</h5>
                        {renderInterviewsForSelectedDate()}
                    </div>

                    <Calendar
                        onChange={onDateChange}
                        value={selectedDate}
                        tileClassName={tileClassName}
                        className="custom-calendar"
                    />

                </div>


            </div>
        );
    } else {
        return (<SignInPage login={loginUser} />);
    }
}
