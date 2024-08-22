import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignInPage({login}) {
  const [username, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
        toast.success("Logged in! Welcome " + username)
      } else {
        setError('Invalid email or password');
      }

    } catch (error) {
      setError(error.message);
      console.log('Login error:', error.message);
    }
  };


  return (
    <div style={{ display: "flex", flexDirection: 'column', padding: '1%', gap: '5px', alignItems: 'center' }}>
      <h3>User Login</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }} className="col-5">

        <label class="form-label">UserName</label>
        <input type="text" class="form-control" value={username} onChange={(e) => setuserName(e.target.value)} required />
        <br />

        <label>Password</label>
        <div className="password-input-container" style={{ position: 'relative', width: '100%' }}>
            <input 
                type={showPassword ? "text" : "password"} 
                className="form-control" 
                value={password} 
                aria-describedby="passwordHelpBlock" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{ paddingRight: '2.5rem' }}
            />
            <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0',
                    color: '#888',
                }}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
        <br />
        <button type="submit" class="btn btn-outline-success">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br></br>
        <p>Not a member? <a href="/register">Sign up</a> today for free! </p>
      </form>
    </div>
  );
};