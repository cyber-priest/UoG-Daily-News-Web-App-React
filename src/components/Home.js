import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PageProvider, usePage } from "../providers/PageProvider";
import { FaHome, FaPhoneAlt, FaUser, FaUserPlus } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";
import { MdPushPin, MdContactPhone } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
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
} from "@mui/material";

export default function Home() {
  const { pages, page, setPage } = usePage();
  const values = { page, setPage };
  return (
    <Container maxWidth="sm">
      <Container style={{ marginBottom: 30 }}>

      </Container>
     
    </Container>
  );
}
