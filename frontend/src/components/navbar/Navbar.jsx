import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ButtonSolid from "../buttonSolid/ButtonSolid";

import "./navbar.css";
// import ButtonSolid from "../buttonSolid/ButtonSolid";

const sidebarWidth = 240;
const navItems = ["Quick Donation", "About"];

function NavBar({ getStarted }) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  //Styles
  const navBackgroundColor = "#fbfbfb";
  const fontFamily = "Poppins, sans-serif";
  const color = "black";
  const boxShadow =
    "0px 2px 4px -1px rgb(0 0 0 / 2%), 0px 4px 5px 0px rgb(0 0 0 / 3%), 0px 1px 10px 0px rgb(0 0 0 / 0%)";
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const fontSize = "0.8rem";

  const drawer = (
    // this is the modal that comes when we clicked the hamburger menu on mobile mode
    // onClick works only if we click items in the height range of the contents
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        fontSize: { fontSize },
        fontFamily: { fontFamily },
      }}
    >
      <Typography variant="h6" sx={{ my: 2, fontFamily: { fontFamily } }}>
        you<span style={{ color: "gold" }}>Birr</span>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
              }}
            >
              <ListItemText>
                <Typography
                  sx={{
                    fontFamily: { fontFamily },
                    fontWeight: "400",
                  }}
                >
                  {item}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      {/* Below is the navbar container */}
      <AppBar
        component="nav"
        sx={{
          boxShadow: { boxShadow },
          background: `${navBackgroundColor}`,
        }}
      >
        {/* This contains the content in the navbar */}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            boxShadow: "none",
            margin: { lg: "0 50px" },
            position: "sticky",
            top: "0",
            left: "0",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              flex: { xs: ".8", sm: "1.5" },
              // display: { sm: "block" },
              color: `${color}`,
              fontFamily: `${fontFamily}`,
              fontWeight: "600",
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              you<span style={{ color: "gold" }}>Birr</span>
            </Link>
          </Typography>
          <Box
            sx={{
              flex: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              placeholder="Search Creators..."
              className="searchCreator"
              style={{
                height: "40px",
                width: "90%",
                border: "none",
                borderRadius: "20px",
                background: "#f2f2f2",
                paddingLeft: "20px",
                fontFamily: "Poppins",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              flex: { xs: ".8", sm: "1.5" },
            }}
          >
            {getStarted ? (
              <Link to="/getStarted" style={{ textDecoration: "none" }}>
                <ButtonSolid
                  label="Get Started"
                  colorBack="#fbfbfb"
                  colorText="black"
                  colorOutline="gold"
                />
              </Link>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <ButtonSolid
                  label="Login"
                  colorBack="#fbfbfb"
                  colorText="black"
                  colorOutline="gold"
                />
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              //this is what controls the sidebar slider
              boxSizing: "border-box",
              width: sidebarWidth,
              // height: "300px",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box> */}
    </Box>
  );
}

export default NavBar;
