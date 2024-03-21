import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePost } from "../providers/DataProvider";
import { MdPushPin, MdContactPhone } from "react-icons/md";
import { PageProvider, usePage } from "../providers/PageProvider";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import {
  Alert,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";

export function Post() {
  const [postData, setPostData] = useState([]);
  const { fetchPost } = usePost();
  async function fetchData() {
    fetchPost().then((data) => {
      setPostData([...new Set([...postData, ...data])]);
      console.log(data);
    });
  }
  useEffect(() => {
    fetchPost().then((data) => {
      setPostData(data);
    });
  }, []);
  return (
      <Container maxWidth="sm">
        <InfiniteScroll
          dataLength={postData.length}
          next={fetchData}
          hasMore={true}
          loader={
            <p className="loader" key={0} style={{ textAlign: "center" }}>
              <CircularProgress color="secondary" />
            </p>
          }
        >
          {postData.map((post) => (
            <PostCard {...post} />
          ))}
        </InfiniteScroll>
      </Container>
  );
}

function PostCard(prop) {
  return (
    <Container id={prop.id}>
      <h6 style={{ textAlign: "center", marginBottom: -25 }}>
        <MdPushPin
          size={25}
          style={{
            padding: 20,
            color: "#c44e00",
            backgroundColor: "white",
            borderRadius: 100,
            zIndex: 0,
          }}
        />
      </h6>
      <Card style={{}}>
        <CardContent>
          <Typography
            variant="h6"
            color="black"
            style={{ textAlign: "center", margin: 15 }}
          >
            {prop.title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            style={{ textAlign: "justify", padding: 10 }}
          >
            {prop.body}
          </Typography>
        </CardContent>
        {prop.url !== "no" ? (
          <CardMedia component="img" height="220" src={prop.url} alt="image" />
        ) : (
          ""
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#c44e00" }} aria-label="recipe">
              {prop.poster[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MdPushPin style={{ color: "#c44e00" }} />
            </IconButton>
          }
          title={prop.poster}
          subheader={prop.date}
        />
      </Card>
    </Container>
    // </Stack>
  );
}
