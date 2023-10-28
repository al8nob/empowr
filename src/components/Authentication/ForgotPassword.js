import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase-config/firebase";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./ForgotPassword.css";
import { NavLink } from "react-router-dom";

// when reset password email sent successfully
const msgAlertSuccess = (message) => {
  return toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

// an error occurred while the user trying to reset the password message
const msgAlertError = (message) => {
  return toast.error(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        msgAlertSuccess(
          "Your password reset email has been sent. Please check your inbox to continue."
        );
        setEmail("");
      })
      .catch((err) => {
        switch (err.code) {
          // when the user hasn't an account.
          case "auth/user-not-found":
            return msgAlertError(
              "We couldn't find an account with that email address."
            );

          // if the user entered invalid email.
          case "auth/invalid-email":
            return msgAlertError(
              "Your email address is invalid. Please enter a valid email address and try again."
            );

          // in case the user does not enter the email
          case "auth/missing-email":
            return msgAlertError("Please enter your email.");

          // if the user loses his connection to the internet
          case "auth/network-request-failed":
            return msgAlertError(
              "Check your internet connection and try again."
            );

          default:
            msgAlertError(err.code);
        }
      });
  };

  return (
    <div className="forgotPassword-container">
      <h1 className="forgotPassword-title">Recover password</h1>
      <p className="forgotPassword-description">Please enter your email</p>
      <form className="forgotPasswordForm" onSubmit={resetPassword}>
        <div className="inp-container">
          <input
            type="email"
            name="email"
            className="inpField"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
          />
        </div>
        <Button type="submit" className="submitDataBtn" variant="warning">
          SEND
        </Button>
      </form>
      <p className="noteForm">
        Remember your password?{" "}
        <NavLink to="/login" className="loginLink">
          Back to login
        </NavLink>
      </p>
    </div>
  );
};

export default ForgotPassword;
