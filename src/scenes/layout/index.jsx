import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery, useGetCompanyIdQuery } from "state/api";
import { useAuth, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { userId } = useAuth();
  const { user } = useUser();
  const userFromDb = useGetUserQuery(userId).data;
  const company = useGetCompanyIdQuery(userFromDb?.company_id, {
    skip: !userFromDb?.company_id,
  }).data;
  const [active, setActive] = useState("");

  localStorage.setItem("user_id", userId);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        ID={userId}
        clerkUser={user}
        companyDB={company}
        userDB={userFromDb || {}}
        isNonMobile={isNonMobile}
        drawerWidth="220px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        active={active}
        setActive={setActive}
      />
      <Box flexGrow={1}>
        {active !== "inbox" && (
          <Navbar
            company={company || {}}
            user={userFromDb || {}}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            active={active}
            setActive={setActive}
          />
        )}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
