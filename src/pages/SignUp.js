import React, { useEffect } from "react";
import {
  Alert,
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { useAuth, AuthProvider } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaKey, FaMailBulk, FaTimes, FaUser } from "react-icons/fa";

export default function SignUp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return <SignUpForm />;
}

function SignUpForm() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCpassword] = React.useState("");
  const { signUp, signUpChecker, msg } = useAuth();
  async function formHandler(e) {
    e.preventDefault();
    const check = signUpChecker(username, email, password, cpassword);
    if (check) {
      signUp(username, email, password);
    }
    // signUp(email, password);
  }
  return (
    <div className="formBody">
      <div className="formHolder">
        <AppBar
          position="sticky"
          style={{ backgroundColor: "#15213a", marginBottom: 12, marginTop: 0 }}
        >
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Sign Up</Typography>
            <IconButton onClick={() => {}}>
              <FaTimes color="white" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form className="signUpForm" onSubmit={formHandler}>
          {msg ? (
            <div>
              <Alert severity="error">{msg}</Alert>
            </div>
          ) : (
            ""
          )}
          <div>
            <i>
              <FaUser />
            </i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              // required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <i>
              <FaMailBulk />
            </i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              // required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <i>
              <FaKey />
            </i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              // required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <i>
              <FaKey />
            </i>
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              // required
              onChange={(e) => setCpassword(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Sing up" />
          </div>
        </form>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Log in</Button>
        </Link>
      </div>
    </div>
  );
}
