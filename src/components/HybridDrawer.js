import React, { Component } from "react";
import PropTypes from "prop-types";
import { Hidden, Drawer, IconButton, Divider, List } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import layoutTypesEnum from "../constants/layoutTypes";

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up("sm")]: {
      position: "relative"
    }
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

class HybridDrawer extends React.Component {
  handleMenuToggle = type => {
    this.props.toggleCallback(type);
  };

  render() {
    const { layoutType, isOpened, items, classes, theme } = this.props;
    let result = null;

    switch (layoutType) {
      case layoutTypesEnum.small:
        result = (
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={isOpened}
            onClose={e => this.handleMenuToggle(layoutType)}
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !isOpened && classes.drawerPaperClose
              )
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <List>{items}</List>
          </Drawer>
        );
        break;

      case layoutTypesEnum.medium:
      case layoutTypesEnum.large:
        result = (
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !isOpened && classes.drawerPaperClose
              )
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={e => this.handleMenuToggle(layoutType)}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>{items}</List>
          </Drawer>
        );
        break;
    }

    return result;
  }
}

HybridDrawer.propTypes = {
  layoutType: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  toggleCallback: PropTypes.func.isRequired,
  items: PropTypes.node.isRequired
};

export default withStyles(styles, { withTheme: true })(HybridDrawer);
