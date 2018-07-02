import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListItem } from "@material-ui/core";

class ListItemContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { classes, button, onClick } = this.props;
    return (
      <ListItem button={button} onClick={onClick} className={classes}>
        {this.props.children}
      </ListItem>
    );
  }
}

ListItemContainer.propTypes = {
  button: PropTypes.bool.isRequired,
  itemTag: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.string.isRequired
};

export default ListItemContainer;
