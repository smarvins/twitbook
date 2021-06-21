import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Home from "./HomePage/Home/Home";
import Users from "./UserPage/User/Users";
import FullPost from "./HomePage/Posts/FullPost/FullPost";
import Error from "./Shared/Error/Error";
import "@fontsource/roboto";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);

  const fetchUserData = async () => {
    return await axios.get("http://jsonplaceholder.typicode.com/users");
  };

  const fetchPostData = async () => {
    return await axios.get("https://jsonplaceholder.typicode.com/posts");
  };

  //This grabs the user endpoint and spits out the data.
  useEffect(() => {
    fetchUserData()
      .then((response) => {
        //console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.log("The was an error grabbing the user data:" + error);
      });
  }, []);

  //This grabs the post endpoint and spits out the data.
  useEffect(() => {
    fetchPostData()
      .then((response) => {
        //console.log(response.data);
        setPostData(response.data);
      })
      .catch((error) => {
        console.log("The was an error grabbing the post data:" + error);
      });
  }, []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Home userData={userData} postData={postData} />
        </Route>
        <Route path="/users/:username" exact component={Users}></Route>
        <Route path="/post/:title" exact>
          {" "}
          <FullPost userData={userData} postData={postData} />
        </Route>
        <Route component={Error} />
      </Switch>
    </main>
  );
};

export default App;
