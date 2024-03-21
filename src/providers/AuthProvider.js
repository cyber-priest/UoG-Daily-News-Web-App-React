import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase_config";
import { useNavigate } from "react-router";

const AuthContext = React.createContext();
export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider({ children }) {
  const [msg, setMsg] = React.useState();
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  function signUpChecker(username, email, password, cpassowrd) {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      cpassowrd === ""
    ) {
      setMsg("Pleae fill all fields!");
      return false;
    } else {
      if (password === cpassowrd) {
        if (password?.length < 6) {
          setMsg("the password should contain at least 6 characters!");
          return false;
        } else {
          return true;
        }
      } else {
        setMsg("Passwords do not match!");
        return false;
      }
    }
  }
  async function signUp(username, email, password) {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: username }).then(() => {});
      setMsg("");
      navigate("/");
    } catch (error) {
      setMsg(error.message);
    }
  }
  function loginChecker(email, passowd) {
    if (email !== "" && passowd !== "") {
      return true;
    } else {
      setMsg("Error: Please fill both the password and the email field!");
      return false;
    }
  }
  async function logIn(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMsg("");
      navigate("/");
    } catch (error) {
      setMsg(error.message);
    }
  }
  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      setMsg(error.message);
    }
  }
  const value = {
    user,
    logIn,
    logOut,
    loginChecker,
    signUp,
    signUpChecker,
    setMsg,
    msg,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
