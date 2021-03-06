import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Appbar from "shared/Appbar/Appbar";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MailIcon from "@material-ui/icons/Mail";
import Divider from "@material-ui/core/Divider";
import { useParams } from "react-router-dom";
import {
  fetchSingleUser,
  fetchPostData,
  fetchUserPosts,
} from "shared/Utils/Api";
import PropTypes from "prop-types";
import { useStyles } from "./UserDetailsStyles";

//const delay = 2;

const Users = () => {
  const classes = useStyles();

  const params = useParams();

  const [user, setUser] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      let user = await fetchSingleUser(params.id);
      let posts = await fetchUserPosts(params.id);
      // let loadTimer = setTimeout(() => setLoading(false), delay * 1000);
      //
      // return () => {
      //   clearTimeout(loadTimer);
      // };
      setUser(user.data);
      setUserPosts(posts.data);
      setLoading(false);
    };
    fetchUserData();
  }, []);

  return (
    <div className={classes.userDetailsBC}>
      <Appbar />
      <Container>
        <Container className={classes.root} align="left">
          <Typography
            variant="h3"
            gutterBottom
            className={classes.titleName}
            display="block"
          >
            {user.name}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            display="block"
            className={classes.titleUserName}
          >
            @{user.username}
          </Typography>

          <Box display="inline">
            <MailIcon className={classes.titleIcon} />
            <Typography
              variant="subtitle2"
              gutterBottom
              display="inline"
              className={classes.titleUserDetails}
            >
              {user.website}
            </Typography>
          </Box>
          <Box
            component="span"
            display="inline"
            className={classes.emailDisplay}
          >
            <MailIcon className={classes.titleIcon} />
            <Typography
              variant="subtitle2"
              gutterBottom
              display="inline"
              className={classes.titleUserDetails}
            >
              {user.email}
            </Typography>
          </Box>
        </Container>
        <Container>
          <Divider className={classes.bottomDivider} />
        </Container>
        <Container maxWidth="md">
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid
              container
              spacing={4}
              align="left"
              className={classes.mainGrid}
            >
              {userPosts.map((posts, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <Card className={classes.userPosts} boxShadow={0}>
                      <CardContent>
                        <Link
                          to={{
                            pathname: `/post/${posts.id}`,
                          }}
                          className={classes.cardLink}
                        >
                          <Typography
                            variant="h5"
                            component="h2"
                            className={classes.title}
                          >
                            {posts.title}
                          </Typography>
                        </Link>
                        <Typography
                          variant="body2"
                          component="p"
                          color="textSecondary"
                        >
                          {posts.body}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </Container>
    </div>
  );
};

Users.propTypes = {
  user: PropTypes.string,
};

export default Users;
