import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import NewTransaction from "../containers/NewTransaction";
import TransactionHistory from "../containers/TransactionHistory";

const styles = theme => ({
  padding: "16px"
});

class ContentProvider extends Component {
  components = {
    trNew: NewTransaction,
    trHistory: TransactionHistory
  };

  render() {
    const TagName = this.components[this.props.selectedTag];
    return <TagName layoutType={this.props.layoutType} />;
  }
}

ContentProvider.propTypes = {
  selectedTag: PropTypes.string.isRequired,
  layoutType: PropTypes.string.isRequired
};

export default withStyles(styles)(ContentProvider);
