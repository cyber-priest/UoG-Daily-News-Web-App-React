import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Panel from "./pages/Panel";
import "@fontsource/montserrat";
import "./App.css";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import AddPost from "./pages/AddPost";
import { AuthProvider } from "./providers/AuthProvider";
import { SearchProvider } from "./providers/DataProvider";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <SearchProvider>
                <Panel />
              </SearchProvider>
            </AuthProvider>
          }
        />
        <Route
          path="/login"
          element={
            <AuthProvider>
              <LogIn />
            </AuthProvider>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthProvider>
              <SignUp />
            </AuthProvider>
          }
        />
        <Route
          path="/addpost"
          element={
            <AuthProvider>
              <AddPost />
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
