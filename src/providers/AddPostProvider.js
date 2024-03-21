import React from "react";
import { db, storage } from "../Firebase_config";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const PostContext = React.createContext();
export const usePost = () => React.useContext(PostContext);
export function PostProvider({ children }) {
  function postChecker(title, body) {
    if (title === "" || body === "") {
      return false;
    } else if (!window.navigator.onLine) {
      return false;
    } else {
      return true;
    }
  }
  function imageChecker(image) {
    if (image.length !== 0) {
      const name = image.name;
      if (
        name.endsWith(".png") ||
        name.endsWith(".jpeg") ||
        name.endsWith(".jpg") ||
        name.endsWith(".gif")
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function fileChecker(file) {
    if (file.length !== 0) {
      const name = file.name;
      if (
        name.endsWith(".docx") ||
        name.endsWith(".xlsx") ||
        name.endsWith(".pdf") ||
        name.endsWith(".png") ||
        name.endsWith(".jpg") ||
        name.endsWith(".jpeg")
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  async function postData(data, dbRef) {
    await addDoc(dbRef, data);
  }
  async function updateData(data, dbRef) {
    const id = data.id;
    const docRef = doc(db, data.type, id);
    delete data.id;
    delete data.type;
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      console.log("!!->" + error.message);
    }
  }
  function uploadData(file, data, dbRef, isFile, isUpdate) {
    const folder = isFile ? "/Files/" : "/Images/";
    const fileName = file.name;
    const storageRef = ref(storage, folder + file.name);
    const upladTask = uploadBytesResumable(storageRef, file);
    upladTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {},
      () => {
        getDownloadURL(upladTask.snapshot.ref).then((url) => {
          const newData = {
            ...data,
            url,
            fileName,
          };
          isUpdate ? updateData(newData, dbRef) : postData(newData, dbRef);
        });
      }
    );
  }
  function getDate() {
    const monthName = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const finalDate = monthName[month] + " " + day + ", " + year;

    return finalDate;
  }

  const values = {
    postData,
    updateData,
    uploadData,
    postChecker,
    imageChecker,
    fileChecker,
    getDate,
  };
  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
}
