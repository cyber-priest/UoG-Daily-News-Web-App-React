import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePage } from "../providers/PageProvider";
import { useSearch } from "../providers/DataProvider";
import { Search } from "../components/Search";
import { useAuth } from "../providers/AuthProvider";
import AddPost from "./AddPost";
import { IoNewspaper } from "react-icons/io5";
import { MdPushPin } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import { FcAndroidOs } from "react-icons/fc";
import { BsDownload } from "react-icons/bs";
import Icon from "../assets/images/Icon.png";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Card,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Container,
} from "@mui/material";
import {
  FaHome,
  FaAndroid,
  FaPen,
  FaSearch,
  FaUser,
  FaUserAltSlash,
  FaUserPlus,
} from "react-icons/fa";
import { SideMenu } from "../components/SideMenu";

export default function Panel() {
  const { pages, page, setPage } = usePage();
  const [word, setWord] = useState("");
  const { user, logOut } = useAuth();
  const { setSearchWord, setType } = useSearch();
  const [navValue, setNavValue] = useState(0);
  const currentTypes = ["News", "Post", "Schedule"];
  const iSize = 25;

  return (
    <>
      <Container
        style={{
          position: "fixed",
          height: "100%",
          top: 0,
          width: 400,
          paddingTop: 50,
          backgroundColor: "white",
        }}
      >
        <div style={{ display: "flex" }}>
          {/* <Typography>Welcome to UoG-Daily</Typography> */}
          <img src="https://firebasestorage.googleapis.com/v0/b/uog-daily-34dfd.appspot.com/o/Static%2Fundraw_personal_finance_tqcd.png?alt=media&token=11604c76-b551-4b36-b4dd-f2d16b83fe76" />
        </div>
        <h4
          style={{ position: "absolute", top: 200, left: 230, color: "black" }}
        >
          Welcome
        </h4>
        <Box
          style={{
            width: 300,
            padding: 20,
            marginTop: 1,
            backgroundColor: "white",
          }}
        >
          <Typography style={{ textAlign: "center" }}>
            <FaAndroid
              size={40}
              style={{
                color: "white",
                padding: 20,
                backgroundColor: "#15213a",
                borderRadius: 100,
              }}
            />
          </Typography>
          <Typography style={{ textAlign: "center" }}>
            We Also have an app for Android users
            <Button
              style={{ marginTop: 10 }}
              variant="outlined"
              startIcon={<BsDownload size={25} />}
            >
              Download
            </Button>
          </Typography>
        </Box>
      </Container>
      <Container maxWidth="md" style={{ position: "absolute", right: 70 }}>
        <AppBar
          position="sticky"
          style={{
            color: "black",
            backgroundColor: "#0e1729",
            marginBottom: 12,
            // borderRadius: 30,
          }}
        >
          <Toolbar style={{ justifyContent: "space-between" }}>
            <img src={Icon} height={70} />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchWord(word);
                setPage(4);
              }}
            >
              <Box sx={{ minWidth: 120, display: "flex" }}>
                <input
                  placeholder="Search......"
                  onChange={(e) => {
                    setWord(e.target.value);
                  }}
                  style={{
                    padding: 12,
                    border: "none",
                    color: "white",
                    backgroundColor: "#00000023",
                  }}
                ></input>
                <Button
                  type="submit"
                  style={{
                    padding: 10,
                    color: "white",
                    backgroundColor: "#00000043",
                    borderRadius: 0,
                  }}
                >
                  <FaSearch size={20} />
                </Button>
              </Box>
            </form>
            <div className="nav-tools">
              {user ? (
                ""
              ) : (
                <>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button variant="outlined" startIcon={<FaUser />}>
                      Log in
                    </Button>
                  </Link>
                  {/* <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Button variant="outlined" startIcon={<FaUserPlus />}>
                      Sign Up
                    </Button>
                  </Link> */}
                </>
              )}
              {user ? (
                <>
                  <Link to="/addpost">
                    <Button startIcon={<FaPen />} variant="outlined">
                      Add Post
                    </Button>
                  </Link>
                </>
              ) : (
                ""
              )}
            </div>
          </Toolbar>
        </AppBar>
        {pages[page]}
        <Container maxWidth="sm">
          <BottomNavigation
            value={navValue}
            onChange={(e, val) => {
              setNavValue(val);
              setPage(val);
              if (val < 3) {
                setType(currentTypes[val]);
                console.log(currentTypes[val]);
              }
            }}
            sx={{ width: 504 }}
            style={{
              position: "fixed",
              bottom: 0,
              backgroundColor: "#15213a",
              marginLeft: 24,
              fontSize: 12,
            }}
          >
            <BottomNavigationAction
              style={{ color: "white" }}
              label="News"
              value={0}
              icon={<IoNewspaper size={iSize} />}
            />
            <BottomNavigationAction
              style={{ color: "white" }}
              label="Post"
              value={1}
              icon={<MdPushPin size={iSize} />}
            />
            <BottomNavigationAction
              style={{ color: "white" }}
              label="Schedule"
              value={2}
              icon={<AiFillSchedule size={iSize} />}
            />
            <BottomNavigationAction
              style={{ color: "white", fontFamily: "Montserrat" }}
              label="Profile"
              value={3}
              icon={<FaUser size={iSize} />}
            />
          </BottomNavigation>
        </Container>
      </Container>
    </>
  );
}
