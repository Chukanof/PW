import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Icon, Typography } from "@material-ui/core";

import HybridDrawer from "../components/HybridDrawer";
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";
import ContentProvider from "../components/ContentProvider";
import ResponsiveAppLayout from "../components/ResponsiveAppLayout";

const menuItems = [
  { tag: "trHistory", title: "History", icon: "grid_on" },
  { tag: "trNew", title: "Send", icon: "send" },
  { tag: "testTable", title: "History", icon: "table_chart" }
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden", // 1
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%" // 1 minHeight
  },

  // navIconHide: {
  //   [theme.breakpoints.up("md")]: {
  //     display: "none"
  //   }
  // },

  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 11,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing.unit * 10
    },
    minHeight: "100%",
    height: "100%" // 1
  }
});

class Home extends React.Component {
  state = {
    selectedMenu: "trHistory",
    layoutType: ""
  };

  setSelectedMenu = tag => {
    this.setState({ selectedMenu: tag });
  };

  changeLayoutType = type => {
    this.setState({ layoutType: type });
  };

  getDrawerMenu = items => {
    return (
      <DrawerMenu
        items={items}
        setSelectedCallback={this.setSelectedMenu}
        selectedItem={this.state.selectedMenu}
      />
    );
  };
  render() {
    const { classes, theme } = this.props;
    const drawerMenu = this.getDrawerMenu(menuItems);

    return (
      <div className={classes.root}>
        <ResponsiveAppLayout
          menuItems={drawerMenu}
          changeLayoutTypeCallback={this.changeLayoutType}
        />
        <main className={classes.content}>
          <ContentProvider
            selectedTag={this.state.selectedMenu}
            layoutType={this.state.layoutType}
          />
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Home);
