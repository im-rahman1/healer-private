import React from "react";
import { Button } from "@mui/material";
import { Menu, Box } from "@mui/material";
import { MenuItem, Icon } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

function SimpleMenu(name, list, routing) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [clicked, setClicked] = React.useState(false);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
    setClicked(true);
  }

  function handleClose() {
    setAnchorEl(null);
    setClicked(false);
  }

  const muiStyles = {
    clickable: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: "#01a22e",
      fontSize: "13px",
    },
  };

  return (
    <div>
      <Box
        sx={muiStyles.clickable}
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        // onMouseEnter={handleClick}
      >
        Brands{" "}
        <Icon>
          {clicked ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </Icon>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onMouseLeave={handleClose}>
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        <Button onClick={handleClose} size="small">
          Mani
        </Button>
        <Button onClick={handleClose} size="small">
          Usama
        </Button>
        <Button onClick={handleClose} size="small">
          hello
        </Button>
        <Button onClick={handleClose} size="small">
          nothing
        </Button>
        <Button onClick={handleClose} size="small">
          All
        </Button>
      </Menu>
    </div>
  );
}

export default SimpleMenu;
