import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./SearchStyles";

const Search = (props) => {
  const classes = useStyles();

  const [filteredData, setFilteredData] = useState(props.userData);
  const [showMenu, setshowMenu] = useState(false);
  const [value, setValue] = useState("");

  const handleSearch = (event) => {
    if (!showMenu) {
      setshowMenu(true);
    }

    const value = event.target.value;

    setValue(value);

    const result = props.userData.filter((data) => {
      return data.username.search(value.toLowerCase()) !== -1;
    });
    setFilteredData(result);
  };

  return (
    <div>
      <div>
        <Box
          textAlign="center"
          className={classes.borderSearch}
          borderRadius={16}
        >
          <div className={classes.search}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              placeholder="Search for username"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "Search for username" }}
              onChange={handleSearch}
              value={value}
              onBlur={() => setshowMenu(false)}
            />
          </div>
        </Box>

        {showMenu && (
          <Box borderRadius={16}>
            <List
              className={classes.root}
              component="nav"
              aria-label="list of usernames"
            >
              {/* Filters usernames to match what you typed in the inputbox */}
              {filteredData.map((value, index) => {
                return (
                  <ListItem button key={value.id} className={classes.listItem}>
                    <ListItemText>
                      <Link
                        to={{
                          pathname: `/users/${value.username}`,
                          state: {
                            name: value.name,
                            website: value.website,
                            email: value.email,
                            username: value.username,
                          },
                        }}
                        className={classes.listItemLink}
                      >
                        {"@" + value.username}
                      </Link>
                    </ListItemText>
                    <ListItemText className={classes.fullName} disabled>
                      <Typography variant="caption" gutterBottom>
                        {value.name}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Search;