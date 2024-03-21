import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useProfile } from "../providers/DataProvider";
import {
  Container,
  Card,
  Typography,
  Avatar,
  CardHeader,
  Button,
  ButtonGroup,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { FaImage, FaImages, FaPencilAlt, FaTrash } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";

export function Profile() {
  const { user } = useAuth();
  const { fetchData, deleteData } = useProfile();
  const [newsData, setNewsData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteItem, setDeletItem] = useState({});

  useEffect(() => {
    fetchData("News", user.displayName).then((data) => {
      setNewsData(data);
    });
    fetchData("Post", user.displayName).then((data) => {
      setPostData(data);
    });
    fetchData("Schedule", user.displayName).then((data) => {
      setScheduleData(data);
    });
    console.log(newsData);
  }, []);
  return user ? (
    <Container maxWidth="md" style={{ marginTop: 60 }}>
      <Container maxWidth="sm">
        <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
          <DialogTitle>
            Are your sure, you want to delete this post?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The post will be permanently deleted from the database, please
              make sure if you want delete it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={async () => deleteData(deleteItem.id, deleteItem.type)}
            >
              Delete
            </Button>
            <Button onClick={() => setShowDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
        {user ? (
          <Card style={{ padding: 20, marginBottom: 20 }}>
            <CardHeader
              avatar={
                <Avatar style={{ backgroundColor: "#0e1729" }}>
                  {user.displayName[0]}
                </Avatar>
              }
              title={<Typography variant="h6">{user.displayName}</Typography>}
              subheader={user?.email}
              action={
                <Button
                  variant="outlined"
                  startIcon={<FaPencilAlt size={16} />}
                  onClick={() => setShowDialog(true)}
                >
                  Edit
                </Button>
              }
            />
          </Card>
        ) : (
          ""
        )}
        <Typography variant="h6">Your Latest Activities</Typography>
        {newsData.length !== 0 ? (
          <Typography variant="body1" fontWeight={600} marginTop={2}>
            News
          </Typography>
        ) : (
          ""
        )}
        {newsData
          ? newsData.map((news) => (
              <Activity
                type="News"
                data={news}
                setDialog={setShowDialog}
                setDelete={setDeletItem}
              />
            ))
          : ""}
        {postData.length !== 0 ? (
          <Typography variant="body1" fontWeight={600} marginTop={2}>
            Posts
          </Typography>
        ) : (
          ""
        )}
        {postData
          ? postData.map((post) => (
              <Activity
                type="Post"
                data={post}
                setDialog={setShowDialog}
                setDelete={setDeletItem}
              />
            ))
          : ""}
        {scheduleData.length !== 0 ? (
          <Typography variant="body1" fontWeight={600} marginTop={2}>
            Schedules
          </Typography>
        ) : (
          ""
        )}
        {scheduleData
          ? scheduleData.map((schedule) => (
              <Activity
                type="Schedule"
                data={schedule}
                setDialog={setShowDialog}
                setDelete={setDeletItem}
              />
            ))
          : ""}
      </Container>
    </Container>
  ) : (
    <></>
  );
}

function Activity({ data, setDialog, setDelete }) {
  const navigate = useNavigate();
  return (
    <Card style={{ padding: 10, marginBottom: 5 }} id={data.id}>
      <CardHeader
        avatar={
          data.type !== "Schedule" && data.url !== "no" ? (
            <img height={70} width={80} src={data.url} />
          ) : (
            <FaImages size={70} color="grey" />
          )
        }
        title={
          <Typography variant="body1" textOverflow="ellipsis">
            {data.title}
          </Typography>
        }
        action={
          <ButtonGroup>
            <IconButton
              onClick={() => {
                navigate("/addpost", { state: data });
              }}
            >
              <FaPencilAlt size={16} />
            </IconButton>
            <IconButton
              variant="outlined"
              onClick={() => {
                setDialog(true);
                setDelete({ id: data.id, type: data.type });
              }}
            >
              <FaTrash size={16} />
            </IconButton>
          </ButtonGroup>
        }
      />
    </Card>
  );
}
