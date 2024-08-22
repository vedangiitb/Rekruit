import { React, useState } from "react";

export default function InterviewerRegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passkey, setPasskey] = useState('')

  const handleChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(''); // Clear any previous error message
  };

  const validatePassword = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!regex.test(password)) {
      setPasswordError('Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with form values
    const userData = {
      email,
      name,
      password,
    };

    try {
      // Send a POST request to your backend endpoint
      const response = await fetch('http://localhost:5000/int-register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userData.email, username: userData.name, password: userData.password, passkey: passkey }),
        }
      );

      // Handle success or display a message to the user
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: 'column', padding: '1%', gap: '5px', alignItems: 'center' }}>
      <h3>Interviewer Sign Up</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }} className="col-5">

        <label class="form-label">Email</label>
        <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />

        <label class="form-label">Name</label>
        <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />

        <label class="form-label">Passkey</label>
        <input type="text" class="form-control" value={passkey} onChange={(e) => setPasskey(e.target.value)} required />
        <br />

        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          aria-describedby="passwordHelpBlock"
          value={password}
          onChange={handleChange}
          onBlur={validatePassword}
          required
        />
        <div id="passwordHelpBlock" className="form-text" style={{ color: 'red' }}>
          {passwordError}
        </div>
        <br />

        <button type="submit" class="btn btn-outline-success">Register</button>
      </form>
    </div>
  );
};