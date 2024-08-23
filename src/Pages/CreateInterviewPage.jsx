import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../Styles/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export default function CreateInterview({ user }) {
    const [intName, setIntName] = useState("")
    const [interviewee, setInterviewee] = useState("")
    const [interviewers, setInterviewers] = useState([])
    const [tempInterviewer, setTempInterviewer] = useState("")
    const [hasCoding, setHasCoding] = useState(false)
    const [notLoggedIn, setNotLoggedIn] = useState(false)
    const [hasNoPermission, setPermission] = useState(false)
    const [dateSet, setDateSet] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateError, setDateError] = useState('');
    const [time, setTime] = useState('10:30');
    const [dateTime, setDateTime] = useState('')
    const [noCandidate, setNoCandidate] = useState(false)
    const [noName, setNoName] = useState(false)
    const [areSame, setAreSame] = useState(false)
    const ownerName = user;
    console.log(ownerName)

    const handleInputChange = (e) => {
        setIntName(e.target.value)
    }

    const handleIntervieweeInpChange = (e) => {
        setInterviewee(e.target.value)
    }

    const handleTempIntChange = (e) => {
        setTempInterviewer(e.target.value)
    }

    const handleToggle = () => {
        setHasCoding(!hasCoding);
    };

    const handleDateInput = () => {
        if (validateDate(date, time)) {
            setDateSet(true)
            const [hours, minutes] = time.split(':');
            const newDateTime = new Date(date)
            newDateTime.setHours(hours, minutes)
            setDateTime(newDateTime.toString())

        }
    }

    const validateDate = (selectedDate, selectedTime) => {
        if (selectedDate === '') {
            setDateError('Please select a date!');
            return false;
        }
        if (selectedTime === '') {
            setDateError('Please select a time!');
            return false;
        }

        const [hours, minutes] = selectedTime.split(':');
        const newDateTime = new Date(selectedDate)
        const now = new Date()
        newDateTime.setHours(hours, minutes)

        if (newDateTime < now) {
            setDateError('The interview date and time cannot be in the past');
            return false;
        } else {
            setDateError('');
            return true;
        }
    };

    const handleNewInterviewerAdd = () => {
        const isUserAlreadySelected = interviewers.some(
            (selectedUser) => selectedUser === tempInterviewer
        );

        if (!isUserAlreadySelected && tempInterviewer.length > 0) {
            setInterviewers([...interviewers, tempInterviewer]);
        }

        setTempInterviewer("")
    }

    const createInterview = async () => {
        try {
            if (!intName) {
                setNoName(true)
                return
            }
            else {
                setNoName(false)
            }

            if (!interviewee) {
                setNoCandidate(true)
                return
            }
            else {
                setNoCandidate(false)
            }

            if (interviewers.includes(interviewee)) {
                setAreSame(true)
                return
            }
            else {
                setAreSame(false)
            }

            if (ownerName && (ownerName.pool.userPoolId == "us-east-1_d7hF1ElIj")) {
                const response2 = await fetch('https://cognito-idp.us-east-1.amazonaws.com/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-amz-json-1.1',
                        'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser',
                        'Authorization': user.storage[user.userDataKey.slice(0, -8) + 'idToken']
                    },
                    body: JSON.stringify({
                        "AccessToken": user.storage['CognitoIdentityServiceProvider.559co16dlu99kleqa9lrvj4q09.' + ownerName.username + '.accessToken']
                    })

                });
                if (!response2.ok){
                    setPermission(true)
                    console.log("Has no permission")
                }
                
                const resp2 = await response2.json();
                const attributes = resp2.UserAttributes;
                const userId = attributes[0].Value;
                const acctType = attributes[7].Value
                
                if (!userId || acctType=='User'){
                    setPermission(true)
                    console.log("Has no permission")
                    return
                }
                
                const response = await fetch('https://2ur410rhci.execute-api.us-east-1.amazonaws.com/dev/create-interview',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': user.storage[user.userDataKey.slice(0, -8) + 'idToken']
                        },
                        body: JSON.stringify({
                            intName: intName,
                            code: "",
                            owner: userId,
                            candidate: interviewee,
                            interviewers: interviewers,
                            isIDEPresent: hasCoding,
                            question: "",
                            tests: [],
                            date: dateTime
                        }),
                    }
                )

                const sessionId = await response.text();
                console.log("Successfully created the codesession")
                console.log("Session ID:", sessionId.slice(1,-1));
                window.open(`/session-created/${sessionId.slice(1,-1)}`, "_self")

            }
            else if (ownerName) {
                setPermission(true)
                console.log("Has no permission")
            }
            else {
                setNotLoggedIn(true)
                console.log("Not signed in")
            }

        }

        catch (error) {
            console.log(error)
        }
    }

    const onDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div style={{ padding: '2%', backgroundColor: '#f5f5f5' }}>
            <h3 className="heading-2">Create a new interview</h3>

            {!dateSet && (
                <div>
                    <h3>Select Date and Time</h3>
                    <Calendar
                        onChange={onDateChange}
                        value={date}
                        className="custom-calendar"
                    />
                    <br />
                    <h5>Time</h5>
                    <TimePicker
                        onChange={setTime}
                        value={time}
                        clearIcon={null}
                        className="custom-time-picker"
                    />
                    <br />
                    <br />
                    <button
                        onClick={handleDateInput}
                        className="btn btn-outline-dark"
                    >
                        Set Date
                    </button>
                    {dateError && <p>{dateError}</p>}
                </div>
            )}

            {dateSet && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p>{dateTime}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="col-4">
                        <input
                            type="text"
                            value={intName}
                            onChange={handleInputChange}
                            placeholder="Enter the session name"
                            className="form-control"
                            style={{ margin: '3%' }} />
                        <input
                            type="email"
                            value={interviewee}
                            onChange={handleIntervieweeInpChange}
                            placeholder="Enter the interviewee E-mail"
                            className="form-control"
                            style={{ margin: '3%' }} />
                        <div style={{ display: 'flex', width: '100%' }}>
                            <input
                                type="email"
                                value={tempInterviewer}
                                onChange={handleTempIntChange}
                                placeholder="Enter the co-interviewer E-mail"
                                className="form-control"
                                style={{ marginTop: '3%' }} />
                            <button
                                className="btn btn-outline-secondary"
                                style={{ marginTop: '3%', marginLeft: '4px' }}
                                onClick={handleNewInterviewerAdd}>
                                +
                            </button>
                        </div>
                        {interviewers.length > 0 && (
                            <div style={{ display: 'flex' }}>
                                {interviewers.map((item, index) => (
                                    <button
                                        key={index}
                                        className="btn btn-outline-info"
                                        style={{ margin: '5px', padding: '2px' }}>
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                        <br />
                        <p>This interview will involve coding</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span className="toggle-label">No</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={hasCoding}
                                    onChange={handleToggle} />
                                <span className="slider"></span>
                            </label>
                            <span className="toggle-label">Yes</span>
                        </div>
                        <button
                            className="btn btn-outline-dark"
                            type="submit"
                            style={{ margin: '3%' }}
                            onClick={createInterview}>
                            Create Interview
                        </button>
                        {notLoggedIn && (
                            <p style={{ color: 'red' }}>
                                Please log in before you create the interview.
                            </p>
                        )}

                        {hasNoPermission && (
                            <p style={{ color: 'red' }}>
                                You don't have permission to create interview.
                            </p>
                        )}

                        {noCandidate && (
                            <p style={{ color: "red" }}>
                                Please enter interviewee email id before you continue!
                            </p>
                        )}

                        {noName && (
                            <p style={{ color: "red" }}>
                                Please enter an interview name!
                            </p>
                        )}

                        {areSame && (
                            <p style={{ color: "red" }}>
                                Interviewee cannot be an interviewer
                            </p>
                        )

                        }
                    </div>
                </div>
            )}
        </div>
    )
}