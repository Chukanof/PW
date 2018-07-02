import React, { Component } from "react";
import PropTypes from "prop-types";
import { Hidden, withStyles } from "@material-ui/core";
import HybridDrawer from "./HybridDrawer";
import Header from "./Header";
import layoutTypesEnum from "../constants/layoutTypes";

class Layout extends React.Component {
  // componentWillMount() {
  //   this.props.changeLayoutTypeCallback(this.props.layoutType);
  // }

  // componentWillUpdate() {
  //   this.props.changeLayoutTypeCallback(this.props.layoutType);
  // }
  render() {
    var { layoutType, menuState, menuToggleCallback, menuItems } = this.props;

    return (
      <React.Fragment>
        <Header
          title="PW"
          layoutType={layoutType}
          isMenuOpened={menuState}
          menuToggleCallback={e => menuToggleCallback(layoutType)}
        />
        <HybridDrawer
          layoutType={layoutType}
          isOpened={menuState}
          toggleCallback={menuToggleCallback}
          items={menuItems}
        />
      </React.Fragment>
    );
  }
}
Layout.propTypes = {
  menuState: PropTypes.bool.isRequired,
  menuToggleCallback: PropTypes.func.isRequired,
  layoutType: PropTypes.string.isRequired,
  menuItems: PropTypes.node.isRequired,
  changeLayoutTypeCallback: PropTypes.func.isRequired
};

class ResponsiveAppLayout extends Component {
  state = {
    smallScreenMenuState: false,
    middleScreenMenuState: false,
    largeScreenMenuState: true
  };

  handleMenuToggle = layoutType => {
    console.log(layoutType);

    switch (layoutType) {
      case layoutType.small:
        this.setState({
          smallScreenMenuState: !this.state.smallScreenMenuState
        });
        break;

      case layoutTypesEnum.medium:
        this.setState({
          middleScreenMenuState: !this.state.middleScreenMenuState
        });

      case layoutTypesEnum.large:
        this.setState({
          largeScreenMenuState: !this.state.largeScreenMenuState
        });
      default:
        break;
    }
  };

  render() {
    const { menuItems, changeLayoutTypeCallback } = this.props;

    return (
      <React.Fragment>
        <Hidden smUp implementation="css">
          <Layout
            layoutType={layoutTypesEnum.small}
            menuState={this.state.smallScreenMenuState}
            menuToggleCallback={this.handleMenuToggle}
            menuItems={menuItems}
            changeLayoutTypeCallback={changeLayoutTypeCallback}
          />
        </Hidden>
        <Hidden only={["xs", "lg", "xl"]} implementation="css">
          <Layout
            layoutType={layoutTypesEnum.medium}
            menuState={this.state.middleScreenMenuState}
            menuToggleCallback={this.handleMenuToggle}
            menuItems={menuItems}
            changeLayoutTypeCallback={changeLayoutTypeCallback}
          />
        </Hidden>
        <Hidden mdDown implementation="css">
          <Layout
            layoutType={layoutTypesEnum.large}
            menuState={this.state.largeScreenMenuState}
            menuToggleCallback={this.handleMenuToggle}
            menuItems={menuItems}
            changeLayoutTypeCallback={changeLayoutTypeCallback}
          />
        </Hidden>
      </React.Fragment>
    );
  }
}

ResponsiveAppLayout.propTypes = {
  menuItems: PropTypes.node.isRequired,
  changeLayoutTypeCallback: PropTypes.func.isRequired
};

export default ResponsiveAppLayout;
