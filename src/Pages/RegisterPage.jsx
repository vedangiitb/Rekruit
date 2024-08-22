import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function RegisterPage({ signUp }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(''); // Clear any previous error message
  };

  const validatePassword = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!regex.test(password)) {
      setPasswordError('Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      name,
      password,
    };
    const date = '2024-01-02'

    try {
      signUp(userData.email, userData.name, userData.password)
        .then(data => {
          navigate('/');
          toast.success('Account was created. You will gain access once your account is verified by our team!');
          console.log('Sign up successful', data)
        })
        .catch(err => console.error('Error signing up', err));
    } catch (error) {
      setPasswordError('Error: ' + error.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: 'column', padding: '1%', gap: '5px', alignItems: 'center' }}>
      <h3>User Registration</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }} className="col-5">

        <label class="form-label">Email</label>
        <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />

        <label class="form-label">Name</label>
        <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
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