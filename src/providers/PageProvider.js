import React from "react";
import { Dashboard } from "../components/Dashboard";
import { News } from "../components/News";
import { Post } from "../components/Post";
import { Schedule } from "../components/Schedule";
import { Profile } from "../components/Profile";
import { ContactUs } from "../components/ContactUs";
import { About } from "../components/About";
import { Search } from "../components/Search";
import {
  PostProvider,
  NewsProvider,
  ScheduleProvider,
  ProfileProvider,
} from "../providers/DataProvider";
import Home from "../components/Home";

const PageContext = React.createContext();
export const usePage = () => React.useContext(PageContext);
export function PageProvider({ children }) {
  const pages = [
    <NewsProvider>
      <News />
    </NewsProvider>,
    <PostProvider>
      <Post />
    </PostProvider>,
    <ScheduleProvider>
      <Schedule />
    </ScheduleProvider>,
    <ProfileProvider>
      <Profile />
    </ProfileProvider>,
    <Search />,
  ];
  const [page, setPage] = React.useState(0);
  const values = {
    pages,
    page,
    setPage,
  };
  return <PageContext.Provider value={values}>{children}</PageContext.Provider>;
}
