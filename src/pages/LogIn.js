import React, { useEffect } from "react";
import { Alert, Button, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useAuth, AuthProvider } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaKey, FaMailBulk, FaUser } from "react-icons/fa";

export default function LogIn() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return <LogInForm />;
}

function LogInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { msg, setMsg, logIn, loginChecker } = useAuth();

  function formHadler(e) {
    e.preventDefault();
    setMsg("");
    const check = loginChecker(email, password);
    if (check) {
      logIn(email, password);
      // setMsg("");
      // setEmail("");
      // setPassword("");
      // e.target[0].value = "";
      // e.target[1].value = "";
    }
  }
  return (
    <div className="formBody">
      <div className="formHolder">
        <AppBar
          position="sticky"
          style={{ backgroundColor: "#15213a", marginBottom: 12, marginTop: 0 }}
        >
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Log in</Typography>
            <IconButton onClick={() => {}}>
              <FaTimes color="white" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form className="signUpForm" onSubmit={formHadler}>
          {msg ? (
            <div>
              <Alert severity="error">{msg}</Alert>
            </div>
          ) : (
            ""
          )}
          <div>
            <i>
              <FaMailBulk />
            </i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
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
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
        <Link to="/signup" style={{textDecoration:"none"}}>
          <Button variant="outlined">Register</Button>
        </Link>
      </div>
    </div>
  );
}
