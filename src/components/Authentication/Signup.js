import React, { createContext, useEffect, useContext, useState } from "react";

// our database
import { db } from "../firebase-config/firebase";

// getDocs() , used to retrieve all documents in a collection
// collection() , used to create a reference to a collection.
import { getDocs, collection } from "firebase/firestore";

const UsersFirestoreContext = createContext();

const UsersDbProvider = ({ children }) => {
  // state to keep track the list of users
  const [userList, setUserList] = useState([]);

  // our collection reference
  const usersCollectionRef = collection(db, "users");

  //   this function to get the list of users from our database
  const getUsersList = async () => {
    try {
      // we have to specify which collection we want to get all the documents from => (users)
      const data = await getDocs(usersCollectionRef);

      // grabbing the data that we want from this response
      // data() function in each document which you can use just to get the information such as [displayName - phoneNumber - email - etc...]
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));
      setUserList(filteredData);
    } catch (err) {
      console.log(err.code);
    }
  };

  // once the component is rendered will getting the list of users from the getUsersList function
  useEffect(() => {
    // this function to get the list of users
    getUsersList();
  }, []);

  return (
    <UsersFirestoreContext.Provider
      value={{ userList, setUserList, usersCollectionRef, getUsersList }}
    >
      {children}
    </UsersFirestoreContext.Provider>
  );
};

const useUsersContext = () => {
  return useContext(UsersFirestoreContext);
};

export { UsersDbProvider, useUsersContext };
