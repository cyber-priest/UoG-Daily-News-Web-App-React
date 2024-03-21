import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSchedule } from "../providers/DataProvider";
import { PageProvider, usePage } from "../providers/PageProvider";
import { FaDownload, FaFile, FaHome, FaPhoneAlt } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
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

export function Schedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const { fetchSchedule } = useSchedule();
  async function fetchData() {
    fetchSchedule().then((data) => {
      setScheduleData([...new Set([...scheduleData, ...data])]);
    });
  }
  useEffect(() => {
    fetchSchedule().then((data) => {
      setScheduleData(data);
    });
  }, []);
  return (
    <Container maxWidth="sm">
      <InfiniteScroll
        dataLength={scheduleData.length}
        next={fetchData}
        hasMore={true}
        loader={
          <p className="loader" key={0} style={{ textAlign: "center" }}>
            <CircularProgress color="secondary" />
          </p>
        }
      >
        {scheduleData.map((schedule) => (
          <ScheduleCard {...schedule} />
        ))}
      </InfiniteScroll>
    </Container>
  );
}

function ScheduleCard(prop) {
  return (
    <Container style={{ marginBottom: 20 }}>
      <Card style={{ marginBottom: 20 }}>
        <Typography
          variant="h6"
          color="black"
          style={{
            textAlign: "center",
            margin: 15,
            marginTop: 25,
            marginBottom: 0,
            fontFamily: "Montserrat",
          }}
        >
          {prop.title}
        </Typography>
        <CardContent>
          <Typography
            variant="body1"
            color="text.secondary"
            style={{ textAlign: "justify", margin: 15 }}
          >
            {prop.body}
          </Typography>
        </CardContent>
        {prop.url !== "no" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 10,
              margin: 20,
            }}
          >
            <div>
              <FaFile
                size={25}
                style={{
                  padding: 20,
                  color: "black",
                  // backgroundColor: "white",
                }}
              />
            </div>
            <div>
              <Typography
                variant="body1"
                style={{
                  color: "black",
                  textAlign: "justify",
                  marginBottom: 12,
                }}
              >
                {prop.fileName}
              </Typography>
              <a href={prop.url} style={{ textDecoration: "none" }} download>
                <Button
                  variant="contained"
                  // style={{ color: "#0e1729" }}
                  startIcon={<BsDownload size={25} />}
                >
                  Download File
                </Button>
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#14ffb1" }} aria-label="recipe">
              {prop.poster[0]}
            </Avatar>
          }
          action={
            <AiFillSchedule
              size={25}
              style={{
                padding: 20,
                color: "#14ffb1",
                backgroundColor: "white",
                borderRadius: 100,
                zIndex: 4,
              }}
            />
          }
          title={prop.poster}
          subheader={prop.date}
        />
      </Card>
    </Container>
  );
}
