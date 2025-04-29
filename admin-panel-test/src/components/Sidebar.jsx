import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Divider,
    Typography
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // kullanıcı bilgisi için

const menuItems = [
{
    title: "User",
    children: [
    { label: "Add User", path: "/users/add" },
    { label: "Delete User", path: "/users/delete" },
    ],
},
{
    title: "Category",
    children: [
    { label: "Add Category", path: "/categories/add" },
    { label: "List Categories", path: "/categories" },
    ],
},
{
    title: "Order",
    children: [
    { label: "All Orders", path: "/orders" },
    ],
},
{
    title: "Account",
    children: [
    { label: "Profile", path: "/account/profile" },
    ],
},
];

function Sidebar({ setPageTitle }) {
const [openParent, setOpenParent] = useState(null);
const navigate = useNavigate();
const user = useSelector((state) => state.auth.user); // Redux'tan user çekiyoruz

const handleToggle = (title) => {
    setOpenParent(prev => (prev === title ? null : title)); // sadece bir açık kalır
};

return (
    <Box width="250px" bgcolor="#eeeeee" height="100vh" p={2}>
        {/* Kullanıcı bilgisi */}
        <Box key={"user info"} mb={2}>
        <Typography variant="subtitle1" fontWeight="bold">
            Hoşgeldin, {user?.name || user?.email || "Admin"}
        </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Dashboard butonu */}
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
            {menuItems.map((menu) => (
            <Box key={menu.title}>
                <ListItemButton onClick={() => handleToggle(menu.title)}>
                <ListItemText primary={menu.title} />
                </ListItemButton>
                <Collapse in={openParent === menu.title} timeout="auto" unmountOnExit>
                {menu.children.map((sub) => (
                    <ListItemButton
                    key={sub.path}
                    sx={{ pl: 4 }}
                    onClick={() => {
                        setPageTitle(sub.label);       // başlığı ayarla
                        navigate(sub.path);            // sayfaya git
                      }}
                    >
                    <ListItemText primary={sub.label} />
                    </ListItemButton>
                ))}
                </Collapse>
            </Box>
            ))}
        </List>
    </Box>
);
}

export default Sidebar;
