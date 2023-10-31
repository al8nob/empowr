import React, { useState } from "react";
import { auth, googleProvider } from "../../firebase-config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./Login.css";
import { db } from "../../firebase-config/firebase";
import { getDocs, query, where, collection, addDoc } from "firebase/firestore";

// sm icons
import googleIcon from "../../images/googleIcon.png";
import facebookIcon from "../../images/facebookIcon.png";
import microsoftIcon from "../../images/microsoftIcon.png";

// when users logging in will notify them ( successful login )
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

// when users logging in will notify them ( error login )
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

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // reference users collection
  const dbUsersRef = collection(db, "users");

  // when the users is logged in successfully will redirect them to their profile.
  const redirectProfile = useNavigate();

  /*
  
  1st step: sign in with google account (done)
  2nd step: storing the results inside a constant (done)
  3rd step: check if the data such as [email, displayName, phoneNumber, etc...] exists in the database
  4th step: if exist => getting email and displayName
  5th step: if not exist => add a new document inside users collection contains the email and displayName
  
  */

  const signInWithGoogle = () => {
    // sign in with google account
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        // storing the results inside a constant
        const user = result.user;
        const matchEmail = query(dbUsersRef, where("email", "==", user.email));

        try {
          const snapshot = await getDocs(matchEmail);
          const emailExist = snapshot.docs.map((doc) => doc.data());
          console.log(emailExist);
          if (emailExist.length > 0) {
            console.log(user.email, " ", "email exist in database");
          } else {
            console.log("email's not exist in database");
            await addDoc(dbUsersRef, {
              email: user.email,
              displayName: user.displayName,
            });
            console.log("it's exist now after signing in");
          }
        } catch (error) {
          console.log(error.code);
        }
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const matchEmail = query(dbUsersRef, where("email", "==", userData.email));

    try {
      // getting all the emails that matching the condition
      const snapshot = await getDocs(matchEmail);

      // emails came from the database (users collection)
      const emailExist = snapshot.docs.map((doc) => doc.data());

      // if the array contains the email that comes from the database (users collection), someone has already signed up with that email
      if (emailExist.length > 0) {
        signInWithEmailAndPassword(auth, userData.email, userData.password)
          .then((userCredential) => {
            const userInfo = userCredential;
            console.log(userInfo);
            console.log(userData);
            redirectProfile("/profile");
            msgAlertSuccess("Welcome, enjoy your shopping experience.");
            setUserData({ ...userData, email: "", password: "" });
          })
          .catch((error) => {
            // if any of the next cases happened from the user will display a message to inform him
            switch (error.code) {
              // if the user entered invalid data such as email - password , or the user in not found
              case "auth/invalid-email":
              case "auth/invalid-password":
              case "auth/invalid-login-credentials":
                return msgAlertError(
                  "Please check your email and password and try again."
                );
              // if the user hasn't an account
              case "auth/user-not-found":
                return msgAlertError(
                  "We couldn't find an account with that email address."
                );

              // if the user forgot to enter his email address
              case "auth/missing-email":
                return msgAlertError("Enter your email address");

              // if the user forgot to enter his password
              case "auth/missing-password":
                return msgAlertError("Enter your password");

              // if the user loses his connection to the internet
              case "auth/network-request-failed":
                return msgAlertError(
                  "Check your internet connection and try again."
                );
              // default case, if an unknown error occurred
              default:
                return msgAlertError(error.code);
            }
          });
      } else {
        msgAlertError("Invalid email or password.");
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, googleProvider)
  //     .then((userCredential) => {
  //       const userInfo = userCredential;
  //       console.log(userInfo);
  //       redirectProfile("/profile");
  //       msgAlertSuccess("Welcome, enjoy your shopping experience.");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       msgAlertError("Please check your email and password and try again.");
  //     });
  // };

  return (
    <>
      <div className="login-container">
        <h3 className="login-title">Login</h3>
        <p className="login-description">
          Keep track the status of your orders
        </p>

        <form className="inpFields" onSubmit={submitForm}>
          <div className="inp-container">
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="inpField"
              placeholder="Email"
              autoComplete="on"
              required
            />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="inpField"
              placeholder="Password"
              autoComplete="new-password"
              required
            />
            <NavLink to="/forgot-password" className="forgotPasswordLink">
              Forgot your password?
            </NavLink>
          </div>
          <Button type="submit" className="submitDataBtn" variant="warning">
            LOGIN
          </Button>
        </form>

        <p className="noteForm">
          Do not have an account?{" "}
          <NavLink to="/signup" className="signupLink">
            Sign up
          </NavLink>
        </p>

        <h4 className="text-or">OR</h4>
        <p className="text-continue">Continue with</p>

        <div className="smIcons">
          <button className="googleBtn" onClick={signInWithGoogle}>
            <img src={googleIcon} alt="google" className="googleIcon" />
          </button>

          <button className="microsoftBtn">
            <img
              src={microsoftIcon}
              alt="microsoft"
              className="microsoftIcon"
            />
          </button>

          <button className="facebookBtn">
            <img src={facebookIcon} alt="facebook" className="facebookIcon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
