import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, Timestamp } from "firebase/firestore";
import { auth, db, storage } from "../Firebase_config";
import { PostProvider, usePost } from "../providers/AddPostProvider";
import { FaTimes, FaFile, FaImage, FaPen } from "react-icons/fa";
import {
  Container,
  Button,
  Alert,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import { IoSend } from "react-icons/io5";

export default function AddPost({}) {
  return (
    <PostProvider>
      <Container maxWidth="lg" className="addPostBody">
        <AppBar
          position="sticky"
          style={{
            backgroundColor: "#15213a",
            marginBottom: 12,
            marginTop: 0,
          }}
        >
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Typography variant="h6">
              <FaPen size={15} style={{ marginRight: 20 }} />
              Create Post
            </Typography>
            <Link to="/">
              <IconButton>
                <FaTimes color="white" />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <Container className="addPost" maxWidth="md">
          <PostContainer />
        </Container>
      </Container>
    </PostProvider>
  );
}

function PostContainer({}) {
  const { state } = useLocation();
  const [isUpdate, setIsUpdate] = useState(state ? true : false);
  const [msg, setMsg] = useState("");
  const [postType, setType] = useState(isUpdate ? state.type : "News");
  const [target, setTarget] = useState(isUpdate ? state.target : "All");
  const [campuse, setCampuse] = useState(isUpdate ? state.campuse : "All");
  const [fileData, setFile] = useState([]);
  const [isBreaking, setIsBreaking] = useState(false);
  const [url, setUrl] = React.useState("no");
  const [fileName, setFileName] = useState(
    isUpdate ? "Change image" : "Add image"
  );
  const [title, setTitle] = useState(isUpdate ? state.title : "");
  const [body, setBody] = useState(isUpdate ? state.body : "");
  const [uploading, setUploading] = React.useState(false);
  const dbRef = collection(db, postType);
  const {
    postData,
    updateData,
    uploadData,
    postChecker,
    imageChecker,
    fileChecker,
    getDate,
  } = usePost();
  const date = getDate();
  async function formHandler(e) {
    e.preventDefault();
    const reset = () => {
      setTitle("");
      setBody("");
      setFile([]);
      setIsBreaking(false);
      setFileName("Add image");
      setMsg(isUpdate ? "Succussfully Updated!" : "Succussfully Posted!");
      setUploading(false);
      e.target[3].value = "";
      e.target[4].value = "";
      e.target[5].value = "";
    };
    const fileCheck = fileChecker(fileData);
    const imageCheck = imageChecker(fileData);
    const postCheck = postChecker(title, body);
    var data = {
      poster: auth.currentUser.displayName,
      target,
      campuse,
      title,
      body,
      url,
      date,
      fileName:
        fileName != "Add image" || fileName != "Change image" ? fileName : null,
      posterId: auth.currentUser.uid,
      createdAt: Timestamp.fromDate(new Date()),
    };
    const updatedData = {
      ...state,
      target,
      campuse,
      title,
      body,
    };
    if (postType == "News") {
      data = { ...data, breaking: isBreaking };
    }
    if (postCheck) {
      setUploading(true);
      setMsg("");
      if (postType !== "Schedule") {
        if (fileData.length !== 0) {
          if (imageCheck) {
            if (isUpdate) {
              uploadData(fileData, updatedData, dbRef, false, isUpdate);
            } else {
              uploadData(fileData, data, dbRef, false, isUpdate);
            }
            reset();
          } else {
            setMsg("Error: Unsupported image file! please try again.");
            setUploading(false);
          }
        } else {
          if (isUpdate) {
            updateData(updatedData, dbRef);
          } else {
            postData(data, dbRef);
          }

          reset();
        }
      } else {
        if (fileData) {
          if (fileCheck) {
            if (isUpdate) {
              uploadData(fileData, updatedData, dbRef, true, isUpdate);
            } else {
              uploadData(fileData, data, dbRef, true, isUpdate);
            }
            reset();
          } else {
            setMsg("Error: Unsupported file! please try again.");
            setUploading(false);
          }
        } else {
          if (isUpdate) {
            updateData(updatedData, dbRef);
          } else {
            postData(data, dbRef);
          }
          reset();
        }
      }
    } else {
      setMsg("Error: Please make sure to fill the title and the body.");
      setUploading(false);
    }
  }
  if (state) {
    return (
      <div className="postContainer">
        <form onSubmit={formHandler}>
          {msg ? (
            msg.search("Succ") !== -1 ? (
              <Alert severity="success">{msg}</Alert>
            ) : (
              <Alert severity="error">{msg}</Alert>
            )
          ) : (
            ""
          )}
          <div className="section">
            <div>
              <p>Target:</p>
              <select name="target" onChange={(e) => setTarget(e.target.value)}>
                <option
                  value="All"
                  selected={state.target === "All" ? true : false}
                >
                  All
                </option>
                <option
                  value="Student"
                  selected={state.target === "Student" ? true : false}
                >
                  Student
                </option>
                <option
                  value="Teacher"
                  selected={state.target === "Teacher" ? true : false}
                >
                  Teacher
                </option>
                <option
                  value="Staff"
                  selected={state.target === "Staff" ? true : false}
                >
                  Staff
                </option>
              </select>
            </div>
            <div>
              <p>Campuse:</p>
              <select
                name="campuse"
                onChange={(e) => setCampuse(e.target.value)}
              >
                <option
                  value="All"
                  selected={state.campuse === "All" ? true : false}
                >
                  All
                </option>
                <option
                  value="Tewodros"
                  selected={state.campuse === "Tewodros" ? true : false}
                >
                  Tewodros
                </option>
                <option
                  value="Fasile"
                  selected={state.campuse === "Fasile" ? true : false}
                >
                  Fasil
                </option>
                <option
                  value="Maraki"
                  selected={state.campuse === "Maraki" ? true : false}
                >
                  Maraki
                </option>
                <option
                  value="Gc"
                  selected={state.campuse === "Gc" ? true : false}
                >
                  Gc
                </option>
                <option
                  value="Teda"
                  selected={state.campuse === "Teda" ? true : false}
                >
                  Teda
                </option>
              </select>
            </div>
          </div>
          <input
            placeholder="Title...."
            type="text"
            defaultValue={state.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            defaultValue={state.body}
            placeholder="Body....."
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
          <div className="uploader">
            <input
              type={"file"}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileName(e.target.files[0].name);
              }}
              id="imageUp"
              style={{ display: "none" }}
            />
            <label
              htmlFor="imageUp"
              className="upload"
              style={{ cursor: "pointer", width: "100%" }}
            >
              <div>
                {postType === "Schedule" ? (
                  <FaFile
                    size={20}
                    style={{
                      marginRight: 20,
                      color: "#ff2626",
                    }}
                  />
                ) : (
                  <FaImage
                    size={20}
                    style={{
                      marginRight: 20,
                      color: "#ff2626",
                    }}
                  />
                )}
                <span>{fileName}</span>
              </div>
            </label>
          </div>
          <div className="btnHolder">
            <Button
              disabled={uploading}
              variant="contained"
              startIcon={<IoSend size={14} />}
              className="submit-btn"
              size="large"
              type="submit"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="postContainer">
        <form onSubmit={formHandler}>
          {msg ? (
            msg.search("Succ") !== -1 ? (
              <Alert severity="success">{msg}</Alert>
            ) : (
              <Alert severity="error">{msg}</Alert>
            )
          ) : (
            ""
          )}
          <div className="section">
            <div>
              <p>Type:</p>
              <select
                name="type"
                onChange={(e) => {
                  const value = e.target.value;
                  setType(value);
                  if (value === "Schedule") {
                    setFileName("Add File");
                  } else {
                    setFileName("Add image");
                  }
                }}
              >
                <option value="News">News</option>
                <option value="Post">Post</option>
                <option value="Schedule">Schedule</option>
              </select>
            </div>
            <div>
              <p>Target:</p>
              <select name="target" onChange={(e) => setTarget(e.target.value)}>
                <option value="All">All</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div>
              <p>Campuse:</p>
              <select
                name="campuse"
                onChange={(e) => setCampuse(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Tewodros">Tewodros</option>
                <option value="Fasile">Fasil</option>
                <option value="Maraki">Maraki</option>
                <option value="Gc">Gc</option>
                <option value="Teda">Teda</option>
              </select>
            </div>
          </div>
          <input
            placeholder="Title...."
            type="text"
            // placeholder="Title....."
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Body....."
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          {postType == "News" ? (
            <div>
              <Checkbox
                checked={isBreaking}
                onChange={(e) => {
                  setIsBreaking(!isBreaking);
                }}
              ></Checkbox>
              <span>Breaking News</span>
            </div>
          ) : (
            ""
          )}
          <div className="uploader">
            <input
              type={"file"}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileName(e.target.files[0].name);
              }}
              id="imageUp"
              style={{ display: "none" }}
            />
            <label
              htmlFor="imageUp"
              className="upload"
              style={{ cursor: "pointer", width: "100%" }}
            >
              <div>
                {postType === "Schedule" ? (
                  <FaFile
                    size={20}
                    style={{
                      marginRight: 20,
                      color: "#ff2626",
                    }}
                  />
                ) : (
                  <FaImage
                    size={20}
                    style={{
                      marginRight: 20,
                      color: "#ff2626",
                    }}
                  />
                )}
                <span>{fileName}</span>
              </div>
            </label>
          </div>
          <div className="btnHolder">
            <Button
              disabled={uploading}
              variant="contained"
              startIcon={<IoSend size={14} />}
              className="submit-btn"
              size="large"
              type="submit"
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
