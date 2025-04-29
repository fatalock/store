import { Box, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function DashboardLayout() {
  // Aktif path'ten sayfa adı türet (örn. "/users/add" → "Users / Add")
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <Box display="flex" height="100vh">
      <Sidebar setPageTitle={setPageTitle}/>
      <Box flex={1} display="flex" flexDirection="column">
        <Box p={2} bgcolor="#f5f5f5" borderBottom="1px solid #ccc">
          <Typography variant="h6">{pageTitle}</Typography>
        </Box>
        <Box p={3} flex={1} overflow="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
