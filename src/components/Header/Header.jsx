import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const menuItems = [
    {
      text: "Банлист",
      to: "/admin/banlist",
      visible: user.role === "admin" || user.role === 'mainAdmin',
    },
    {
      text: "Создать",
      to: "/admin/create",
      visible: user.role === "admin" || user.role === 'mainAdmin',
    },
    { text: "Задания", to: "/" },
    { text: "Пользователи", to: "/users" },
    { text: "Моя статистика", to: "/stats" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#f4f3ee",
          color: "black",
          boxShadow: "none",
          zIndex: 1200,
          height: 64,
        }}
      >
        <Toolbar
          sx={{
            minHeight: 64,
            height: 64,
          }}
        >
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Логотип */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src="../../../public/vite.svg"
              alt="Логотип"
              style={{ height: "40px" }}
            />
          </Typography>
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, mx: 2 }}>
              {menuItems.map(
                (item, index) =>
                  (item.visible === undefined || item.visible) && (
                    <Button color="inherit" key={index}>
                      <Link
                        to={item.to}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {item.text}
                      </Link>
                    </Button>
                  )
              )}
            </Box>
          )}
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <Link to={"/profile"}>
              <Avatar
                alt="User Avatar"
                src={`http://localhost:${import.meta.env.VITE_API_PORT}${user.avatar}`}
                sx={{ width: 50, height: 50 }}
              />
            </Link>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundImage: `url(http://localhost:${import.meta.env.VITE_API_PORT}${user.levelIcon})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "translate(-30px, 2px)",
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
          },
        }}
      >
        <Box
          sx={{ p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            <img
              src="../../../public/vite.svg"
              alt="Логотип"
              style={{ height: "40px" }}
            />
          </Typography>
          <Divider />
          <List>
            {menuItems.map(
              (item, index) =>
                (item.visible === undefined || item.visible) && (
                  <ListItem
                    key={index}
                    component={Link}
                    to={item.to}
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
                )
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
