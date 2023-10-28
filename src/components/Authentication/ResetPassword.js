import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { auth } from "../../firebase-config/firebase";
import { confirmPasswordReset } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

// when reset password has been reset successfully
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

// an error occurred while the user trying to set a new password
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

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const oobCode = useRef(null);

  // once the page loaded will execute this effect first of all
  useEffect(() => {
    // searching the oobCode param form the window location using URLSearchParams method
    const queryParams = new URLSearchParams(window.location.search);

    // getting the oobCode param from the url
    oobCode.current = queryParams.get("oobCode");

    // if the oobCode object with key-value (current) hasn't the value of the resetPassword code will prevent the users of access to the reset password page, and getting them to the login page
    if (!oobCode.current) {
      navigate("/login");
    }
  }, []);

  const changeNewPassword = (e) => {
    e.preventDefault();
    confirmPasswordReset(auth, oobCode.current, newPassword)
      .then(() => {
        msgAlertSuccess("You can now log in with your new password");
        setNewPassword("");
        navigate("/login");
      })
      .catch((err) => {
        switch (err.code) {
          // if the user entered a short password
          case "auth/weak-password":
            return msgAlertError("Password should be at least 6 characters");

          // if the user forgot to enter his new password
          case "auth/missing-password":
            return msgAlertError("Enter your new password");

          case "auth/invalid-action-code":
            return msgAlertError(
              "Sorry, the password reset link is invalid or expired. Please request a new one."
            );

          // if the user loses his connection to the internet
          case "auth/network-request-failed":
            return msgAlertError(
              "Check your internet connection and try again."
            );

          default:
            return msgAlertError(err.code);
        }
      });
  };

  return (
    <div className="resetPassword-container">
      <h1 className="resetPassword-title">Reset password</h1>
      <p className="resetPassword-description">Please enter a new password</p>
      <form className="resetPasswordForm" onSubmit={changeNewPassword}>
        <div className="inp-container">
          <input
            type="password"
            name="password"
            className="inpField"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" className="submitDataBtn" variant="warning">
          RESET
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
