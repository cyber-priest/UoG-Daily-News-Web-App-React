import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { PageProvider, usePage } from "../providers/PageProvider";
import { useNews } from "../providers/DataProvider";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
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

export function News() {
  const [newsData, setNewsData] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const { fetchNews } = useNews();
  async function fetchData() {
    fetchNews().then((data) => {
      setNewsData([...new Set([...newsData, ...data])]);
    });
  }
  useEffect(() => {
    fetchNews().then((data) => {
      setNewsData(data);
      setSliderData(data);
    });
  }, []);
  return (
    <Container maxWidth="sm">
      {sliderData.length !== 0 ? (
        <>
          <Typography variant="h6" style={{ marginBottom: 10 }}>
            Latest News
          </Typography>
          <Carousel
            autoPlay={true}
            centerMode={true}
            centerSlidePercentage={70}
            infiniteLoop={true}
            dynamicHeight={false}
            emulateTouch={true}
          >
            {sliderData?.map((data) => (
              <Card style={{ marginRight: 10, height: 250,  backgroundColor:"#ebebeb" }}>
                <CardMedia
                  component="img"
                  height="150"
                  src={data.url}
                  alt="image"
                />
                <CardContent>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    style={{ textAlign: "justify", margin: 5 }}
                  >
                    {shortTitle(data.title)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Carousel>
        </>
      ) : (
        ""
      )}
      <InfiniteScroll
        dataLength={newsData.length}
        next={fetchData}
        hasMore={true}
        loader={
          <p className="loader" key={0} style={{ textAlign: "center" }}>
            <CircularProgress color="secondary" />
          </p>
        }
      >
        {newsData.map((news) => (
          <NewsCard {...news} />
        ))}
      </InfiniteScroll>
    </Container>
  );
}

export function NewsCard(prop) {
  return (
    <Card style={{ marginBottom: 20, backgroundColor:"#ebebeb" }}>
      <CardMedia
        component="img"
        height="220"
        src={prop.url}
        alt={prop.fileName}
      />
      <Typography
        variant="h6"
        color="black"
        style={{
          textAlign: "center",
          margin: 15,
          marginTop: 25,
          fontFamily: "Montserrat",
        }}
      >
        {prop.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body1"
          color="text.primary"
          style={{ textAlign: "justify", margin: 15 }}
        >
          {prop.body}
        </Typography>
      </CardContent>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {prop.poster[0]}
          </Avatar>
        }
        action={
          <IoNewspaper
            size={25}
            style={{
              padding: 20,
              color: "#ff2c2c",
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
  );
}

function shortTitle(title) {
  var newTitle;
  if (title.length > 60) {
    newTitle = title.substring(0, 60) + "....";
  } else {
    newTitle = title;
  }
  return newTitle;
}
