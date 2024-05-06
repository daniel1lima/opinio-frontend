import React, { useState } from "react";
import { Box, Fab, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery, useGetCompanyIdQuery } from "state/api";
import { useEffect } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import SpeedDialTooltipOpen from "components/SpeedDialMUI";
import { Google } from "@mui/icons-material";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dont matter, I just hvave to noiw use userID to check the database and return the data and then it will give me what I need to fill in everything!
  const { userId } = useAuth();
  const { user } = useUser();
  const userFromDb = useGetUserQuery(userId).data;
  const company = useGetCompanyIdQuery(userFromDb?.company_id).data;

  // console.log("userId", userFromDb);
  // console.log("company", company)

  // console.log('data', data);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        ID={userId}
        clerkUser={user}
        companyDB={company}
        userDB={userFromDb || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          company={company || {}}
          user={userFromDb || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        
        <Outlet />
        <SpeedDialTooltipOpen />
      </Box>
    </Box>
  );
};

export default Layout;
