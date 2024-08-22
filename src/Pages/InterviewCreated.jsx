import React, { useState } from 'react';
import { useParams } from "react-router-dom";

export default function InterviewCreated() {
  const { id } = useParams()
  const [copySuccess, setCopySuccess] = useState(false);
  const link = `/interview/${id}`
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopySuccess(true);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "5%" }}>
      <h4>Hola! The session was successfully created!!</h4>
      <br></br>
      <h5>Here is your session Id: {id}</h5>
      <br></br>
      <button onClick={copyToClipboard} className='btn btn-outline-warning col-2'>Copy Session ID</button>
      {copySuccess && <span style={{ color: 'green' }}>Copied to clipboard!</span>}
      <br />
      <a href={link}><button className='btn btn-outline-info'>Join Interview Now</button></a>
      {/* TODO: Will add sharing option here later */}
    </div>
  )
}