import { Box, List, ListItemButton, ListItemText, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const menuItems = [
    { label: "Users", path: "/users" },
    { label: "Products", path: "/products" },
    { label: "Categories", path: "/categories" },
    { label: "Orders", path: "/orders" },
];

function Sidebar({ setPageTitle }) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const handleNavigate = (item) => {
        setPageTitle(item.label);
        navigate(item.path);
    };

    return (
        <Box width="250px" bgcolor="#eeeeee" height="100vh" p={2}>
            <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Hoş geldiniz, {user?.name || user?.email || "Admin"}
                </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mb={2}>
                <ListItemButton onClick={() => {
                    navigate("/dashboard");
                    setPageTitle("Dashboard");
                }}>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </Box>

            <Divider sx={{ my: 2 }} />

            <List component="nav">
                {menuItems.map((item) => (
                    <ListItemButton key={item.path} onClick={() => handleNavigate(item)}>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
}

export default Sidebar;
    