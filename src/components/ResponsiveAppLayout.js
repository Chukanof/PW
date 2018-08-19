//#region imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import { withStyles } from "@material-ui/core/styles";
import HybridDrawer from "./HybridDrawer";
import Header from "./Header";
import layoutTypesEnum from "../constants/layoutTypes";
import DrawerMenu from "../components/DrawerMenu";
//#endregion

class Layout extends React.Component {
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
  menuItems: PropTypes.node.isRequired
};

class ResponsiveAppLayout extends Component {
  state = {
    smallScreenMenuState: false,
    middleScreenMenuState: false,
    largeScreenMenuState: true
  };

  handleMenuToggle = layoutType => {
    switch (layoutType) {
      case layoutTypesEnum.small:
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

  getDrawerMenu = items => {
    return (
      <DrawerMenu
        items={items}
        setSelectedCallback={this.setSelectedMenu}
        selectedItem={this.props.selectedMenu}
      />
    );
  };

  setSelectedMenu = tag => {
    if (this.state.smallScreenMenuState) {
      this.setState({ smallScreenMenuState: !this.state.smallScreenMenuState });
    } // close drawer when menu was chose while layout was in small (sm) type

    this.props.selectedMenuCallback(tag);
  };

  render() {
    const { menuArray } = this.props;
    var drawerMenu = this.getDrawerMenu(menuArray);

    return (
      <React.Fragment>
        <Hidden smUp implementation="css">
          <Layout
            layoutType={layoutTypesEnum.small}
            menuState={this.state.smallScreenMenuState}
            menuToggleCallback={this.handleMenuToggle}
            menuItems={drawerMenu}
          />
        </Hidden>
        <Hidden only={["xs", "lg", "xl"]} implementation="css">
          <Layout
            layoutType={layoutTypesEnum.medium}
            menuState={this.state.middleScreenMenuState}
            menuToggleCallback={this.handleMenuToggle}
            menuItems={drawerMenu}
          />
        </Hidden>
        <Hidden mdDown implementation="css">
          <Layout
            layoutType={layoutTypesEnum.large}
            menuState={this.state.largeScreenMenuState}
            menuToggleCallback={this.handleMenuToggle}
            menuItems={drawerMenu}
          />
        </Hidden>
      </React.Fragment>
    );
  }
}

ResponsiveAppLayout.propTypes = {
  changeLayoutTypeCallback: PropTypes.func.isRequired,
  menuArray: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })
  ),
  selectedMenu: PropTypes.string.isRequired,
  selectedMenuCallback: PropTypes.func.isRequired
};

export default ResponsiveAppLayout;
