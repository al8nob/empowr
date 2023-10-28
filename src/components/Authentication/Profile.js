// Customer profile page.

// this file basically will write the logic which checks whether a user is signed in or not
// and if a user is signed in will add a button to signing out.
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase-config/firebase";
import { deleteUser, onAuthStateChanged, signOut } from "firebase/auth";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import signOutIcon from "../../images/signOutIcon.png";
import "./Profile.css";

// when users (signing out  - deleting account) will notify them with successful message for each task (sign out - delete account)
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

// when users signing out or deleting their account will notify them ( error sign out - delete account )
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

/*

onAuthStateChanged is a Firebase Authentication method that allows you to listen for changes to the user's sign-in state. This means that you can be notified when a user signs in, signs out, or their user ID token changes.

onAuthStateChanged can be used to implement a variety of features, such as:

- Keeping track of whether a user is signed in or signed out.
- Displaying different content to signed-in and signed-out users.
- Redirecting signed-in users to different pages.
- Disabling features for signed-out users.

*/
const Profile = () => {
  // state to keep track if the user's status
  const [authUser, setAuthUser] = useState(null);

  // after users signing up will redirect them to login page.
  const redirectLogin = useNavigate();
  console.log(authUser);

  // Adds an observer for changes to the user's sign-in state.
  useEffect(() => {
    //The Auth instance
    // Adds an observer for changes to the user's sign-in state.
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  // signing out the user from his account
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        redirectLogin("/login");
        msgAlertSuccess("You have successfully signed out.");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/network-request-failed":
            return msgAlertError(
              "Check your internet connection and try again."
            );

          default:
            return msgAlertError(
              "We're sorry, but an error occurred while signing you out. Please try again later." +
                error.code
            );
        }
      });
  };

  // Deleting the user from the database
  const deleteAccount = () => {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        redirectLogin("/login");
        msgAlertSuccess("Your account has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error.code);

        switch (error.code) {
          // if the user is trying to delete his account and an error occurred
          case "auth/requires-recent-login":
            return msgAlertError(
              "Sorry, we couldn't delete your account. Please sign out and try again"
            );

          // if the user loses his connection to the internet
          case "auth/network-request-failed":
            return msgAlertError(
              "Check your internet connection and try again."
            );

          // default case, if an unknown error occurred
          default:
            return msgAlertError(
              "Sorry, we couldn't delete your account. Please try again later",
              error.code
            );
        }
      });
  };

  return (
    <>
      {authUser ? (
        <div className="profile-container">
          <h3 className="profile-title">Account Details</h3>
          <p className="profile-description">
            View and update your personal information
          </p>

          <form className="userInfoForm">
            <div className="inp-container">
              <div className="firstLast-Name">
                <input
                  type="text"
                  name="fname"
                  className="inpField"
                  placeholder="First name"
                  autoComplete="on"
                />

                <input
                  type="text"
                  name="lname"
                  className="inpField"
                  placeholder="Last name"
                  autoComplete="on"
                />
              </div>

              <div className="emailPhone">
                <input
                  type="email"
                  name="email"
                  className="inpField"
                  placeholder="Email"
                  autoComplete="on"
                />

                <input
                  type="tel"
                  name="phone"
                  className="inpField"
                  placeholder="Phone"
                  autoComplete="on"
                />
              </div>

              <Form.Select aria-label="Gender">
                <option className="genderOptionElement">Gender</option>
                <option className="genderOptionElement" value="male">
                  Male
                </option>
                <option className="genderOptionElement" value="female">
                  Female
                </option>
              </Form.Select>

              <input
                type="date"
                name="dob"
                className="inpField"
                placeholder="Date of birth"
              />
            </div>
            <hr className="lineSeparator" />
            <div className="saveDeleteBtns">
              <Button
                type="button"
                className="deleteAccountBtn"
                variant="danger"
                onClick={deleteAccount}
              >
                DELETE ACCOUNT
              </Button>

              <Button type="submit" className="updateDataBtn" variant="warning">
                SAVE
              </Button>
            </div>
            <div className="signOutBtnContainer">
              <button
                type="button"
                className="signOutBtn"
                onClick={userSignOut}
              >
                <img src={signOutIcon} alt="" className="signOutIcon" />
                Sign out
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
