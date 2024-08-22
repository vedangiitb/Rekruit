import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IDEPage from './Pages/IdePage';
import Navbar from './Layouts/NavBar';
import Footer from './Layouts/Footer';
import SignInPage from './Pages/SigninPage';
import RegisterPage from './Pages/RegisterPage';
import ColabIdeWrapper from './Components/Interview/InterviewWrapper';
import AccountPage from './Pages/AccountPage';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/Contact';
import { ToastContainer } from 'react-toastify';
import TestPlatform from './Pages/TestPlatform';
import 'react-toastify/dist/ReactToastify.css';
import CreateInterview from './Pages/CreateInterviewPage';
import JoinInterview from './Pages/JoinInterview';
import NewFirm from './Pages/SignUp/NewFirm';
import InterviewerRegisterPage from './Pages/InterviewerRegisterPage';
import Home from './Pages/HomePage';
import InterviewCreated from './Pages/InterviewCreated';
import { signUp } from './Pages/SignUp/Firm/FirmSignUp';
import { login } from './Pages/SignUp/Firm/FirmSignIn';
import { logout } from './Pages/SignUp/Firm/FirmLogOut';
import { poolData } from './cognitoConfig';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { signUpUser } from './Pages/SignUp/Firm/UserSignUp';


const userPool = new CognitoUserPool(poolData);

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const isLoggedIn = async () => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        return new Promise((resolve, reject) => {
          cognitoUser.getSession((err, session) => {
            if (err) {
              reject(err);
            } else {
              resolve(session.isValid());
            }
          });
        });
      } else {
        return false;
      }
    };

    const checkUserSession = async () => {
      try {
        const loggedIn = await isLoggedIn();
        if (loggedIn) {
          const cognitoUser = userPool.getCurrentUser();
          // const cognitoUser = new CognitoUser({ Username, Pool })
          setCurrentUser(cognitoUser)
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Error checking user session', err);
        setError(err.message);
      }
    };
    checkUserSession();
  }, []);

  return (
    <div>
      <ToastContainer />

      <Router>

        <Navbar currentUser={currentUser} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignInPage login={(username, password) => currentUser(username, password)} />} />
          <Route path="/register" element={<RegisterPage signUp={signUpUser} />} />
          <Route path='/firm-onboarding' element={<NewFirm signUp={signUp} />} />
          <Route path='/new-interviewer' element={<InterviewerRegisterPage />} />
          <Route path='/create-interview' element={<CreateInterview user={currentUser} />} />
          <Route path='/session-created/:id' element={<InterviewCreated />} />
          <Route path='/join-interview' element={<JoinInterview user={currentUser} />} />
          <Route path="/interview/:id" element={<ColabIdeWrapper user={currentUser} />} />
          <Route path='/account' element={<AccountPage user={currentUser} logoutUser={logout} loginUser={login} />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/oaplatform' element={<TestPlatform />} />

          <Route path="/ide" element={<IDEPage />} />

        </Routes>

        <Footer />
      </Router>
    </div>
  );
}
