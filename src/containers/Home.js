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
import layoutTypesEnum from "../constants/layoutTypes";

import { debounce } from "throttle-debounce";

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
    console.log(`home set menu ${tag}`);
    this.setState({ selectedMenu: tag });
  };

  changeLayoutType = type => {
    console.log(`${type}`);
    this.setState({ layoutType: type });
  };

  handleResize = () => {
    console.log(`${window.innerWidth}`);
    if (window.innerWidth < 600) {
      this.setState({ layoutType: layoutTypesEnum.small });
    } else if (window.innerWidth >= 600 && window.innerWidth < 1280) {
      this.setState({ layoutType: layoutTypesEnum.medium });
    } else if (window.innerWidth >= 1280) {
      this.setState({ layoutType: layoutTypesEnum.large });
    }
  };

  componentDidMount() {
    window.addEventListener(
      "resize",
      debounce(200, false, this.handleResize),
      true
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <ResponsiveAppLayout
          menuArray={menuItems}
          changeLayoutTypeCallback={this.changeLayoutType}
          selectedMenu={this.state.selectedMenu}
          selectedMenuCallback={this.setSelectedMenu}
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
