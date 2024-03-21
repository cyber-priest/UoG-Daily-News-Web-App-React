import InfiniteScroll from "react-infinite-scroll-component";
import { Container, CircularProgress } from "@mui/material";
import { useSearch } from "../providers/DataProvider";
import { NewsCard } from "../components/News";
import React, { useEffect, useState } from "react";
import { FaSadTear } from "react-icons/fa";

export function Search() {
  const { searchData, searchWord } = useSearch();
  const [data, setData] = useState([1]);
  useEffect(() => {
    searchData().then((data) => {
      setData(data);
    });
  }, [searchWord]);
  return (
    <div className="search">
      <Container maxWidth="sm" style={{ marginTop: 60 }}>
        {data && data[0] === 1 ? (
          <p style={{ textAlign: "center" }}>
            <CircularProgress color="secondary" />
          </p>
        ) : data.length === 0 ? (
          <NoSearchResult />
        ) : (
          data.map((news) => <NewsCard {...news} />)
        )}
      </Container>
    </div>
  );
}

function NoSearchResult() {
  return (
    <div style={{ textAlign: "center" }}>
      <FaSadTear size={100} color="grey" />
      <h4>Oops! no result found, </h4>
    </div>
  );
}
