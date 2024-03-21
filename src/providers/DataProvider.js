import React, { useState } from "react";
import {
  getDocs,
  collection,
  query,
  limit,
  startAt,
  startAfter,
  orderBy,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebase_config";

const NewsContext = React.createContext();
const PostContext = React.createContext();
const ScheduleContext = React.createContext();
const ProfileContext = React.createContext();
const SearchContext = React.createContext();
export const useNews = () => React.useContext(NewsContext);
export const usePost = () => React.useContext(PostContext);
export const useSchedule = () => React.useContext(ScheduleContext);
export const useProfile = () => React.useContext(ProfileContext);
export const useSearch = () => React.useContext(SearchContext);

export function NewsProvider({ children }) {
  const [start, setStart] = useState({});
  async function fetchNews() {
    const newsRef = query(
      collection(db, "News"),
      orderBy("createdAt", "desc"),
      start ? startAfter(start) : null,
      limit(5)
    );
    const rawData = await getDocs(newsRef);
    const starter = rawData.docs[rawData.docs.length - 1];
    setStart(starter);
    const data = rawData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  }
  const value = {
    fetchNews,
  };
  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function PostProvider({ children }) {
  const [start, setStart] = useState({});

  async function fetchPost() {
    const postRef = query(
      collection(db, "Post"),
      orderBy("createdAt", "desc"),
      limit(5),
      start ? startAfter(start) : null
    );
    const rawData = await getDocs(postRef);
    const starter = rawData.docs[rawData.docs.length - 1];
    setStart(starter);
    const data = rawData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  }
  const value = {
    fetchPost,
  };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export function ScheduleProvider({ children }) {
  const [start, setStart] = useState({});
  async function fetchSchedule() {
    const scheduleRef = query(
      collection(db, "Schedule"),
      orderBy("createdAt", "desc"),
      limit(5),
      start ? startAfter(start) : null
    );
    const rawData = await getDocs(scheduleRef);
    const starter = rawData.docs[rawData.docs.length - 1];
    setStart(starter);
    const data = rawData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  }
  const value = {
    fetchSchedule,
  };
  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function ProfileProvider({ children }) {
  async function fetchData(type, user) {
    const ref = query(
      collection(db, type),
      where("poster", "==", user),
      orderBy("createdAt", "desc"),
      limit(4)
    );
    const rawData = await getDocs(ref);
    const data = rawData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  }
  async function deleteData(id, type) {
    const docRef = doc(db, type, id);
    await deleteDoc(docRef);
  }
  const value = { fetchData, deleteData };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function SearchProvider({ children }) {
  const [searchWord, setSearchWord] = useState("");
  const [currentType, setType] = useState("News");
  async function fetchSearch() {
    const ref = query(
      collection(db, currentType),
      orderBy("createdAt", "desc"),
      limit(100)
    );
    const rawData = await getDocs(ref);
    const data = rawData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return data;
  }
  async function searchData(type) {
    var newData = [];
    const data = await fetchSearch(type);
    data.map((doc) => {
      const title = doc.title.toLowerCase();
      const body = doc.body.toLowerCase();
      const titleIndex = title.indexOf(searchWord.toLowerCase());
      const bodyIndex = body.indexOf(searchWord.toLowerCase());
      if (titleIndex !== -1 || bodyIndex !== -1) {
        newData.push(doc);
      }
    });
    return newData;
  }
  const value = { searchData, searchWord, setSearchWord, setType };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
