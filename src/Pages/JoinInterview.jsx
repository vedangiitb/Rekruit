import React, { useState } from "react";

export default function JoinInterview({ user }) {
    const [sessionName, setSessionName] = useState("")

    const [notLoggedIn, setNotLoggedIn] = useState(false)

    const [invalidName, setInvalidName] = useState(false)

    const handleSessionInput = (e) => {
        setSessionName(e.target.value)
    }

    const chooseSessionSubmit = async () => {
        if (user && sessionName) {
            window.open(`/interview/${sessionName}`, "_self")
        }
        else if (!sessionName) {
            setInvalidName(true)
        }
        else {
            invalidName(false)
            setNotLoggedIn(true)
        }
    };

    return (
        <div style={{ padding: "2%", backgroundColor: '#f5f5f5' }}>
            <h3 className="heading-2">
                Join interview with the invite id
            </h3>
            <p className="text">
                Enter your invite Id and join the interview
            </p>
            <div className="col-6">

                <input onChange={handleSessionInput} value={sessionName} class="form-control" placeholder='Enter the Invite Id' />

                <br />

                <button className='btn btn-outline-dark' onClick={chooseSessionSubmit}>
                    Join Session
                </button>

                {
                    notLoggedIn && <p style={{ color: "red" }}>
                        Please log in before you continue
                    </p>
                }

                {
                    invalidName && <p style={{ color: "red" }}>
                        Please enter an id!
                    </p>
                }

            </div>

            <div style={{ paddingTop: "3%" }}>
                <p className="heading-3">Things to remember before joining the interview: Interviewee</p>
                <ul style={{ listStyle: "none" }}>
                    <li className="text">Please ensure that you have a working camera and microphone and allow required permissions</li>

                    <br />

                    <li className="text">Do not use a camera or microphone which is not inbuilt in your pc, if so please inform the interviewer and get the required permissions to use it.</li>

                    <br />

                    <li className="text">Do not switch tabs during the interview as it sends a notification to the interviewer</li>

                    <br />

                </ul>

                <br />

                <p className="heading-3">Things to remember before joining the interview: Interviewer</p>
                <ul style={{ listStyle: "none" }}>
                    <li className="text">Please ensure that you have a working camera and microphone.</li>

                    <br />

                    <li className="text">Please ensure that you have gone through the interview guide to help you to use Rekruit more effectively.</li>

                    <br />

                    <li className="text">Any suspecious activities by the candidate will be notified only to you and will not be visible to candidate.</li>

                    <br />

                </ul>
            </div>
        </div>
    )
}