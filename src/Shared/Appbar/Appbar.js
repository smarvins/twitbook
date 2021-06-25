import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Search from "./Search/Search";
import Container from "@material-ui/core/Container";
import { useStyles } from "./AppbarStyles";

const Appbar = ({ userData }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBarBC}>
        <Container>
          <Toolbar className={classes.toolBar}>
            <Typography edge="start" variant="h6" className={classes.title}>
              <Link to="/" className={classes.titleName}>
                TwitBook
              </Link>
            </Typography>
            <Search userData={userData} />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Appbar;