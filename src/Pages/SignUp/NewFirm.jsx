import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const NewFirm = ({ signUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    size: '',
    website: '',
    contactPersonName: '',
    contactPersonJobTitle: '',
    contactPersonEmail: '',
    contactPersonPassword: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    },
    paymentMethod: '',
    tin: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 3) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: {
            ...prev[keys[0]][keys[1]],
            [keys[2]]: value
          }
        }
      }));
    } else if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = '2024-01-02'
    console.log(formData.contactPersonEmail, formData.contactPersonName, formData.contactPersonPassword, JSON.stringify(formData.billingAddress), date, formData.name, formData.website, formData.size, formData.industry, formData.contactPersonJobTitle)
    try {
      signUp(formData.contactPersonEmail, formData.contactPersonName, formData.contactPersonPassword, JSON.stringify(formData.billingAddress), date, formData.name, formData.website, formData.size, formData.industry, formData.contactPersonJobTitle)
        .then(data => {
          navigate('/');
          toast.success('Account was created. You will gain access once your account is verified by our team!');
          console.log('Sign up successful', data)
        })
        .catch(err => {
          toast.error('Error creating account' + err.message );
          console.log('Error signing up', err)});
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: 'column', padding: '2%', gap: '5px' }} >
      <h2 style={{ alignSelf: "center" }}>Create New Firm Account</h2>
      <form onSubmit={handleSubmit} className='col-6'>
        <div >
          <label>Company Name</label>
          <input type="text" name="name" class="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Industry</label>
          <input type="text" name="industry" class="form-control" value={formData.industry} onChange={handleChange} required />
        </div>
        <div>
          <label>Size</label>
          <input type="number" name="size" class="form-control" value={formData.size} onChange={handleChange} />
        </div>
        <div>
          <label>Website</label>
          <input type="url" name="website" class="form-control" value={formData.website} onChange={handleChange} />
        </div>
        <br />
        <div>
          <h5>Primary Contact</h5>
          <label>Name</label>
          <input type="text" name="contactPersonName" class="form-control" value={formData.contactPersonName} onChange={handleChange} required />
          <label>Job Title</label>
          <input type="text" name="contactPersonJobTitle" class="form-control" value={formData.contactPersonJobTitle} onChange={handleChange} />
          <label>Email</label>
          <input type="email" name="contactPersonEmail" class="form-control" value={formData.contactPersonEmail} onChange={handleChange} required />
          <label>Password</label>
          {/* <input type="password" name="contactPersonPassword" class="form-control" value={formData.contactPersonPassword} onChange={handleChange} required /> */}
          <div className="password-input-container" style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="contactPersonPassword"
              value={formData.contactPersonPassword}
              aria-describedby="passwordHelpBlock"
              onChange={handleChange}
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
        </div>
        <br />
        <div>
          <h5>Billing Address</h5>
          <label>Street</label>
          <input type="text" name="billingAddress.street" class="form-control" value={formData.billingAddress.street} onChange={handleChange} />
          <label>City</label>
          <input type="text" name="billingAddress.city" class="form-control" value={formData.billingAddress.city} onChange={handleChange} />
          <label>State</label>
          <input type="text" name="billingAddress.state" class="form-control" value={formData.billingAddress.state} onChange={handleChange} />
          <label>Country</label>
          <input type="text" name="billingAddress.country" class="form-control" value={formData.billingAddress.country} onChange={handleChange} />
          <label>Postal Code</label>
          <input type="text" name="billingAddress.postalCode" class="form-control" value={formData.billingAddress.postalCode} onChange={handleChange} />
        </div>
        <div>
          <label>Contact Number</label>
          <input type="text" name="contactNo" class="form-control" value={formData.contactNo} onChange={handleChange} />
        </div>
        <div>
          <label>Payment Method</label>
          <input type="text" name="paymentMethod" class="form-control" value={formData.paymentMethod} onChange={handleChange} />
        </div>
        <div>
          <label>TIN</label>
          <input type="text" name="tin" class="form-control" value={formData.tin} onChange={handleChange} />
        </div>
        <br />
        <button type="submit" className='btn btn-outline-dark'>Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewFirm;
