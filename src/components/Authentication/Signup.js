import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Signup.css";
import { toast } from "react-toastify";
import { useUsersContext } from "../../context/usersDbContext";
import { db } from "../../firebase-config/firebase";
import { getDocs, addDoc, collection, where, query } from "firebase/firestore";

// when users signing up will notify them ( successful signup )
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

// when users signing up will notify them ( error signup )
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

const Signup = () => {
  // storing the data of new user that wanna sign up
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // userList => all documents of users
  // setUserList => to update the collection of documents
  // usersCollectionRef => to access to a users collection
  // getUsersList => getting all the users
  const { userList, usersCollectionRef, getUsersList } = useUsersContext();
  console.log(userList);

  // when users signing out will redirect them to login page.
  const redirectLogin = useNavigate();

  const dbUsersRef = collection(db, "users");

  // check if the email is already exist or not , then add the new doc with new data of the user
  const createAccount = async (e) => {
    e.preventDefault();

    // send request where the email fields that matches the newUserData.email
    // which means that return the emails that is matched from the "users" collection
    const matchedEmail = query(
      dbUsersRef,
      where("email", "==", newUserData.email)
    );
    try {
      // get all documents that contains the same email field value
      const snapshot = await getDocs(matchedEmail);

      // after we got all the docs we want to return the data of each doc
      // this array contains all the docs that have the same email field value
      const emailMatchingArray = snapshot.docs.map((doc) => doc.data());
      if (emailMatchingArray.length > 0) {
        console.log("This email address already exist.");
      } else {
        await addDoc(dbUsersRef, newUserData);
        console.log("successful");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // signup new user operation
  // - creating the user account with (email & password)
  // - after user's signed up,
  // - adding the document into the users collection (in firestore db), contains the user's data.
  // const submitForm = (e) => {
  //   e.preventDefault();
  //   createUserWithEmailAndPassword(
  //     auth,
  //     newUserData.email,
  //     newUserData.password
  //   )
  //     .then(() => {
  //       setNewUserData({
  //         ...newUserData,
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         password: "",
  //       });
  //       redirectLogin("/login");
  //       msgAlertSuccess("Your account has been created!. Login Now");
  //     })
  //     .catch((error) => {
  //       switch (error.code) {
  //         // if the user entered an invalid email or the (uid) is already exists
  //         case "auth/uid-already-exists":
  //         case "auth/invalid-email":
  //           return msgAlertError(
  //             "We couldn't create your account. Please check your information and try again."
  //           );

  //         // if the user entered an email already in use
  //         case "auth/email-already-in-use":
  //           return msgAlertError(
  //             "This email address is already in use by another user."
  //           );

  //         // if the user forgot to enter his email address
  //         case "auth/missing-email":
  //           return msgAlertError("Enter your email address");

  //         // if the user forgot to enter his password
  //         case "auth/missing-password":
  //           return msgAlertError("Enter your password");

  //         // if the user entered a short password
  //         case "auth/weak-password":
  //           return msgAlertError("Password should be at least 6 characters");

  //         // if the user loses his connection to the internet
  //         case "auth/network-request-failed":
  //           return msgAlertError(
  //             "Check your internet connection and try again."
  //           );

  //         // default case, if an unknown error occurred
  //         default:
  //           return msgAlertError(error.code);
  //       }
  //     });
  // };

  return (
    <>
      <div className="signup-container">
        <h3 className="signup-title">Sign up</h3>
        <p className="signup-description">
          Please fill in the information below
        </p>

        <form onSubmit={createAccount} className="inpFields">
          <div className="inp-container">
            <div className="firstLast-Name">
              <input
                type="text"
                name="fname"
                value={newUserData.firstName}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, firstName: e.target.value })
                }
                className="inpField"
                placeholder="First name"
                autoComplete="on"
              />
              <input
                type="text"
                name="lname"
                value={newUserData.lastName}
                onChange={(e) =>
                  setNewUserData({ ...newUserData, lastName: e.target.value })
                }
                className="inpField"
                placeholder="Last name"
                autoComplete="on"
              />
            </div>
            <input
              type="email"
              name="email"
              value={newUserData.email}
              onChange={(e) =>
                setNewUserData({ ...newUserData, email: e.target.value })
              }
              className="inpField"
              placeholder="Email"
              autoComplete="on"
            />
            <input
              type="password"
              name="password"
              value={newUserData.password}
              onChange={(e) =>
                setNewUserData({
                  ...newUserData,
                  password: Number(e.target.value),
                })
              }
              className="inpField"
              placeholder="Password"
              autoComplete="new-password"
              min="6"
              max="12"
            />
          </div>
          <Button type="submit" className="submitDataBtn" variant="warning">
            SIGN UP
          </Button>
        </form>

        <p className="TOS-PP-NOTE">By creating an account you agree with our</p>
        <div className="TOS-PP">
          <NavLink to="/" className="TOS">
            Terms of Service
          </NavLink>{" "}
          &{" "}
          <NavLink to="/" className="PP">
            Privacy Policy.
          </NavLink>
        </div>

        <p className="noteForm">
          Already have an account?{" "}
          <NavLink to="/login" className="loginLink">
            Login
          </NavLink>
        </p>
      </div>
      <div className="d-flex flex-column gap-2 align-items-center text-center">
        {userList.map((user, i) => {
          return (
            <div key={i}>
              <h2>
                {user.firstName.toUpperCase() +
                  " " +
                  user.lastName.toUpperCase()}
              </h2>
              <p>{user.email}</p>
              <small>{user.uid}</small>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Signup;
