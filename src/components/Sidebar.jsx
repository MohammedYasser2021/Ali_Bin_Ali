import React from "react";
import PropTypes from "prop-types";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Container,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  PeopleAlt as PeopleAltIcon,
  GridView as GridViewIcon,
  VerifiedUser as VerifiedUserIcon,
  Compare as CompareIcon,
  Logout as LogoutIcon,
  ExpandMore,
  Close as CloseIcon,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { FaBars } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import { HiHome, HiCalendar } from "react-icons/hi";
import logo from "../assets/logo.png";
import "../App.css";

// const NAVIGATION = [
//   {
//     title: "Home",
//     titleAr: "الصفحة الرئيسية",
//     icon: <HiHome className="w-4 h-4" />,
//     path: "/",
//   },
// ];

function DashboardLayoutBasic({ language, setLanguage, ...props }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEls, setAnchorEls] = React.useState({});
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLanguage = prev === "EN" ? "AR" : "EN";
      return newLanguage;
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event, index) => {
    setAnchorEls((prev) => ({
      ...prev,
      [index]: event.currentTarget,
    }));
  };

  const handleMenuClose = (index) => {
    setAnchorEls((prev) => ({
      ...prev,
      [index]: null,
    }));
  };

  React.useEffect(() => {
    setMobileOpen(false);
    setAnchorEls({});
  }, [location]);

  // const navbarItems = (
  //   <Box
  //     sx={{
  //       display: "flex",
  //       alignItems: "center",
  //       gap: 0.3,
  //       direction: "ltr",
  //     }}
  //   >
  //     {NAVIGATION.map((item, index) => (
  //       <Box key={index} sx={{ position: "relative" }}>
  //         {item.children ? (
  //           <>
  //             <Button
  //               onClick={(e) => handleMenuOpen(e, index)}
  //               sx={{
  //                 color: "#d32f2f",
  //                 textTransform: "none",
  //                 fontWeight: 500,
  //                 fontSize: "0.9rem",
  //                 padding: "10px 16px",
  //                 borderRadius: "8px",
  //                 minHeight: "42px",
  //                 display: "flex",
  //                 alignItems: "center",
  //                 gap: 0.5,
  //                 flexDirection: "row",
  //                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  //                 position: "relative",
  //                 overflow: "hidden",
  //                 backgroundColor: "rgba(211, 47, 47, 0.08)",
  //                 "&::before": {
  //                   content: '""',
  //                   position: "absolute",
  //                   top: 0,
  //                   left: 0,
  //                   right: 0,
  //                   bottom: 0,
  //                   backgroundColor: "rgba(211, 47, 47, 0.12)",
  //                   opacity: 0,
  //                   transition: "opacity 0.3s ease",
  //                   borderRadius: "8px",
  //                 },
  //                 "&:hover": {
  //                   backgroundColor: "rgba(211, 47, 47, 0.12)",
  //                   transform: "translateY(-2px)",
  //                   boxShadow: "0 8px 25px rgba(211, 47, 47, 0.15)",
  //                   "&::before": {
  //                     opacity: 1,
  //                   },
  //                 },
  //                 "&:active": {
  //                   transform: "translateY(-1px)",
  //                 },
  //               }}
  //             >
  //               {item.icon}
  //               <span style={{ marginLeft: "4px", marginRight: "4px" }}>
  //                 {language === "EN" ? item.title : item.titleAr}
  //               </span>
  //               <KeyboardArrowDown
  //                 sx={{ color: "#d32f2f", fontSize: "16px", marginLeft: "2px" }}
  //               />
  //             </Button>
  //             <Menu
  //               anchorEl={anchorEls[index]}
  //               open={Boolean(anchorEls[index])}
  //               onClose={() => handleMenuClose(index)}
  //               sx={{
  //                 "& .MuiPaper-root": {
  //                   borderRadius: "12px",
  //                   boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  //                   border: "1px solid rgba(0,0,0,0.12)",
  //                   minWidth: 180,
  //                   backgroundColor: "#ffffff",
  //                   mt: 1,
  //                 },
  //               }}
  //               transformOrigin={{
  //                 horizontal: "left",
  //                 vertical: "top",
  //               }}
  //               anchorOrigin={{
  //                 horizontal: "left",
  //                 vertical: "bottom",
  //               }}
  //             >
  //               {item.children?.map((subItem, subIndex) => (
  //                 <MenuItem
  //                   key={subIndex}
  //                   component={Link}
  //                   to={subItem.path}
  //                   onClick={() => handleMenuClose(index)}
  //                   sx={{
  //                     padding: "10px 16px",
  //                     display: "flex",
  //                     alignItems: "center",
  //                     gap: 0.8,
  //                     color: "#333333",
  //                     transition: "all 0.2s ease",
  //                     borderRadius: "6px",
  //                     margin: "2px 6px",
  //                     fontSize: "0.9rem",
  //                     flexDirection: "row",
  //                     "&:hover": {
  //                       backgroundColor: "rgba(211, 47, 47, 0.08)",
  //                     },
  //                   }}
  //                 >
  //                   {subItem.icon}
  //                   <Typography
  //                     variant="body2"
  //                     sx={{
  //                       fontWeight: 400,
  //                       color: "#333333",
  //                       fontSize: "0.9rem",
  //                     }}
  //                   >
  //                     {language === "EN" ? subItem.title : subItem.titleAr}
  //                   </Typography>
  //                 </MenuItem>
  //               ))}
  //             </Menu>
  //           </>
  //         ) : (
  //           <Button
  //             component={Link}
  //             to={item.path}
  //             sx={{
  //               color: location.pathname === item.path ? "#d32f2f" : "#333333",
  //               textTransform: "none",
  //               fontWeight: location.pathname === item.path ? 600 : 500,
  //               fontSize: "0.9rem",
  //               padding: "10px 16px",
  //               borderRadius: "8px",
  //               minHeight: "42px",
  //               display: "flex",
  //               alignItems: "center",
  //               gap: 0.5,
  //               flexDirection: "row",
  //               position: "relative",
  //               transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  //               overflow: "hidden",
  //               backgroundColor:
  //                 location.pathname === item.path
  //                   ? "rgba(211, 47, 47, 0.08)"
  //                   : "transparent",
  //               "&::before": {
  //                 content: '""',
  //                 position: "absolute",
  //                 top: 0,
  //                 left: 0,
  //                 right: 0,
  //                 bottom: 0,
  //                 backgroundColor:
  //                   location.pathname === item.path
  //                     ? "rgba(211, 47, 47, 0.12)"
  //                     : "rgba(0,0,0,0.04)",
  //                 opacity: location.pathname === item.path ? 1 : 0,
  //                 transition: "opacity 0.3s ease",
  //                 borderRadius: "8px",
  //               },
  //               "&:hover": {
  //                 backgroundColor:
  //                   location.pathname === item.path
  //                     ? "rgba(211, 47, 47, 0.12)"
  //                     : "rgba(0, 0, 0, 0.04)",
  //                 transform: "translateY(-2px)",
  //                 boxShadow:
  //                   location.pathname === item.path
  //                     ? "0 8px 25px rgba(211, 47, 47, 0.2)"
  //                     : "0 8px 25px rgba(0, 0, 0, 0.1)",
  //                 "&::before": {
  //                   opacity: 1,
  //                 },
  //               },
  //               "&:active": {
  //                 transform: "translateY(-1px)",
  //               },
  //               "&::after":
  //                 location.pathname === item.path
  //                   ? {
  //                       content: '""',
  //                       position: "absolute",
  //                       bottom: "-2px",
  //                       left: "50%",
  //                       transform: "translateX(-50%)",
  //                       width: "70%",
  //                       height: "2px",
  //                       backgroundColor: "#d32f2f",
  //                       borderRadius: "1px",
  //                     }
  //                   : {},
  //             }}
  //           >
  //             <Box sx={{ color: "#d32f2f" }}>{item.icon}</Box>
  //             <span style={{ marginLeft: "4px", marginRight: "4px" }}>
  //               {language === "EN" ? item.title : item.titleAr}
  //             </span>
  //           </Button>
  //         )}
  //       </Box>
  //     ))}
  //   </Box>
  // );

  // const mobileDrawer = (
  //   <Box sx={{ width: 280, height: "100%", backgroundColor: "#ffffff" }}>
  //     <Box
  //       sx={{
  //         p: 2.5,
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <img src={logo} alt="Logo" style={{ maxHeight: "50px" }} />
  //     </Box>
  //     <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.12)", mx: 2 }} />
  //     <List sx={{ px: 1.5, py: 2 }}>
  //       {NAVIGATION.map((item, index) => (
  //         <ListItem
  //           key={index}
  //           button
  //           component={Link}
  //           to={item.path}
  //           onClick={handleDrawerToggle}
  //           sx={{
  //             borderRadius: "12px",
  //             mb: 1,
  //             mx: 0.5,
  //             padding: "10px 12px",
  //             backgroundColor:
  //               location.pathname === item.path
  //                 ? "rgba(211, 47, 47, 0.08)"
  //                 : "transparent",
  //             direction: "ltr",
  //             "&:hover": {
  //               backgroundColor:
  //                 location.pathname === item.path
  //                   ? "rgba(211, 47, 47, 0.12)"
  //                   : "rgba(0, 0, 0, 0.04)",
  //             },
  //             transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  //           }}
  //         >
  //           <ListItemIcon
  //             sx={{
  //               minWidth: 35,
  //               color: location.pathname === item.path ? "#d32f2f" : "#666666",
  //               marginRight: language === "AR" ? "8px" : "0",
  //               marginLeft: language === "AR" ? "0" : "0",
  //             }}
  //           >
  //             {item.icon}
  //           </ListItemIcon>
  //           <ListItemText
  //             primary={language === "EN" ? item.title : item.titleAr}
  //             sx={{
  //               textAlign: language === "AR" ? "right" : "left",
  //               "& .MuiTypography-root": {
  //                 fontWeight: location.pathname === item.path ? 600 : 500,
  //                 fontSize: "0.9rem",
  //                 color:
  //                   location.pathname === item.path ? "#d32f2f" : "#333333",
  //                 direction: language === "AR" ? "rtl" : "ltr",
  //               },
  //             }}
  //           />
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid rgba(0,0,0,0.12)",
          zIndex: 1300,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: { xs: 70, sm: 70 },
              px: { xs: 0, sm: 0 },
              direction: "ltr",
              height: { xs: 75, sm: 80 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                order: 1,
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{
                  maxHeight: "65px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                order: 3,
              }}
            >
              <IconButton
                onClick={toggleLanguage}
                sx={{
                  color: "#d32f2f",
                  backgroundColor: "rgba(211, 47, 47, 0.08)",
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  border: "1px solid rgba(211, 47, 47, 0.2)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(211, 47, 47, 0.12)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(211, 47, 47, 0.12)",
                    transform: "scale(1.08)",
                    boxShadow: "0 8px 25px rgba(211, 47, 47, 0.2)",
                    borderColor: "rgba(211, 47, 47, 0.4)",
                    "&::before": {
                      opacity: 1,
                    },
                  },
                  "&:active": {
                    transform: "scale(1.05)",
                  },
                }}
                title={
                  language === "EN" ? "Translate to Arabic" : "ترجم للإنجليزية"
                }
              >
                <MdGTranslate style={{ fontSize: "20px" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          padding: { xs: 2, sm: 3 },
          marginTop: { xs: "75px", sm: "80px" },
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

DashboardLayoutBasic.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  window: PropTypes.func,
};

export default DashboardLayoutBasic;

