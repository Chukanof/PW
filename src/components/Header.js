import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Typography
} from "@material-ui/core";

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: drawerWidth,
    [theme.breakpoints.up("lg")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    // [theme.breakpoints.down("sm")]: {
    //   height: "64px"
    // },

    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.up("lg")]: {
      width: "100%"
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  }
});

class Header extends Component {
  handleDrawerToggle = () => {
    this.props.menuToggleCallback(this.props.layoutType);
  };

  render() {
    const { layoutType, classes, title, isMenuOpened } = this.props;
    var menuState = isMenuOpened;
    if (layoutType == "large") {
      menuState = !isMenuOpened;
    }

    return (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, menuState && classes.appBarShift)}
      >
        <Toolbar disableGutters={!isMenuOpened}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerToggle}
            className={classNames(
              classes.menuButton,
              isMenuOpened && classes.hide
            )}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  menuToggleCallback: PropTypes.func.isRequired,
  layoutType: PropTypes.string.isRequired
};

export default withStyles(styles)(Header);
