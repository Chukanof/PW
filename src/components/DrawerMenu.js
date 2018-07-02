import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { ListItemIcon, ListItemText, Icon } from "@material-ui/core";
import ListItemContainer from "./ListItemContainer";

const styles = theme => ({
  listItem: {
    ...theme.mixins.toolbar
  },
  listItemSelected: {
    background: theme.palette.action.selected
  }
});

class DrawerMenu extends Component {
  onClick = (tag, e) => {
    this.props.setSelectedCallback(tag);
  };

  render() {
    const { classes, items, onClick, selectedItem } = this.props;
    return (
      <React.Fragment>
        {items.map(item => (
          <ListItemContainer
            button
            itemTag={item.tag}
            onClick={e => this.onClick(item.tag, e)}
            key={item.tag}
            classes={classNames(
              classes.listItem,
              selectedItem === item.tag && classes.listItemSelected
            )}
          >
            <ListItemIcon>
              <Icon>{item.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemContainer>
        ))}
      </React.Fragment>
    );
  }
}

DrawerMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedCallback: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedItem: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(DrawerMenu);
