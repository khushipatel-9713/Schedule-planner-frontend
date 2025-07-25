
// export default ForgotPasswordPage;
import React, { useState } from 'react';
import { FaEnvelope, FaKey, FaLock } from 'react-icons/fa';
import api from '../../api/axiosInstance';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      alert(`OTP sent to ${email}`);
      setStep(2);
    } else if (step === 2) {
      if (otp === '123456') {
        alert('OTP Verified');
        setStep(3);
      } else {
        alert('Invalid OTP. Try 123456');
      }
    } else if (step === 3) {
      alert('Password Reset Successful!');
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
    }
  };

  return (
    <div className="main-wrapper">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }

        html, body, #root, .main-wrapper {
          height: 100%;
          width: 100%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .forgot-box {
          display: flex;
          width: 92%;
          max-width: 1000px;
          height: 92%;
          max-height: 580px;
          background-color: #f4f4f4;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .left-side {
          flex: 1;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .left-side img {
          width: 90%;
          max-width: 400px;
        }

        .right-side {
          flex: 1;
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: #fff;
        }

        .right-side h2 {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 30px;
          color: #000;
        }

        .input-group {
          display: flex;
          align-items: center;
          border-bottom: 2px solid #ccc;
          margin-bottom: 25px;
          padding: 5px 0;
        }

        .input-group svg {
          margin-right: 10px;
          font-size: 18px;
          color: #000;
        }

        .input-group input {
          border: none;
          outline: none;
          font-size: 15px;
          width: 100%;
          padding: 10px 0;
          background: none;
          color: #000;
        }

        form button {
          width: 100%;
          padding: 14px;
          font-size: 16px;
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        form button:hover {
          background-color: #333;
        }

        .back-link {
          margin-top: 20px;
          font-size: 14px;
          color: #444;
        }

        .back-link a {
          color: #000;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .forgot-box {
            flex-direction: column;
            height: auto;
            max-height: none;
          }

          .left-side {
            display: none;
          }

          .right-side {
            padding: 30px 20px;
          }
        }
      `}</style>

      <div className="forgot-box">
        <div className="left-side">
          <img
            src="images/reset.avif"
            alt="Forgot Password Illustration"
          />
        </div>
        <div className="right-side">
          <h2>Forgot Your Password?</h2>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="input-group">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            {step === 2 && (
              <div className="input-group">
                <FaKey />
                <input
                  type="text"
                  placeholder="Please enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            )}
            {step === 3 && (
              <div className="input-group">
                <FaLock />
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <button type="submit">
              {step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Reset Password'}
            </button>
          </form>
          <div className="back-link">
            Back to <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
