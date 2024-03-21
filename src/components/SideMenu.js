import {
  FaUserAltSlash,
  FaBars,
  FaChartBar,
  FaHome,
  FaRight,
  FaInfoCircle,
  FaPhoneSquare,
} from "react-icons/fa";
import { useAuth } from "../providers/AuthProvider";
import { BsChevronRight } from "react-icons/bs";
import { FcBarChart, FcNews } from "react-icons/fc";
import { IoNewspaper } from "react-icons/io5";
import { TiCloudStorage, TiGroup } from "react-icons/ti";
import { AiFillDashboard, AiFillSchedule, AiFillBug } from "react-icons/ai";
import { MdPushPin } from "react-icons/md";
import { useState } from "react";
import { Button, CardHeader, Avatar } from "@mui/material";
import { usePage } from "../providers/PageProvider";

export function SideMenu({}) {
  return <Menu />;
}

function Menu() {
  const { user, logOut } = useAuth();
  const iSize = 18;
  return (
    <div className="sideMenu">
      <div className="header">
        <FaBars className="bars" />
        <span className="title">UoG-Daily</span>
      </div>
      <div className="menu">
        <p>Menu</p>
        <MenuContent index={0} icon={<FaHome size={iSize} />} text="Home" />
        <MenuContent
          index={1}
          icon={<IoNewspaper size={iSize} />}
          text="News"
        />
        <MenuContent index={2} icon={<MdPushPin size={iSize} />} text="Post" />
        <MenuContent
          index={3}
          icon={<AiFillSchedule size={iSize} />}
          text="Schedule"
        />
        <p>Other</p>
        {user ? (
          <MenuContent
            index={4}
            icon={<TiGroup size={iSize} />}
            text="Profile"
          />
        ) : (
          ""
        )}
        <MenuContent
          index={5}
          icon={<FaPhoneSquare size={iSize} />}
          text="Contact us"
        />
        <MenuContent
          index={6}
          icon={<FaInfoCircle size={iSize} />}
          text="About"
        />
      </div>
      {user ? (
        <div className="footer">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe"></Avatar>
            }
            title={user?.displayName}
            subheader={user?.email}
          />
          <Button
            variant="outlined"
            startIcon={<FaUserAltSlash />}
            onClick={() => logOut()}
          >
            Log out
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function MenuContent({ index, icon, text }) {
  const { setPageName, page, setPage } = usePage();
  return (
    <div
      className="content"
      style={
        index === page
          ? {
              backgroundColor: "#0c111f",
              color: "#3e60e7",
              borderLeft: "solid 4px #3e60e7",
            }
          : { color: "white" }
      }
      onClick={() => {
        setPage(index);
        setPageName(text);
      }}
    >
      <div>
        {icon}
        <span>{text}</span>
      </div>
      {index === page ? <BsChevronRight size={17} /> : ""}
    </div>
  );
}
